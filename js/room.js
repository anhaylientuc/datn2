import { get, update, set, onValue, onDisconnect, ref } from "firebase/database";
import { auth, db } from "./firebase";
import { botMove, createEngine, printBoard, globalBoard, updateBoard, createBoard } from "./app";
import { fillPieces, undoMoves, botPause, on } from "./board";
import { engine } from "./app";
import { pieceMap, PIECES_AT } from "./constants/piece";
import { handleMove } from "./move";
let gMatchId = null, startBoard = null;
export let gTimeW = 0, gTimeB = 0
export let attackSquare = [];
let lastMove = '';
const overplayResult = document.getElementById('overlay-result');
const resultIcon = document.getElementById('result-icon');
const resultBadge = document.getElementById('result-badge');
const resultTitle = document.getElementById('result-title');
const btnCloseResult = document.getElementById('btn-close-result');
const btnHome = document.getElementById('btn-home');
const btnResign = document.getElementById('btn-resign');
let timerW = null, timerB = null;
let boardEl = null;
let You = '', Opp = '';
let turn = '', side = '', LastOppMove = '';
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
// function onUndo() {
//     const last = undoMoves.pop();
//     const { move, capture } = last;
//     const from = move.slice(0, 2);
//     const to = move.slice(2, 4);
//     globalBoard[from] = globalBoard[to];
//     globalBoard[to] = capture;
//     //fillPieces('bot');
// }
function highlightCheck() {
    let wCheck=null,bCheck=null;
    for (const [pos, piece] of Object.entries(globalBoard)) {
        if (globalBoard[pos] == '.')
            continue;
        const { m, k } = handleMove(piece, pos);
        const w = k.find(move => globalBoard[move] == 'K' );
        const b = k.find(move => globalBoard[move] == 'k' );
        if(w) wCheck=w;
        if(b) bCheck=b;
    }
    if(wCheck&&bCheck){
        return 'invalid';
    }
    console.log(wCheck,bCheck);
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => {
        if (sq.dataset.value == (wCheck||bCheck)) {
            sq.classList.add('is-check');
        }
        else {
            sq.classList.remove('is-check');
        }
    })
    return wCheck?'w':null||bCheck?'b':null;
}
export function getLastMove() {
    return lastMove;
}
document.addEventListener('DOMContentLoaded', async () => {
    boardEl = document.getElementById("board");
    const q = new URLSearchParams(location.search);
    btnCloseResult.addEventListener('click', () => {
        overplayResult.classList.remove('show');
    })
    btnHome.addEventListener('click', () => {
        window.location.href = 'index.html';
    })
    btnResign.addEventListener('click', () => {
        if (You && Opp) {
            update(matchRef, { winner: You == uid ? Opp : You });
            lockBoard();
        }

    })
    let cols = 'ABCDEFGH';
    for (let i = 1; i <= 8; i++) {
        for (let j = 0; j < 8; j++) {
            const pos = cols[j] + (9 - i);
            globalBoard[pos] = PIECES_AT[i - 1][j];
        }
    }
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
    const { matchId, side: sideSnap } = snap.val();
    side = sideSnap;
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
        let { board, turn: turnSnap, winner, timeW, timeB, listMoves, msg, lastMove: lastMoveSnap, a, b } = snap.val();
        lastMove = lastMoveSnap;
        LastOppMove = lastMoveSnap;
        You = a;
        Opp = b;
        turn = turnSnap;
        updateBoard(board);
        fillPieces(turn, side);
        if (lastMove) {
            document.querySelectorAll('.is-current')
                .forEach(el => el.classList.remove('is-current'));
            const curSquare = document.querySelector(`#board li[data-value="${lastMove.to}"]`);
            curSquare?.classList.add('is-current');
        }

        if (lastMove) {
            highlightCheck();
        }
        addMoveList(listMoves);

        gTimeW = timeW;
        gTimeB = timeB;
        clearTimer();
        if (turn == 'white') {
            p1.classList.remove('is-active');
            p2.classList.add('is-active');
            playerBottomTurn.classList.add('is-active');
            playerTopTurn.classList.remove('is-active');
            playerTopTurn.textContent = 'cc';
            playerBottomTurn.textContent = (turn == side) ? 'Your turn!' : 'Waiting...';
            p2Clock.textContent = fmtTime(gTimeB);
            if (winner == 'none') {
                timerW = setInterval(() => {
                    p1Clock.textContent = fmtTime(gTimeW);
                    if (gTimeW == 0) {
                        p1Clock.textContent = "00:00";
                        //update(matchRef,{winner:a!=uid?a:b});
                        //showResult('lose')
                        return;
                    }
                    --gTimeW;
                }, 1000)
            }

        }
        if (turn == 'black') {
            p1.classList.add('is-active');
            p2.classList.remove('is-active');
            playerBottomTurn.classList.remove('is-active');
            playerTopTurn.classList.add('is-active');
            playerBottomTurn.textContent = '';
            playerTopTurn.textContent = (turn == side) ? 'Your turn!' : 'Waiting...';
            p1Clock.textContent = fmtTime(gTimeW);
            if (winner == 'none') {
                timerB = setInterval(() => {
                    p2Clock.textContent = fmtTime(gTimeB);
                    if (gTimeB == 0) {
                        p2Clock.textContent = "00:00";
                        update(matchRef, { winner: a != uid ? a : b });
                        //showResult('lose')
                        return;
                    }
                    --gTimeB;
                }, 1000)
            }

        }
        if (winner == 'none') {
            //fillPieces('online', side, turn == side);
        }
        else if (winner == uid) {
            showResult('win');
            //fillPieces('online', side, 0);
            lockBoard();

        }
        else {
            showResult('lose');
            //fillPieces('online', side, 0);
            lockBoard();
        }
        if (gTimeW == 0 && side == 'white') {
            update(matchRef, { winner: a == uid ? b : a });
        }
        if (gTimeB == 0 && side == 'black') {
            update(matchRef, { winner: a == uid ? b : a });
        }
    })
    on('board-change', async ({ name, from, to }) => {
        const capture = globalBoard[to];
        const winner = (capture.toUpperCase() == 'K' ? uid : 'none');

        //let user move
        globalBoard[from] = '.';
        globalBoard[to] = name;
        fillPieces(turn, side);
        //then check
        const sideCheck = highlightCheck();
        if (sideCheck) {
            // const king = globalBoard[pos];
            // const isWhite = (king == king.toUpperCase()) ? 'white' : 'black';
            if (side==sideCheck||sideCheck=='invalid') {
                //roll back
                globalBoard[from] = name;
                globalBoard[to] = capture;
                fillPieces(turn, side);
                highlightCheck();
                return;

            }
            else {
                highlightCheck();
            }
        }
        await update(matchRef, {
            board: globalBoard,
            lastMove: { piece: name, from, to },
            turn: side == 'white' ? 'black' : 'white',
            winner,
            timeW: gTimeW,
            timeB: gTimeB
        });


    })
    const userRef = ref(db, `users/${uid}/matchId`);
    try {
        await onDisconnect(matchRef).set(null)
        await onDisconnect(userRef).set(null);
    } catch (error) {
        console.log(error);
    }


})
function lockBoard() {
    boardEl.classList.add('locked');
}
function unlockBoard() {
    boardEl.classList.remove('locked');

}
