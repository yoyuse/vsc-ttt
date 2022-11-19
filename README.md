# vsc-ttt

Yet another modeless Japanese input for VS Code

## Features

`alt+j` (Windows, Linux) または `cmd+j` (macOS) で、カーソルの左のコードを日本語に変換します。
変換対象となるのは、カーソルより左、コード文字が続く限り (典型的には、日本語と ASCII の間の空白の手前まで)、または区切り文字 `:` が現れるまでの範囲です。
区切り文字 `:` は変換後に消去されます。
日本語と ASCII の間に空白を空けたくないときは `:` を使用してください。

検索ボックスなどの中では、選択範囲があれば選択範囲を、なければ全体を変換します。
コード文字列中では、`:` で無変換、`@` で変換を指定できます。
たとえば、`VS Code:0rwj@ vsc-ttt: jgjflf` を変換すると、`VS Code拡張 vsc-ttt は…` のようになります。

## Requirements

VS Code 1.32.0 以降

## Extension Settings

設定項目はありません。

## Known Issues

macOS では `cmd+j` (`View: Toggle Panel`) のキーバインドを上書きします。
`View: Toggle Panel` を、たとえば `ctrl+cmd+j` に割り当て直すには、keybindings.json に次のように書きます。

``` keybindings.json
    {
        "key": "ctrl+cmd+j",
        "command": "workbench.action.togglePanel"
    },
```

検索ボックスなどの中での変換では、コードの読み取りと変換結果の書き戻しにクリップボードを使用します。
変換の後で、クリップボードの内容を変換前の内容に復元していますが、クリップボード監視アプリなどを使用していると、表示が煩わしいかもしれません。

## Release Notes

CHANGELOG.md を参照してください。
