import { BOARD, PIECES, PIECES_AT } from "./constants/piece";
import { ref } from "firebase/database";
import { db } from "./firebase";
import { globalBoard } from "./board";
let isKill = false;
export function handleMove(piece, from, to) {
    const id = piece.dataset.value;
    const cur = PIECES.find(item => item.id == id);
    switch (cur.name) {
        case 'pawn':
            return handlePawn(cur, from, to);
        case 'knight':
            return handleKnight(cur, from, to);
        case 'rook':
            return handleRook(cur, from, to);
        case 'bishop':
            return handleBishop(cur, from, to);
        case 'queen':
            return handleQueen(cur, from, to);
        case 'king':
            return handleKing(cur, from, to);
        default:
            break;
    }
}
function fmt(c, i) {
    return String.fromCharCode(c.charCodeAt(0) + i);
}
function canKill(from, to) {
    try {
        if (!globalBoard[to])
            return false;
        const idFrom = globalBoard[from];
        const idTo = globalBoard[to];
        if (idTo == 0)
            return false;
        const fromSide = PIECES[idFrom - 1].side;
        const toSide = PIECES[idTo - 1].side;
        return (fromSide != toSide);
    } catch (error) {
        console.log(error)
    }

}
function isValid(to) {
    return globalBoard[to] == 0;
}
function handlePawn(piece, from, to) {

    let { isClick, side } = piece;
    let moves = [];
    let steps = [-2, -1, 1, 2];
    for (let i of steps) {
        if (Math.abs(i) == 2 && isClick)
            continue;
        if (side == 'white' && i > 0)
            continue;
        if (side == 'black' && i < 0)
            continue;
        const row=Number(from[1])+i;
        const newTo = from[0] + row;
        if (isValid(newTo)) {
            moves.push(newTo);
        }
    }
    let row=Number(from[1])+ (side == 'white' ? -1 : 1);
    const kill_1 = fmt(from[0], -1) + row;
    const kill_2 = fmt(from[0], 1) + row;
    console.log(from,kill_1,kill_2);
    if (canKill(from, kill_1)) {
        moves.push(kill_1);
    }
    if (canKill(from,kill_2)) {
        moves.push(kill_2);
    }
    const ok = moves.some(move => move == to)
    if (ok) {
        piece.isClick = true;
    }
    return ok;

}

function handleKnight(piece, from, to) {
    let steps = [-2, -1, 1, 2];
    let moves = [];
    console.log(from);
    for (let i of steps) {
        for (let j of steps) {
            if (Math.abs(i * j) != 2)
                continue;
            const row=Number(from[1])+j;
            const newTo = fmt(from[0], i) + row;
            console.log(row);
            if (isValid(newTo)) {
                moves.push(newTo);
                continue;
            }
            if (canKill(from, newTo)) {
                moves.push(newTo);
                break;
            }
        }
    }
    const ok = moves.some(move => move == to);
    return ok;
}
function handleRook(piece, from, to) {
    let moves = [];
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
                else if (canKill(from, to)) {
                    moves.push(newTo);
                    break;
                }
                break;
            }
        }
    }
    const ok = moves.some(move => move == to);
    return ok;
}
function handleBishop(piece, from, to) {
    let moves = [];
    let steps = [1, -1];
    for (let i of steps) {
        for (let j of steps) {
            for (let k = 1; k <= 8; k++) {
                const row=Number(from[1])+k*j;
                const newTo = fmt(from[0], k * i) + row;
                if (isValid(newTo)) {
                    moves.push(newTo);
                    continue;
                }
                if (canKill(from, newTo)) {
                    moves.push(newTo);
                    break;
                }
            }
        }
    }
    const ok = moves.some(move => move == to)
    return ok;
}
function handleQueen(piece, from, to) {
    let bishopCheck = handleBishop(piece, from, to);
    let rookCheck = handleRook(piece, from, to);
    if (bishopCheck)
        return bishopCheck;
    return rookCheck;

}

function handleKing(piece, from, to) {
    let moves = [];
    let steps = [1, -1, 0];
    for (let i of steps) {
        for (let j of steps) {
            const row=Number(from[1])+j;
            const newTo=fmt(from[0],i)+row;
            if(isValid(newTo)||canKill(from,newTo)){
                moves.push(newTo)
            }
        }
    }
    const ok = moves.some(move => move == to)
    return ok;
}