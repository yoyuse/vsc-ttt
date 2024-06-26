import * as vscode from 'vscode';
import fetch from "node-fetch";
import { Ttt } from './ttt';
import { showCodeHelp } from './tcaux';

interface KanjiConverted {
    kana: string,
    candidates: string[]
};

type KanjiConvertedList = KanjiConverted[];

const googleTransliterate = async (hiragana: string): Promise<KanjiConvertedList> => {
    const response_json: Array<[string, string[]]> = await (await fetch(`http://www.google.com/transliterate?langpair=ja-Hira|ja&text=${encodeURIComponent(hiragana)}`)).json();
    return response_json.map(element => ({ kana: element[0], candidates: element[1] }));
}

export const doKkt = async (editor: vscode.TextEditor, ttt: Ttt) => {
    for (const selection of editor.selections) {
        const range = await ttt.doTttSub(selection, editor);
        await doKktSub(range, editor);
    }
}

const doKktSub = async (range: vscode.Range, editor: vscode.TextEditor) => {
    if (range.isEmpty) { return; }
    const text = editor.document.getText(range);
    const convertedList = await googleTransliterate(text);
    let dst = "";
    try {
        for (let converted of convertedList) {
            const kanji = converted.candidates;
            await vscode.window.showQuickPick(kanji).then(selected => {
                if (!selected) { throw new Error("canceled"); }
                dst += selected;
            });
        }
    } catch (e) { return; }
    if (dst === text) { return; }
    await editor.edit((editorEdit) => {
        editorEdit.replace(range, "");
        editorEdit.insert(range.start, dst);
    });
    showCodeHelp(dst, text);
}
