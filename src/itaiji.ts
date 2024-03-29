import { dictionaryPaths, getConfiguration, readTextFilesSync } from './utils';

type ItaijiMaz = string[][];

let itaijiMaz: ItaijiMaz = [];

const itaijiLoadMaz = () => {
    itaijiMaz = [];
    const files = dictionaryPaths(getConfiguration().itaijiMazFiles);
    const str = readTextFilesSync(files);
    const lines = str.split("\n");
    for (const line of lines) {
        const ls = line.split(/[ \t]+/);
        const len = ls.length;
        if (len === 1) {
            itaijiMaz.push(line.split(""));
        } else if (len === 2) {
            const [c1, c2] = [ls[0], ls[1]];
            let elm = itaijiMaz.find((e) => e.includes(c1));
            if (!elm) {
                itaijiMaz.push(ls);
            } else if (!elm.includes(c2)) {
                elm.push(c2);
            }
        }
    }
}

itaijiLoadMaz();

export const itaijiLook = (key: string) => {
    for (const ls of itaijiMaz) {
        if (ls.includes(key)) {
            return ls.filter((ch) => ch !== key);
        }
    }
    // return null;
    return [];
}
