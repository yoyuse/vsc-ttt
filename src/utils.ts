import { readFileSync } from 'fs';
import { homedir } from 'os';
import { resolve } from 'path';
import * as vscode from 'vscode';

export const getConfiguration = () => vscode.workspace.getConfiguration("ttt");

export const expandPath = (str: string) => {
    const home: string = homedir().replace(/\\/g, "/")
    return str.replace(/^~\//, home + "/");
};

export const dictionaryPaths = (dictionaryFiles: string): string[] => {
    const directory = expandPath(getConfiguration().defaultDictionaryDirectory);
    return dictionaryFiles.split(" ").map((filename) => resolve(directory, expandPath(filename)));
}

export const readTextFilesSync = (files: string[]): string => {
    let str = "";
    for (const file of files) {
        try {
            str += readFileSync(file, 'utf8');
        } catch (error) {
            const message = `cannot read ${file}: skipped.`;
            console.error(message);
            vscode.window.showWarningMessage(message);
        }
    }
    return str;
}
