

import { BOARD, PIECES_AT } from "./constants/piece";
import { handleMove } from "./move";
export let boardEl = null;
export let engine = null;
export let botMove = '';
export let globalBoard = null;
let castleFen = 'KQkq', enpassantFen = '', promotionFen = '';
export const engineEval = new Worker('/stockfish/stockfish-17.1-single-a496a04.js');
function createEngineEval(e) {
    e.postMessage("uci");
    e.postMessage("isready");
}
async function renderBoard() {
    try {
        if (!boardEl)
            boardEl = document.getElementById('board');
        let cols = 'ABCDEFGH';
        for (let i = 8; i >= 1; i--) {
            for (let j = 0; j < 8; j++) {
                const li = document.createElement('li');
                li.className = 'square';
                li.dataset.value = cols[j] + i;
                li.dataset.rank = i;
                li.dataset.file = cols[j];
                boardEl.appendChild(li);
            }
        }
        fillColorBoard();
    } catch (error) {
        console.log(error);
    }
}
function fillColorBoard() {
    const container = document.querySelectorAll('#board li')
    container.forEach((item, index) => {
        item.style.backgroundColor = (Math.floor(index / 8) + index) % 2 == 0 ? '#EEEED2' : '#769656';
    })
}
function loadData() {
    renderBoard();
    createBoard();
    createEngine();
    createEngineEval(engineEval)
    try {
    } catch (error) {
        console.log(error);
    }
}
export function fmtBoard(fen) {
    const str = fen.split(' ');
    const rows = str[0].split('/');
    const turn = str[1];
    const board = {};
    for (let i = 8; i >= 1; i--) {
        let col = 0;
        for (let j of rows[i - 1]) {
            let pos = '';

            if (Number.isInteger(Number.parseInt(j))) {
                let cnt = Number.parseInt(j);
                while (cnt--) {
                    pos = String.fromCharCode(('A').charCodeAt(0) + col) + (9 - i);
                    board[pos] = '.';
                    ++col;
                }
            }
            else {
                pos = String.fromCharCode(('A').charCodeAt(0) + col) + (9 - i);
                board[pos] = j;
                ++col;
            }
        }
    }
    console.log(board);
    return board;
}
export function fmtFEN(board, turn, castlingFen, enpassantFen) {
    let fen = '';
    let cols = 'ABCDEFGH';
    for (let i = 8; i >= 1; i--) {
        let line = '';
        let cnt = 0;
        for (let j = 0; j < 8; j++) {
            let pos = cols[j] + i;
            if (board[pos] == '.') {
                ++cnt;
            }
            else {
                let pos = cols[j] + i;
                line += (cnt > 0 ? cnt : '') + board[pos];
                cnt = 0;
            }
        }
        if (cnt)
            line += cnt;
        if (i > 1)
            line += '/';
        fen += line;
    }

    return fen + ` ${turn == 'white' ? 'w' : 'b'} ${castlingFen} ${enpassantFen} 0 1`;
}
export function printBoard(board) {
    let cols = 'ABCDEFGH';
    for (let i = 1; i <= 8; i++) {
        let line = i + '| ';
        for (let j = 0; j < 8; j++) {
            let pos = cols[j] + i;
            if (board[pos] == '')
                line += '. ';
            else
                line += board[pos] + ' ';
        }
        line += '\n';
        console.log(line)
    }
    console.log('   ---------------')
    console.log('   A B C D E F G H ');
}
export function createEngine() {
    engine = new Worker('/stockfish/stockfish-17.1-single-a496a04.js');

    engine.onerror = (err) => {
        console.error('[ENGINE ERROR]', err);
    };

    engine.postMessage('uci');
    engine.postMessage('isready');
    return engine;
}
export function getCastleFEN(name, from, to) {
    const capture = globalBoard[to];
    if (name == 'K') {
        castleFen = castleFen.replace('K', '').replace('Q', '');
    }
    if (name == 'k') {
        castleFen = castleFen.replace('k', '').replace('q', '');
    }
    if (name == 'R') {
        if (from == 'A1')
            castleFen = castleFen.replace('Q', '');
        if (from == 'H1')
            castleFen = castleFen.replace('K', '');
    }
    if (name == 'r') {
        if (from == 'A8')
            castleFen = castleFen.replace('q', '');
        if (from == 'H8')
            castleFen = castleFen.replace('k', '');
    }
    if (capture == 'R') {
        if (to == 'A1')
            castleFen = castleFen.replace('Q', '');
        if (to == 'H1')
            castleFen = castleFen.replace('K', '');
    }
    if (capture == 'r') {
        if (to == 'A8')
            castleFen = castleFen.replace('q', '');
        if (to == 'H8')
            castleFen = castleFen.replace('k', '');
    }
    if (castleFen == '')
        castleFen = '-';
    return castleFen;
}
export function getEnpassantFEN(name, from, to) {
    if (name == 'P' && from[1] == '2' && to[1] == '4')
        return to[0].toLowerCase() + (parseInt(to[1]) - 1);
    if (name == 'p' && from[1] == '7' && to[1] == '5')
        return to[0].toLowerCase() + (parseInt(to[1]) + 1);
    return '-';
}
export function createBoard() {
    if (!globalBoard)
        globalBoard = {};
    let cols = 'ABCDEFGH';
    for (let i = 1; i <= 8; i++) {
        for (let j = 0; j < 8; j++) {
            const pos = cols[j] + (9 - i);
            globalBoard[pos] = PIECES_AT[i - 1][j];
        }
    }
}
export function updateBoard(board) {
    globalBoard = board
}
document.addEventListener('DOMContentLoaded', loadData);





