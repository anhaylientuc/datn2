import { globalBoard } from "../../app";
export function fmtSAN(move) {
    let { name, from, to, special } = move;
    name = name.toUpperCase();
    from = from.toLowerCase();
    const capture = globalBoard[to].toUpperCase();
    to = to.toLowerCase();
    if (special) {
        if (name == 'K') {
            return to[0] == 'c' ? 'O-O-O' : 'O-O';
        }
    }
    let res = '';
    if (name != 'P')
        res += name;
    if (capture != '.' || special == 'enpassant') {
        res += 'x';
        if (name == 'P')
            res = from[0] + res;
    }
    res += to;
    if (special == 'promotion') {
        res += '=' + name;
        res = from[0] + res.slice(1);
    }
    return res;
}