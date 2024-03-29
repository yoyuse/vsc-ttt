import { dictionaryPaths, getConfiguration, readTextFilesSync } from './utils';

interface MazeYomEntry { re: RegExp, cand: string };
type MazeYom = MazeYomEntry[];

let mazeYom: MazeYom = [];

const mazeLoadYom = () => {
    mazeYom = [];
    const files = dictionaryPaths(getConfiguration().mazeYomFiles);
    const str = readTextFilesSync(files);
    const lines = str.split("\n");
    for (const line of lines) {
        const ls = line.split(/[ \t]+/);
        const len = ls.length;
        if (/^;;;/.test(line)) { continue; }
        else if (len === 1) {
            const cand = line.replace(/(.)<(.+?)>/g, "$1").replace(/—$/, "")
            const re = new RegExp("^" + line.replace(/(.)<(.+?)>/g, "($1|$2)").replace(/—$/, "$&?") + "$")
            mazeYom.push({ re: re, cand: cand });
        } else if (len === 2) {
            const cand = ls[1].replace(/—$/, "");
            const re = new RegExp("^" + ls[0].replace(/—$/, "$&?") + "$");
            mazeYom.push({ re: re, cand: cand });
        }
    }
}

mazeLoadYom();

export const mazeLook = (str: string) => {
    let ret = mazeYom.filter((ls) => {
        const re = ls.re;
        const cand = ls.cand;
        return re.test(str) && cand !== str
    });
    return [...new Set(ret.map((ls) => ls.cand))];
}
