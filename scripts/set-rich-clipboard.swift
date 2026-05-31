import AppKit
import Foundation

guard CommandLine.arguments.count == 3 else {
    FileHandle.standardError.write(Data("Usage: set-rich-clipboard.swift html-file plain-file\n".utf8))
    exit(64)
}

let htmlURL = URL(fileURLWithPath: CommandLine.arguments[1])
let plainURL = URL(fileURLWithPath: CommandLine.arguments[2])

let html = try String(contentsOf: htmlURL, encoding: .utf8)
let plain = try String(contentsOf: plainURL, encoding: .utf8)

let pasteboard = NSPasteboard.general
pasteboard.clearContents()
pasteboard.setString(html, forType: .html)
pasteboard.setString(plain, forType: .string)
