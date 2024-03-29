import { dictionaryPaths, getConfiguration, readTextFilesSync } from './utils';

interface BushuRev {
    [key: string]: string[];
};

interface BushuDic {
    [key: string]: string;
};

let bushuRev: BushuRev = {};
let bushuDic: BushuDic = {};

const bushuLoadRev = () => {
    bushuRev = {};
    bushuDic = {};
    const files = dictionaryPaths(getConfiguration().bushuRevFiles);
    const str = readTextFilesSync(files);
    const lines = str.split("\n");
    for (const line of lines) {
        const ls = line.split("");
        const len = ls.length;
        if (len === 2) {
            bushuRev[ls[1]] = [ls[0], ""];
        } else if (len === 3) {
            bushuRev[ls[0]] = [ls[1], ls[2]];
            bushuDic[ls[1] + ls[2]] = ls[0];
        }
    }
}

bushuLoadRev();

const bushuLookSub = (a: string, b: string) => {
    return bushuDic[a + b];
}

const bushuLookRev = (c: string) => {
    const ret = bushuRev[c];
    return ret === undefined ? [c, ""] : ret;
}

const bushuLookOneSided = (a: string, b: string) => {
    let ret: string[] = [];
    const a12 = bushuLookRev(a); const a1 = a12[0]; const a2 = a12[1];
    const b12 = bushuLookRev(b); const b1 = b12[0]; const b2 = b12[1];
    let c = bushuLookSub(a, b);
    // 文字の足し算
    if (c !== undefined) { ret.push(c); }
    // 文字の引き算
    if (a2 === b || a2 === b1 && b2 === "") { ret.push(a1); }
    if (a1 === b || a1 === b1 && b2 === "") { ret.push(a2); }
    // 部品の足し算
    if ((c = bushuLookSub(a, b1)) !== undefined) { ret.push(c); }
    if ((c = bushuLookSub(a, b2)) !== undefined) { ret.push(c); }
    if ((c = bushuLookSub(a1, b)) !== undefined) { ret.push(c); }
    if ((c = bushuLookSub(a1, b1)) !== undefined) { ret.push(c); }
    if ((c = bushuLookSub(a1, b2)) !== undefined) { ret.push(c); }
    if ((c = bushuLookSub(a2, b)) !== undefined) { ret.push(c); }
    if ((c = bushuLookSub(a2, b1)) !== undefined) { ret.push(c); }
    if ((c = bushuLookSub(a2, b2)) !== undefined) { ret.push(c); }
    // 部品の引き算
    if (a2 === b1) { ret.push(a1); }
    if (a1 === b2) { ret.push(a2); }
    if (a1 === b1) { ret.push(a2); }
    if (a2 === b2) { ret.push(a1); }
    //
    return ret;
}

export const bushuLook = (a: string, b: string) => {
    let ls = bushuLookOneSided(a, b).concat(bushuLookOneSided(b, a));
    ls = ls.filter((c) => c !== "" && c !== a && c !== b)
    // uniq
    // return ls.filter((elm, index, self) => self.indexOf(elm) === index);
    return [...new Set(ls)];
}
