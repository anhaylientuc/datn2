import { globalBoard } from "./app";
import {  getCastlingMove, getEnPassantMove } from "./board";
let sideMap = null;
let moves = null, kill = null;
let piece = '', from = '';
export function handleMove(_piece, _from) {
    moves = [], kill = [];
    //globalBoard = board;
    sideMap = new Map();
    piece = _piece;
    from = _from;
    sideMap.set('P', 'white');
    sideMap.set('R', 'white');
    sideMap.set('N', 'white');
    sideMap.set('B', 'white');
    sideMap.set('Q', 'white');
    sideMap.set('K', 'white');

    sideMap.set('p', 'black');
    sideMap.set('r', 'black');
    sideMap.set('n', 'black');
    sideMap.set('b', 'black');
    sideMap.set('q', 'black');
    sideMap.set('k', 'black');


    switch (piece) {
        case 'P':
        case 'p':
            handlePawn();
            break;
        case 'N':
        case 'n':
            handleKnight();
            break;
        case 'R':
        case 'r':
            handleRook();
            break;
        case 'B':
        case 'b':
            handleBishop();
            break;
        case 'Q':
        case 'q':
            handleQueen();
            break;
        case 'K':
        case 'k':
            handleKing();
            break;
        default:
            console.log('Unknown piece:', piece);
    }
    return { m: moves, k: kill };
}
function fmt(c, i) {
    return String.fromCharCode(c.charCodeAt(0) + i);
}
function canKill(from, to) {

    const p1 = globalBoard[from];
    const p2 = globalBoard[to];

    if (!sideMap.get(p2)) {
        return false;
    }
    return sideMap.get(p1) != sideMap.get(p2);

}
function isValid(to) {
    const res = (globalBoard[to] == '.');
    return res;
}
function movesP() {
    let steps = [-2, -1, 1, 2];
    for (let i of steps) {
        if (i == -2 && from[1] != 7)
            continue;
        if (i == 2 && from[1] != 2)
            continue;
        if (piece == 'P' && i < 0) {
            continue;
        }

        if (piece == 'p' && i > 0)
            continue;
        const row = Number(from[1]) + i;
        const newTo = from[0] + row;
        if (isValid(newTo) && globalBoard[newTo] == '.') {
            moves.push(newTo);
        }
    }
    const move=getEnPassantMove();
    if(move)
        moves.push(...move);
}

function killsP() {
    let row = Number(from[1]) + (piece == 'P' ? 1 : -1);
    const kill_1 = fmt(from[0], -1) + row;
    const kill_2 = fmt(from[0], 1) + row;
    if (canKill(from, kill_1)) {
        kill.push(kill_1);
    }
    if (canKill(from, kill_2)) {
        kill.push(kill_2);
    }
    
}
function handlePawn() {
    movesP();
    killsP();
}
function handleKnight() {
    let steps = [-2, -1, 1, 2];
    for (let i of steps) {
        for (let j of steps) {
            if (Math.abs(i * j) != 2)
                continue;
            const row = Number(from[1]) + j;
           
            const newTo = fmt(from[0], i) + row;
            
           
            if (canKill(from, newTo)) {
                kill.push(newTo);
                continue;
            }
            if (isValid(newTo)) {
                moves.push(newTo);
                continue;
            }
            
        }
    }
}
function handleRook() {
    let steps = [1, -1, 0];
    for (let i of steps) {
        for (let j of steps) {
            if (i * j != 0)
                continue;
            for (let k = 1; k <= 8; k++) {
                const newTo = fmt(from[0], k * i) + fmt(from[1], k * j);
                if (isValid(newTo)) {
                    moves.push(newTo);
                    continue;
                }
                else if (canKill(from, newTo)) {
                    kill.push(newTo);
                    break;
                }
                break;
            }
        }
    }
}
function handleBishop() {
    let steps = [1, -1];
    for (let i of steps) {
        for (let j of steps) {
            for (let k = 1; k <= 8; k++) {
                const row = Number(from[1]) + k * j;
                const newTo = fmt(from[0], k * i) + row;
                if (isValid(newTo)) {
                    moves.push(newTo);
                    continue;
                }
                if (canKill(from, newTo)) {
                    kill.push(newTo);
                    break;
                }
                break;
            }
        }
    }
}
function handleQueen() {
    handleBishop();
    handleRook();
}
function handleKing() {
    let steps = [1, -1, 0];
    for (let i of steps) {
        for (let j of steps) {
            const row = Number(from[1]) + j;
            const newTo = fmt(from[0], i) + row;
            if (isValid(newTo)) {
                moves.push(newTo)
            }
            else if (canKill(from, newTo))
                kill.push(newTo);
        }
    }
    let res=getCastlingMove();
    res.forEach(move=>moves.push(move));
}