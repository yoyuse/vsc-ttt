# vsc-ttt

Yet another modeless Japanese input for VS Code

## Features

TT-code (T-Code の拡張) のコードを日本語にモードレスで変換します。

### ttt 変換

`alt+j` (Windows, Linux) または `cmd+j` (macOS) で、カーソルの左のコードを日本語に変換します。
たとえば、`kryglp` を変換すると `日本語` のようになります。
変換対象となるのは、カーソルより左、コード文字が続く限り (典型的には、日本語と ASCII の間の空白の手前まで)、または区切り文字 `:` が現れるまでの範囲です。
区切り文字 `:` は変換後に消去されます。
日本語と ASCII の間に空白を空けたくないときは `:` を使用してください。

### 検索ボックスなどでの変換

検索ボックスなどの中では、 ~~選択範囲があれば選択範囲を、なければ~~ 全体を変換します。
コード文字列中では、`:` で無変換、`@` で変換を指定できます。
たとえば、`VS Code:0rwj@ vsc-ttt: jgjflf` を変換すると、`VS Code拡張 vsc-ttt は…` のようになります。

### かな漢字変換

`alt+shift+j` (Windows, Linux) または `cmd+shift+j` (macOS) で、カーソルの左の (ひらがなの) コードを変換したのち、さらに [Google CGI API for Japanese Input](https://www.google.co.jp/ime/cgiapi.html) により、かな漢字変換を行います。
また、かな漢字変換された文字のコードを、ステータスバーに表示します。
たとえば、`jendux;;ndjend` を変換すると `漢字変換` のようになります。

### 補助変換

辞書をインストールすると、部首合成変換・交ぜ書き変換の補助変換が利用できます。

部首合成変換では、 `jfjf` に続く 2 文字が合成されます。
たとえば、 `jfjfpwha` を変換すると `森` のようになります。
再帰的な変換も可能です。
たとえば、 `jfjfpgjfjfpwpw` を変換すると `淋` のようになります。
変換できない組み合わせの場合は、 `jfjf` は `◆` となって残ります。

交ぜ書き変換では、 `fjfj` に続く読み (漢字を含んでいてもよい) が変換されます。
たとえば、 `fjfjml1fhr` を変換すると `完璧` のようになります。
変換は単語変換ですが、異体字変換を含んでいます。
たとえば、 `fjfjeg` を変換すると `廣` のようになります。
活用する語は、活用語尾を除いた読み (語幹) で変換してください。
変換できない読みの場合は、 `fjfj` は `◇` となって残ります。
たとえば、 `fjfjug/gjshd` は `◇さみしい` に、 `fjfjug/gjs` は `淋し` などに変換されます。

## Requirements

VS Code 1.75.0 以降

補助変換を利用するには、辞書が必要です。
[kanchoku/tc](https://github.com/kanchoku/tc) の tcode ディレクトリから以下のファイルを入手して、適当なフォルダに置いてください。

* 部首合成変換に必要: bushu.rev, symbol.rev
* 交ぜ書き変換に必要: pd_kihon.yom, jukujiku.maz, greece.maz
* 異体字変換に必要: itaiji.maz

mazegaki.dic は必要ありません。

## Extension Settings

### Ttt: Ttt Keyboard

* キーボードのレイアウトを `QWERTY`/`Dvorak`/`Custom` から選択します
* デフォルト値: `QWERTY`

### Ttt: Ttt Keys

* キーボードのレイアウトが `Custom` のときに使用する 40 個のキーを左上から右下に順に指定します
* デフォルト値: `1234567890qwertyuiopasdfghjkl;zxcvbnm,./` (`QWERTY` レイアウトに対応)

### Ttt: Ttt Delimiter

* 日本語と ASCII の間の区切り文字を指定します
* デフォルト値: `:`

### Ttt: Default Dictionary Directory

* 辞書ファイルのあるフォルダのパスを指定します
* 設定例: `~/tcode`

### Ttt: Bushu Rev Files

* 部首合成変換の辞書のファイル名をスペースで区切って指定します
* 設定例: `symbol.rev bushu.rev`

### Ttt: Maze Yom Files

* 交ぜ書き変換の辞書のファイル名をスペースで区切って指定します
* 設定例: `pd_kihon.yom jukujiku.maz greece.maz`

### Ttt: Itaiji Maz Files

* 異体字変換の辞書のファイル名をスペースで区切って指定します
* 設定例: `itaiji.maz`

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
