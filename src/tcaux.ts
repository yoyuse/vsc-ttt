import * as vscode from 'vscode';
import { ttt } from './extension';
import { bushuLook } from "./bushu";
import { itaijiLook } from './itaiji';
import { mazeLook } from './maze';

export const invalidateAll = (str: string) => {
    return str.replace("@b", "◆").replace("@m", "◇");
};

export const reduce = async (str: string): Promise<string> => {
    const m = /(.*)(@[bm])(.*)/.exec(str);
    if (!m) { return invalidateAll(str); }
    const str1 = m[1];
    const str2 = m[2];
    const str3 = m[3];
    const ls = str3.split("");
    if (str2 === "@b") {
        if (ls.length < 2) { return invalidateAll(str); }
        const a = ls[0];
        const b = ls[1];
        const cands = bushuLook(a, b);
        if (cands.length < 1) { return invalidateAll(str); }
        const c = cands[0];
        showCodeHelp(c);
        return await reduce(str1 + c + str3.substring(2));
    } else if (str2 === "@m") {
        if (ls.length < 1) { return invalidateAll(str); }
        const s = str3;
        let cands = itaijiLook(s).concat(mazeLook(s));
        cands = [...new Set(cands)].filter((c) => c !== s);
        let c: string = "";
        if (cands.length === 0) { return invalidateAll(str); }
        else if (cands.length === 1) {
            c = cands[0];
        } else {
            const selected = await vscode.window.showQuickPick(cands, { placeHolder: `◇${s}` });
            if (!selected) { return invalidateAll(str); }
            c = selected;
        }
        showCodeHelp(c, s);
        return await reduce(str1 + c);
    } else {
        return invalidateAll(str);
    }
};

export const showCodeHelp = (str: string, certain: string = "") => {
    const help = ttt.codeHelpString(str, certain);
    vscode.window.setStatusBarMessage(help, 10000);
}
