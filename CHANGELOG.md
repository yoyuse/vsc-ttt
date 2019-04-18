# Change Log

## [0.0.6] - 2019-04-18

- Support multiple selections for `Ttt: Do Ttt`

## [0.0.5] - 2019-04-18

- Now `Ttt: Do Ttt Via Clipboard` does ttt on selection if there is selection
- Remove `Ttt: Ttt On Clipboard` (`extension.tttOnClipboard`) and `ctrl+j`

## [0.0.4] - 2019-04-18

- `Ttt: Do Ttt Via Clipboard` (`extension.doTttViaClipboard`) command
- `alt+j` (or `cmd+j` on macOS) keybinding when `!editorTextFocus && inputFocus`

Tips

- VS Code の検索ボックス等の中で `alt+j` (macOS なら `cmd+j`) だけでコードを日本語テキストに変換できます。クリップボードの内容は復元されます
  - コードの書き方は [0.0.2] と同様で、`:` で無変換、`@` で変換
  - 入力ボックス内のすべてが変換対象 (カーソルより左を変換対象とする通常の ttt 変換とは異なる)
  - クリップボードを使用した後に元の内容を書き戻しているので、クリップボード監視アプリを使っていると、少しうるさいかも

## [0.0.3] - 2019-04-18

- Now using the VS Code clipboard api (instead of clipboardy)

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
