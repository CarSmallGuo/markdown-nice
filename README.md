<div align="center">
<a href="https://mdnice.com">
<img width="500" src="https://files.mdnice.com/logo.svg"/>
</a>
</div>
<h1 align="center">Markdown Nice</h1>

## 简介

- 支持自定义样式的 Markdown 编辑器
- 支持微信公众号、知乎和稀土掘金
- 内置「全栈蓝」主题，并支持从 Typora 一键复制为公众号可用的内联样式 HTML
- 欢迎[在线使用](https://mdnice.com/)
- 有疑问请参考 [如何有效的解决 mdnice 相关问题？](https://github.com/mdnice/markdown-nice/issues/163)

## 主题

[Markdown Nice 主题列表](https://product.mdnice.com/themes/)

> 欢迎提交主题，提供更多文章示例~~

## Typora 一键复制

项目提供了 Typora 自定义导出命令，可以把当前 Markdown 文件渲染为「全栈蓝」主题，并将已经内联样式的富文本 HTML 写入系统剪贴板。复制后可直接粘贴到微信公众号后台。也可以指定输出路径，导出一个已经内联样式的 HTML 文件。

相关脚本：

- `scripts/copy-full-stack-blue.js`
- `scripts/set-rich-clipboard.swift`：macOS 剪贴板支持
- `scripts/set-rich-clipboard.ps1`：Windows 剪贴板支持

在 Typora 中打开 `Preferences -> Export`，新增 `Custom Command`，名称可填 `复制为全栈蓝`。

macOS 命令示例：

```bash
node "/path/to/markdown-nice/scripts/copy-full-stack-blue.js" "${currentPath}"
```

Windows 命令示例：

```powershell
"D:\workspace\markdown-nice\scripts\copy-full-stack-blue.cmd" "${currentPath}"
```

如果想导出 HTML 文件，可以把 Typora 自定义导出命令写成：

```powershell
"D:\workspace\markdown-nice\scripts\copy-full-stack-blue.cmd" "${currentPath}" --out "${outputPath}" --no-clipboard
```

如果 Typora 传进来的 `${outputPath}` 是空的，脚本会自动导出到当前 Markdown 同目录，文件名为 `原文件名.full-stack-blue.html`。

这个导出的 HTML 是完整页面，方便直接打开检查效果。真正要粘贴到公众号后台时，更推荐使用上面的剪贴板命令，因为它会把 mdnice 的内联富文本结构直接写入剪贴板。

如果使用剪贴板模式，建议关闭导出命令的输出弹窗，并选择不需要输出文件路径。使用时先保存当前文章，再执行 `File -> Export -> 复制为全栈蓝`，随后粘贴到目标编辑器即可。

## 友情链接

- [BlogHelper](https://github.com/ystcode/BlogHelper)：一键发布本地文章到主流博客平台的托盘助手
- [qrbtf](https://github.com/ciaochaos/qrbtf)：艺术二维码生成器
- [编程如画](https://draw.mdnice.com/)：「编程如画」博客
