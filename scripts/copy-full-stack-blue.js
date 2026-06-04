#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");
const {execFileSync} = require("child_process");

const MarkdownIt = require("markdown-it");
const juice = require("juice");
process.env.HLJS_HIDE_UPGRADE_WARNING = "1";
const hljs = require("highlight.js");

const repoRoot = path.resolve(__dirname, "..");

function readTemplate(relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  const source = fs.readFileSync(fullPath, "utf8").replace(/^\s*export\s+default\s+/, "module.exports = ");
  const sandbox = {module: {exports: ""}, exports: {}};
  vm.runInNewContext(source, sandbox, {filename: fullPath});
  return sandbox.module.exports;
}

function headingSpan(md) {
  md.core.ruler.push("heading_span", (state) => {
    for (let i = 0; i < state.tokens.length - 1; i += 1) {
      if (state.tokens[i].type !== "heading_open" || state.tokens[i + 1].type !== "inline") {
        continue;
      }

      const inlineToken = state.tokens[i + 1];
      if (!inlineToken.content) {
        continue;
      }

      const prefix = new state.Token("html_inline", "", 0);
      prefix.content = '<span class="prefix"></span><span class="content">';
      const suffix = new state.Token("html_inline", "", 0);
      suffix.content = '</span><span class="suffix"></span>';
      inlineToken.children.unshift(prefix);
      inlineToken.children.push(suffix);
      i += 2;
    }
  });
}

function tableContainer(md) {
  md.core.ruler.push("table-container", (state) => {
    const tokens = [];
    state.tokens.forEach((token) => {
      if (token.type === "table_open") {
        const start = new state.Token("html_inline", "", 0);
        start.content = '<section class="table-container">';
        tokens.push(start);
      }

      tokens.push(token);

      if (token.type === "table_close") {
        const end = new state.Token("html_inline", "", 0);
        end.content = "</section>";
        tokens.push(end);
      }
    });
    state.tokens = tokens;
  });
}

function listItemSection(md) {
  md.core.ruler.push("replace-li", () => {
    md.renderer.rules.list_item_open = () => "<li><section>";
    md.renderer.rules.list_item_close = () => "</section></li>";
  });
}

function blockquoteClass(md) {
  md.core.ruler.push("blockquote_class", () => {
    md.renderer.rules.blockquote_open = () => '<blockquote class="custom-blockquote multiquote-1" data-tool="mdnice编辑器">';
  });
}

function dataToolAttr(md) {
  md.core.ruler.push("data_tool_attr", (state) => {
    const supportedTypes = new Set([
      "paragraph_open",
      "heading_open",
      "bullet_list_open",
      "ordered_list_open",
      "table_open",
      "thead_open",
      "tbody_open",
      "tr_open",
      "th_open",
      "td_open",
    ]);

    state.tokens.forEach((token) => {
      if (supportedTypes.has(token.type)) {
        token.attrSet("data-tool", "mdnice编辑器");
      }
    });
  });
}

function useOptionalPlugin(md, packageName, options) {
  try {
    md.use(require(packageName), options);
  } catch (error) {
    process.stderr.write(`Skip ${packageName}: ${error.message}\n`);
  }
}

function createMarkdownParser() {
  const md = new MarkdownIt({
    html: true,
    highlight: (str, lang) => {
      const language = lang || "bash";
      if (language && hljs.getLanguage(language)) {
        try {
          const highlighted = hljs
            .highlight(language, str, true)
            .value.replace(/\n/g, "<br/>")
            .replace(/\s/g, "&nbsp;")
            .replace(/span&nbsp;/g, "span ");
          return `<pre class="custom" data-tool="mdnice编辑器"><code class="hljs">${highlighted}</code></pre>`;
        } catch (error) {
          process.stderr.write(`Highlight failed: ${error.message}\n`);
        }
      }
      return `<pre class="custom" data-tool="mdnice编辑器"><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`;
    },
  });

  md.use(headingSpan)
    .use(tableContainer)
    .use(listItemSection)
    .use(blockquoteClass)
    .use(dataToolAttr);

  useOptionalPlugin(md, "markdown-it-katex");
  useOptionalPlugin(md, "markdown-it-table-of-contents", {
    transformLink: () => "",
    includeLevel: [2, 3],
    markerPattern: /^\[toc\]/im,
  });
  useOptionalPlugin(md, "markdown-it-ruby");
  useOptionalPlugin(md, "markdown-it-implicit-figures", {figcaption: true});
  useOptionalPlugin(md, "markdown-it-deflist");
  useOptionalPlugin(md, "markdown-it-imsize");

  return md;
}

function writeRichClipboard(html, plainText) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guoshuyu-md-"));
  const htmlPath = path.join(tempDir, "content.html");
  const plainPath = path.join(tempDir, "content.txt");
  fs.writeFileSync(htmlPath, html, "utf8");
  fs.writeFileSync(plainPath, plainText, "utf8");

  if (process.platform === "darwin") {
    execFileSync("/usr/bin/swift", [path.join(__dirname, "set-rich-clipboard.swift"), htmlPath, plainPath], {
      stdio: "pipe",
    });
    return;
  }

  if (process.platform === "win32") {
    execFileSync(
      "powershell.exe",
      [
        "-NoProfile",
        "-STA",
        "-ExecutionPolicy",
        "Bypass",
        "-File",
        path.join(__dirname, "set-rich-clipboard.ps1"),
        htmlPath,
        plainPath,
      ],
      {stdio: "pipe"}
    );
    return;
  }

  throw new Error(`Unsupported platform: ${process.platform}`);
}

function parseArgs(args) {
  const options = {
    markdownPath: null,
    outputPath: null,
    copyClipboard: true,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--out" || arg === "-o") {
      const nextArg = args[index + 1];
      if (nextArg && !nextArg.startsWith("-")) {
        options.outputPath = nextArg;
        index += 1;
      }
      continue;
    }

    if (arg === "--no-clipboard") {
      options.copyClipboard = false;
      continue;
    }

    if (!options.markdownPath) {
      options.markdownPath = arg;
      continue;
    }

    if (!options.outputPath) {
      options.outputPath = arg;
    }
  }

  return options;
}

function createFullStackBlueHtml(markdown) {
  const md = createMarkdownParser();
  const body = md.render(markdown);
  const html = `<section id="nice" data-tool="mdnice编辑器" data-website="https://www.mdnice.com">${body}</section>`;

  const css = [
    readTemplate("src/template/basic.js"),
    readTemplate("src/template/markdown/fullStackBlue.js"),
    readTemplate("src/template/macCode/macAtomOneDark.js"),
  ].join("\n");

  return juice.inlineContent(html, css, {
    inlinePseudoElements: true,
    preserveImportant: true,
  });
}

function createFullStackBlueDocument(content) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Full Stack Blue</title>
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      background: #f5f8fb;
    }

    body {
      box-sizing: border-box;
      padding: 24px 0;
    }

    .nice-export-page {
      box-sizing: border-box;
      width: min(100%, 720px);
      margin: 0 auto;
      padding: 0 16px;
    }
  </style>
</head>
<body>
  <main class="nice-export-page">
${content}
  </main>
</body>
</html>
`;
}

function defaultOutputPath(markdownPath) {
  const parsed = path.parse(markdownPath);
  return path.join(parsed.dir, `${parsed.name}.full-stack-blue.html`);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const {markdownPath, copyClipboard} = options;
  if (!markdownPath) {
    process.stderr.write(
      "Usage: node scripts/copy-full-stack-blue.js /path/to/article.md [--out /path/to/article.html] [--no-clipboard]\n"
    );
    process.exit(64);
  }

  const markdown = fs.readFileSync(markdownPath, "utf8");
  const inlined = createFullStackBlueHtml(markdown);
  const outputPath = options.outputPath || (!copyClipboard ? defaultOutputPath(markdownPath) : null);

  if (outputPath) {
    fs.writeFileSync(outputPath, createFullStackBlueDocument(inlined), "utf8");
    process.stdout.write(`Wrote full-stack-blue HTML to ${outputPath}.\n`);
  }

  if (copyClipboard) {
    writeRichClipboard(inlined, markdown);
    process.stdout.write("Copied full-stack-blue rich HTML to clipboard.\n");
  }
}

main();
