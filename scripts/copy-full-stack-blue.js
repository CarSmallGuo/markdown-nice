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
          return `<pre class="custom"><code class="hljs">${highlighted}</code></pre>`;
        } catch (error) {
          process.stderr.write(`Highlight failed: ${error.message}\n`);
        }
      }
      return `<pre class="custom"><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`;
    },
  });

  md.use(headingSpan)
    .use(tableContainer)
    .use(listItemSection);

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

function main() {
  const markdownPath = process.argv[2];
  if (!markdownPath) {
    process.stderr.write("Usage: node scripts/copy-full-stack-blue.js /path/to/article.md\n");
    process.exit(64);
  }

  const markdown = fs.readFileSync(markdownPath, "utf8");
  const md = createMarkdownParser();
  const body = md.render(markdown);
  const html = `<section id="nice" data-tool="mdnice编辑器">${body}</section>`;

  const css = [
    readTemplate("src/template/basic.js"),
    readTemplate("src/template/markdown/fullStackBlue.js"),
    readTemplate("src/template/code/github.js"),
  ].join("\n");

  const inlined = juice.inlineContent(html, css, {
    inlinePseudoElements: true,
    preserveImportant: true,
  });

  writeRichClipboard(inlined, markdown);
  process.stdout.write("Copied full-stack-blue rich HTML to clipboard.\n");
}

main();
