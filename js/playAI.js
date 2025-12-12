
import { boardEl, botMove, engine, fmtBoard, fmtFEN, createBoard, printBoard, globalBoard } from "./app";
import { ref, set, update, get } from "firebase/database";
import { db, auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { handleMove } from "./move";
import { fillPieces, on } from "./board";
let side = '';
let turn = '';
let fromPos = '';
let startLeft = null, startTop = null, curMove = '', LastMove = null;
let LastOppMove = null, YouMove = null;
const overplayResult = document.getElementById('overlay-result');
const resultIcon = document.getElementById('result-icon');
const resultBadge = document.getElementById('result-badge');
const resultTitle = document.getElementById('result-title');
const btnCloseResult = document.getElementById('btn-close-result');
let depth = null;
const toastDiff = document.getElementById('toast-difficulty');
const diffButton = toastDiff?.querySelectorAll('[data-level]');
const closeToast = document.getElementById('btn-close-diff');
const confirmToast = document.getElementById('btn-confirm-diff');
const moveList = document.getElementById('moves-list');
let indexMove = 1;
let blackMove = '';
let whiteMove = '';
let castlingFen = 'KQkq', enpassantFen = "";
let overplayPromotion = null, piecePromotion = null;
function goToRoom() {
    const opts = { mode: 'bot', difficulty: depth };
    const url = new URL('room.html', window.location.origin);
    url.searchParams.set('mode', opts.mode);
    url.searchParams.set('difficulty', opts.difficulty);
    window.location.href = url.href;
}
document.addEventListener('DOMContentLoaded', () => {
  
    fillPieces('white', 'white')
    on('board-change', ({ name, from, to }) => {
        turn='black';
        const capture = globalBoard[to];
        // let user move
        globalBoard[to] = name;
        globalBoard[from] = '.';
        const pos=highlightCheck();
        if (pos) {
            const king=globalBoard[pos];
            const isWhite=king==king.toUpperCase()?'white':'black';
            if(isWhite){
                //roll back
                globalBoard[from]=name;
                globalBoard[to]=capture;
                turn='white';

            }
        }
        fillPieces('white', 'white');
        highlightCheck();
        if (name === 'K') {
            castlingFen = castlingFen.replace("K", "").replace("Q", "");
        }
        if (from == 'A1') {
            castlingFen = castlingFen.replaceAll("Q", "");
        }
        if (from == 'H1') {
            castlingFen = castlingFen.replaceAll("K", "");
        }
        if (castlingFen == "")
            castlingFen = "-";

        enpassantFen = '-';
        if (name == 'P' && from[1] == '2' && to[1] == '4') {
            enpassantFen = from[0].toLowerCase() + '3';
        }



        LastMove = { name, from, to };
        if(turn=='black')
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
    const proMo=uci.length>=5?uci[4]:null;
    return { from: fromCol + fromRow, to: toCol + toRow,proMo };
}
export function showResult(result) {
    overplayResult.classList.remove('overlay-result--win', 'overlay-result--lose', 'overlay-result--draw');
    switch (result) {
        case 'win':
            overplayResult.classList.add('overlay-result--win')
            resultIcon.src = '/icons/star.png'
            resultBadge.textContent = 'Victory';
            resultTitle.textContent = 'Checkmate. Nice game!';
            break;
        case 'lose':
            overplayResult.classList.add('overlay-result--lose')
            resultIcon.src = '/icons/skull.png'
            resultBadge.textContent = 'Defeat';
            resultTitle.textContent = 'You lost';
            break;
        case 'draw':
            overplayResult.classList.add('overlay-result--draw')
            resultIcon.src = '/icons/handshake.png'
            resultBadge.textContent = 'Draw';
            resultTitle.textContent = 'Game drawn';
            break;
        default:
            break;
    }
    overplayResult.classList.add('show');

}
function highlightCheck() {
    let res = false;
    //const { name, from, to } = oppMove;
    let posCheck = false;
    for (const [pos, piece] of Object.entries(globalBoard)) {
        if (globalBoard[pos] == '.')
            continue;
        const { m, k } = handleMove(piece, pos);
        posCheck = k.find(move => globalBoard[move] == 'K' || globalBoard[move] == 'k');
        if (posCheck)
            break;
    }
    console.log(posCheck);
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => {
        if (sq.dataset.value == posCheck) {
            res = posCheck;
            sq.classList.add('is-check');
        }
        else {
            sq.classList.remove('is-check');
        }
    })
    return res;
}
function botGo() {
    const fen = fmtFEN(globalBoard, 'black', castlingFen, enpassantFen);
    engine.postMessage(`position fen ${fen}`);
    engine.postMessage('go depth 10');
    printBoard(globalBoard);
    engine.onmessage = (e) => {
        const line = typeof e.data === 'string' ? e.data : e;
        if (line.startsWith('bestmove')) {
            const move = line.split(' ')[1];
            const parse = parseMove(move);
            const { from, to,proMo } = parse;
            curMove = to;
            const name = globalBoard[from];
            if (move == '(none)') {
                showResult('lose');
            }
            setTimeout(() => {
                //moveS = fmtMove(globalBoard[from], from, to);
                // undoMoves.push({ move: from + to, capture: globalBoard[to] });
                // gListMove.push(moveS);
                curMove = to;
                globalBoard[to] = proMo?proMo:globalBoard[from];
                globalBoard[from] = '.';
                // console.log(from, to);
                // blackMove = curMove.toLowerCase();
                //const { m, k } = handleMove(globalBoard[to], to);
                //let kill = k;

                //const check = kill.find(move => globalBoard[move].toLowerCase() == 'k')
                // if (check) {
                //     moveS += '+';
                // }
                //addMoveList(gListMove);
                // if(name=='p'&&to[1]=='1'){

                // }
                fillPieces('black', 'black');
                highlightCheck();
                if (name === 'k') {
                    castlingFen = castlingFen.replace("k", "").replace("q", "");
                }


                if (from == 'A8') {
                    castlingFen = castlingFen.replaceAll("q", "");
                }
                if (from == 'H8') {
                    castlingFen = castlingFen.replaceAll("k", "");
                }
                if (castlingFen == "")
                    castlingFen = "-";


                enpassantFen = '-';
                if (name == 'p' && from[1] == '7' && to[1] == '5') {
                    enpassantFen = from[0].toLowerCase() + '6';
                }

            }, 1000); // 1000ms = 1

        }
    };
    engine.onerror = (err) => {
        console.error('[ENGINE ERROR]', err);
    };
}