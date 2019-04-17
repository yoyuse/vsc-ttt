# Change Log

All notable changes to the "vsc-ttt" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- Initial release

## [0.0.2] - 2019-04-17

- `Ttt: Ttt On Clipboard` (`extension.tttOnClipboard`) command
- `ctrl+j` (or `cmd+j` on macOS) keybinding when `!editorTextFocus`

Tips

- VS Code の検索ボックスにコードを入力後に `ctrl+a ctrl+c ctrl+j ctrl+v` (macOS なら `cmd+a cmd+c cmd+j cmd+v`) でコードを日本語テキストに変換できます。ただしクリップボードの内容は破壊されます
  - キー操作の意味は、順に「全選択」「コピー」「クリップボードの内容を変換」「貼り付け」
- コードの書き方は chrome-ttt 互換で、`:` で左側の文字列を無変換、 `@` で左側の文字列を変換
  - 例: `VS Code:0rwj@vs-ttt:jgjflf` → `VS Code拡張vs-tttは…`
  - `:` と `@` を交互に使う限り、コードの末尾の `:` または `@` は省略できます
  - `:` も `@` も指定しなかったときは、(末尾に `@` が指定されたように) 全体を変換します

## [0.0.1] - 2019-03-26

- `Ttt: Do Ttt` (`extension.dottt`) command
- `alt+j` (or `cmd+j` on macOS) keybinding when `editorTextFocus`
