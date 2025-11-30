
import { boardEl, botMove, engine, fmtBoard, fmtFEN,createBoard, printBoard,globalBoard } from "./app";
import { ref, set, update, get } from "firebase/database";
import { db, auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { handleMove } from "./move";
import { fillPieces, on } from "./board";
let user = null;
let side = '';
let turn = '';
let activePiece = null;
let fromPos = '';
let startClientX = null, startClientY = null;
let startLeft = null, startTop = null,curMove = '';

let depth = null;
const toastDiff = document.getElementById('toast-difficulty');
const diffButton = toastDiff?.querySelectorAll('[data-level]');
const closeToast = document.getElementById('btn-close-diff');
const confirmToast = document.getElementById('btn-confirm-diff');

const moveList=document.getElementById('moves-list');
let indexMove=1;
let blackMove='';
let whiteMove='';
function goToRoom()
{
    const opts={mode:'bot',difficulty:depth};
    const url=new URL('room.html',window.location.origin);
    url.searchParams.set('mode',opts.mode);
    url.searchParams.set('difficulty',opts.difficulty);
    window.location.href=url.href;
}
document.addEventListener('DOMContentLoaded', () => {

    on('board-change',(globalBoard)=>{
        console.log('ok');
        fillPieces();
        botGo();
    })
    confirmToast.addEventListener('click', async () => {
        const boardWrap = document.querySelector('.board-wrap');
        boardWrap.classList.add('is-ready');
        toastDiff.classList.add('hide');
        engine.postMessage('ucinewgame')
        engine.postMessage(`setoption name Skill Level value ${depth}`);
        goToRoom();
    })

    diffButton.forEach(btn => {
        btn.addEventListener('click', (e) => {
            diffButton.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const level = btn.dataset.level;
            console.log(level);

            if (level == 'normal')
                depth = 9;
            else if (level == 'hard')
                depth = 14;
            else
                depth = 5;
            console.log(`Difficult: ${depth}`);
        })
    })
})
function parseMove(uci) {
    const fromCol = uci[0].toUpperCase();
    const fromRow = uci[1];
    const toCol = uci[2].toUpperCase();
    const toRow = uci[3];
    return { from: fromCol + fromRow, to: toCol + toRow };
}
function botGo() {
    const fen = fmtFEN(globalBoard, 'black');
    engine.postMessage(`position fen ${fen}`);
    engine.postMessage('go depth 10');
    engine.onmessage = (e) => {
        const line = typeof e.data === 'string' ? e.data : e;
        if (line.startsWith('bestmove')) {
            const move = line.split(' ')[1];
            const parse = parseMove(move);
            const { from, to } = parse;
            curMove = to;

            if (move == '(none)') {
                showResult('lose');
            }

            setTimeout(() => {
                //moveS = fmtMove(globalBoard[from], from, to);
                // undoMoves.push({ move: from + to, capture: globalBoard[to] });
                // gListMove.push(moveS);
                curMove = to;
                globalBoard[to] = globalBoard[from];
                globalBoard[from] = '.';
                blackMove = curMove.toLowerCase();
                const { m, k } = handleMove({ name: globalBoard[to] }, to, globalBoard);
                let kill = k;

                const check = kill.find(move => globalBoard[move].toLowerCase() == 'k')
                // if (check) {
                //     moveS += '+';
                // }
                //addMoveList(gListMove);
                fillPieces('bot', 'white', 1);

            }, 1000); // 1000ms = 1

        }
    };
    engine.onerror = (err) => {
        console.error('[ENGINE ERROR]', err);
    };
}