import { BOARD, PIECES, PIECES_AT } from "./constants/piece";
import { ref } from "firebase/database";
import { db } from "./firebase";
import { globalBoard } from "./board";
export function handleMove(piece, from, to) {
    const id = piece.dataset.value;
    const cur = PIECES.find(item => item.id == id);
    console.log(to);
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
function fmtPos(pos) {


    const squares = document.querySelectorAll('#board li')
    let res = null;
    squares.forEach((item, index) => {
        if (item.dataset.value == pos) {
            res = [Math.floor(index / 8), index % 8];
        }
    })
    console.log(res)
    return res;
}
function updatePiecePos(to, piece) {

    console.log('TO', to);
    const oldX = piece.x;
    const oldY = piece.y;
    const x = fmtPos(to)[0];
    const y = fmtPos(to)[1];









    piece.x = x;
    piece.y = y;
    piece.pos = to;
    piece.isClick = true;


}
function isValid(x, y, piece) {
    console.log(piece);
    if (x < 0 || x > 7 || y < 0 || y > 7)
        return false;
    // const opp = PIECES.find(item => item.id == PIECES_AT[x][y]);
    // if (!opp || (opp.side != piece.side)) {
    //     return true;
    // }
    for (const [k, v] of Object.entries(globalBoard)) {
        const des=fmtPos(k);
        if(des&&x==des[0]&&y==des[1]&&piece.id!=v)
            return true;
    }
    return false;
}
function samePos(a, b) {
    return a && b && a[0] == a[0] && b[1] == b[1]
}
function handlePawn(piece, from, to) {

    let { isClick } = piece;
    const start = fmtPos(from);
    const des = fmtPos(to);
    const x = start[0], y = start[1];
    let moves = [];
    if (isValid(x - 1, y, piece)) {
        moves.push([x - 1, y]);
    }
    console.log(moves);
    if (!isClick && isValid(x - 2, y, piece)) {
        moves.push([x - 2, y]);
    }
    const ok = moves.some(item => samePos(item, des))
    return ok;

}
function handleKnight(piece, from, to) {
    const start = fmtPos(from);
    const des = fmtPos(to);
    const x = start[0], y = start[1];
    let steps = [-2, -1, 1, 2];
    let moves = [];
    for (let i of steps) {
        for (let j of steps) {
            let pieceX = x + i, pieceY = y + j;
            if (!isValid(pieceX, pieceY, piece)) {
                continue;
            }
            if (Math.abs(i * j) != 2)
                continue;
            moves.push([pieceX, pieceY]);
        }
    }
    const ok = moves.some(item => samePos(item, des))
    return ok;
}
function handleRook(piece, from, to) {
    const start = fmtPos(from);
    const des = fmtPos(to);
    const x = start[0], y = start[1];
    let moves = [];
    let steps = [1, -1, 0];
    for (let i of steps) {
        for (let j of steps) {
            if (i * j != 0)
                continue;
            let pieceX = x + i, pieceY = y + j;
            while (isValid(pieceX, pieceY, piece)) {
                moves.push([pieceX, pieceY]);
                pieceX += i;
                pieceY += j;
            }
        }
    }
    console.log(moves);
    const ok = moves.some(item => samePos(item, des))
    return ok;
}
function handleBishop(piece, from, to) {
    const start = fmtPos(from);
    const des = fmtPos(to);
    const x = start[0], y = start[1];

    let moves = [];
    let steps = [1, -1];
    for (let i of steps) {
        for (let j of steps) {
            let pieceX = x + i, pieceY = y + j;
            while (isValid(pieceX, pieceY, piece)) {
                moves.push([pieceX, pieceY]);
                pieceX += i;
                pieceY += j;
            }
        }
    }
    const ok = moves.some(item => samePos(item, des))
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
    const start = fmtPos(from);
    const des = fmtPos(to);
    const x = start[0], y = start[1];

    let moves = [];
    let steps = [1, -1, 0];
    for (let i of steps) {
        for (let j of steps) {
            let pieceX = x + i, pieceY = y + j;
            if (isValid(pieceX, pieceY, piece)) {
                moves.push([pieceX, pieceY]);
                pieceX += i;
                pieceY += j;
            }
        }
    }
    const ok = moves.some(item => samePos(item, des))
    return ok;
}