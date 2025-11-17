

import { BOARD } from "./constants/piece";
export let boardEl = null;
export let engine = null;
export let botMove = '';
async function renderBoard() {
    try {

        if (!boardEl)
            boardEl = document.getElementById('board');
        let cols = 'ABCDEFGH';
        for (let i = 8; i >= 1; i--) {
            for (let j = 0; j < 8; j++) {
                const li = document.createElement('li');
                li.className = 'square';
                li.dataset.value = cols[j]+i;
                li.dataset.rank=i;
                li.dataset.file=cols[j];
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
    createEngine();
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
    for (let i = 1; i <= 8; i++) {
        let col = 0;
        for (let j of rows[i - 1]) {
            let pos = '';

            if (Number.isInteger(Number.parseInt(j))) {
                let cnt = Number.parseInt(j);
                while (cnt--) {
                    pos = String.fromCharCode(('A').charCodeAt(0) + col) + i;
                    board[pos] = '';
                    ++col;
                }
            }
            else {
                pos = String.fromCharCode(('A').charCodeAt(0) + col) + i;
                board[pos] = j;
                ++col;
            }
        }
    }
    return board;
}
export function fmtFEN(board, turn) {
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
        if (i >1)
            line += '/';
        fen += line;
    }

    return fen + ' b - - 0 1';
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
document.addEventListener('DOMContentLoaded', loadData);





