import { get, update, set, onValue, onDisconnect } from "firebase/database";
import { auth, db, ref } from "./firebase";
import { boardEl, botMove, createEngine, printBoard } from "./app";
import {  fillPieces, undoMoves, botPause } from "./board";
import { engine } from "./app";
import { pieceMap, PIECES_AT } from "./constants/piece";
let gMatchId = null, startBoard = null;
export let gTimeW = 0, gTimeB = 0
const toastResult = document.getElementById('overlay-result');
const toastTitle = document.getElementById('result-title');
const toastSubTitle = document.getElementById('result-subtitle');
const btnCloseResult = document.getElementById('btn-close-result');
const btnNewGame = document.getElementById('btn-newgame-result');
const btn_newgame = document.getElementById('btn-newgame');
const btnHome = document.getElementById('btn-home');
const btnUndo = document.getElementById('btn-undone');
let timerW = null, timerB = null;
export function showResult(result) {
    switch (result) {
        case 'win':
            toastTitle.textContent = 'You win!';
            toastSubTitle.textContent = 'Checkmate. Nice game!';
            break;
        case 'lose':
            toastTitle.textContent = 'You lose!';
            toastSubTitle.textContent = 'So close, try next time!';
            break;
        case 'draw':
            toastTitle.textContent = 'Draw';
            toastSubTitle.textContent = 'The game ended in a draw.';
            break;
        default:
            break;
    }
    toastResult.classList.add('show');

}
export function clearTimer() {
    clearInterval(timerW);
    clearInterval(timerB);

}
async function flipBoardDOM() {
    const nodes = Array.from(boardEl.children);
    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j < 8; j++) {
            boardEl.appendChild(nodes[i * 8 + j]);
        }
    }
}

export function addMoveList(list) {
    if (!list)
        return;
    const ul = document.getElementById('moves');
    ul.innerHTML = '';
    let indexMove = 0;

    for (let i = 0; i < list.length; i += 2) {
        const white = list[i] ?? '';
        const black = list[i + 1] ?? '';

        const li = document.createElement('li');
        li.textContent = `${++indexMove}.  ${white}      ${black}`;
        ul.appendChild(li);
    }

    ul.parentElement.scrollTop = ul.parentElement.scrollHeight;
}

function fmtTime(time) {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return '' + m + ':' + s.toString().padStart(2, '0');
}
function onUndo() {
    const last = undoMoves.pop();
    const { move, capture } = last;
    const from = move.slice(0, 2);
    const to = move.slice(2, 4);
    globalBoard[from] = globalBoard[to];
    globalBoard[to] = capture;
    fillPieces('bot');
}
document.addEventListener('DOMContentLoaded', async () => {

    startBoard = globalBoard;
    const q = new URLSearchParams(location.search);
    const mode = q.get('mode');
    btnUndo.addEventListener('click', () => {
        onUndo();
    })
    btnCloseResult.addEventListener('click', () => {
        engine.postMessage('quit');
        toastResult.classList.remove('show');
    })
    // btnNewGame.addEventListener('click', () => {
    //     location.reload();
    //     toastResult.classList.remove('show');
    // })
    btnHome.addEventListener('click', () => {
        window.location.href = 'index.html';
    })
    btn_newgame.addEventListener('click', () => {
        if (gMatchId||mode!='bot') {
            alert(`Only Mode Bot`);
            return;
        }
        location.reload();
    })
    let cols = 'ABCDEFGH';
    for (let i = 1; i <= 8; i++) {
        for (let j = 0; j < 8; j++) {
            const pos = cols[j] + (9 - i);
            globalBoard[pos] = PIECES_AT[i - 1][j];
        }
    }
    // printBoard(globalBoard);

    switch (mode) {
        case 'bot':
            //document.body.classList.add('mode-online');
            fillPieces(mode, 'white', 1);
            const difficulty = q.get('difficulty');
            engine.onmessage = (e) => {
                const line = typeof e.data === 'string' ? e.data : e;
                if (line.startsWith('bestmove')) {
                    const move = line.split(' ')[1];
                    if (move == '(none)') {
                        showResult('lose');
                    }
                }
            };
            break;
        default:
            const p1 = document.getElementById('player-top');
            const p2 = document.getElementById('player-bottom');
            const playerBottomTurn = document.getElementById('p1-turn');
            const playerTopTurn = document.getElementById('p2-turn');
            const p2Name = document.getElementById('p2-name');
            const p1Name = document.getElementById('p1-name');
            const p2Clock = document.getElementById('p2-clock');
            const p1Clock = document.getElementById('p1-clock');

            document.body.classList.add('mode-online');

            const user = JSON.parse(localStorage.getItem('user'));
            const uid = user.uid;
            const snap = await get(ref(db, `users/${uid}`));
            const { matchId, side } = snap.val();
            gMatchId = matchId;
            const matchRef = ref(db, `matches/${matchId}`);
            if (side == 'black') {
                flipBoardDOM()
            }
            if (side == 'black') {
                p2Name.textContent = 'You';
                p1Name.textContent = 'Opponent';
            }
            else {
                p2Name.textContent = 'Opponent';
                p1Name.textContent = 'You';
            }
            onValue(matchRef, snap => {

                if (!snap.exists()) {
                    alert('Opponent left room');
                    return;
                }
                const { board, turn, winner, timeW, timeB, listMoves, msg } = snap.val();
                if (msg) {
                    alert(msg);
                    fillPieces('online', side, 0);
                    return;
                }
                addMoveList(listMoves);

                gTimeW = timeW;
                gTimeB = timeB;
                console.log(gTimeW, gTimeB);
                clearTimer();
                if (turn == 'white') {
                    p1.classList.remove('is-active');
                    p2.classList.add('is-active');
                    playerBottomTurn.classList.add('is-active');
                    playerTopTurn.classList.remove('is-active');
                    playerTopTurn.textContent = 'cc';
                    playerBottomTurn.textContent = (turn == side) ? 'Your turn!' : 'Waiting...';
                    p2Clock.textContent = fmtTime(gTimeB);

                    timerW = setInterval(() => {
                        p1Clock.textContent = fmtTime(gTimeW);
                        if (gTimeW == 0) {
                            p1Clock.textContent = "00:00";

                            showResult('lose')
                        }
                        --gTimeW;
                    }, 1000)
                }
                if (turn == 'black') {
                    p1.classList.add('is-active');
                    p2.classList.remove('is-active');
                    playerBottomTurn.classList.remove('is-active');
                    playerTopTurn.classList.add('is-active');
                    playerBottomTurn.textContent = '';
                    playerTopTurn.textContent = (turn == side) ? 'Your turn!' : 'Waiting...';
                    p1Clock.textContent = fmtTime(gTimeW);
                    timerB = setInterval(() => {
                        p2Clock.textContent = fmtTime(gTimeB);
                        if (gTimeB == 0) {
                            p2Clock.textContent = "00:00";
                            showResult('lose')
                        }
                        --gTimeB;
                    }, 1000)
                }
                globalBoard = board;
                console.log(winner);
                if (winner == 'none') {
                    fillPieces('online', side, turn == side);
                }
                else if (winner == uid) {
                    showResult('win');
                    fillPieces('online', side, 0);

                }
                else {
                    showResult('lose');
                    fillPieces('online', side, 0);
                }
            })
            //const matchSnap = await get(matchRef);
            const userRef = ref(db, `users/${uid}/matchId`);
            try {
                await onDisconnect(matchRef).set(null)
                await onDisconnect(userRef).set(null);
            } catch (error) {
                console.log(error);
            }

            break;
    }
})

