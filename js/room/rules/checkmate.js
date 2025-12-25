import { globalBoard } from "../../app";
import { highlightCheck } from "./check";
import { S } from '../state'
import { handleMove } from "../../move";
export function canCheckMate() {
    let isCheckMate = true;
    const tmp = S.check;
    const { side, posKing, posAttacker } = tmp;
    const king = globalBoard[posKing];
    const { m: kingCanMove } = handleMove(king, posKing);
    globalBoard[posKing] = '.';
    kingCanMove.forEach(x => {
        globalBoard[x] = king;
        highlightCheck();
        if (!S.check) {
            isCheckMate = false;
        }
        globalBoard[x] = '.'
    })
    S.check = tmp;
    globalBoard[posKing] = king;
    //highlightCheck();
    if(posAttacker.length>=2){
        return isCheckMate
    }
    return isCheckMate && isSafe(posAttacker[0]) && !isBlock(posKing, posAttacker[0]);
}
function isSafe(to) {
    if (!to)
        return false;
    let isSafe = true;
    for (const [pos, piece] of Object.entries(globalBoard)) {
        if (piece == '.')
            continue;
        const { k } = handleMove(piece, pos);
        const res = k.find(move => move == to)
        if (res) {
            isSafe = false;
            break;
        }
    }
    return isSafe
}
function isBlock(from, to) {
    let isBlock = false;
    const attacker = globalBoard[to].toUpperCase();
    if (attacker == 'P' || attacker == 'K' || attacker == 'N')
        return false;
    let path = [];
    let col = to[0].charCodeAt(0);
    let row = Number(to[1]);
    const dCol = Math.sign(from[0].charCodeAt(0) - to[0].charCodeAt(0));
    const dRow = Math.sign(Number(from[1]) - Number(to[1]));
    while (col != from[0].charCodeAt(0) || row != Number(from[1])) {
        col += dCol;
        row += dRow;
        path.push(String.fromCharCode(col) + row);
    }
    path = path.filter(move => move != from && move != to);
    const setPath = new Set(path);
    for (const [pos, piece] of Object.entries(globalBoard)) {
        if (piece == '.' || pos == from || pos == to) {
            continue;
        }
        const side = piece == piece.toUpperCase() ? 'white' : 'black';
        if (S.side != side) {
            const { m: move } = handleMove(piece, pos);
            const hasCommon = move.some(m => setPath.has(m));
            if (hasCommon) {
                isBlock = true;
                break;
            }
        }

    }
    return isBlock;
}