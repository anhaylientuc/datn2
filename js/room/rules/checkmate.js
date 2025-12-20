import { globalBoard } from "../../app";
import { highlightCheck } from "./check";
import {S} from '../state'
export function canCheckMate() {

    const king = S.side == 'white' ? 'k' : 'K';
    let steps = [-1, 0, 1], isCheckMate = true;
    let from = null;
    for (const [pos, piece] of Object.entries(globalBoard)) {
        if (globalBoard[pos] == king)
            from = pos;
    }
    if (!from)
        return false;
    globalBoard[from] = '.';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const file = String.fromCharCode(from[0].charCodeAt(0) + steps[i]);
            const rank = parseInt(from[1]) + steps[j];
            if (globalBoard[file + rank] && globalBoard[file + rank] == '.') {
                globalBoard[file + rank] = king;
                const res = highlightCheck();
                if (!res) {
                    isCheckMate = false;
                }
                globalBoard[file + rank] = '.';
            }
        }
    }
    globalBoard[from] = king;
    return isCheckMate;
}