import { update } from "firebase/database";
import { S } from "../state";
let p1Clock, p2Clock, p1, p2, playerBottomTurn, playerTopTurn;
export function setupTimerDOM() {
    p1 = document.getElementById('player-top');
    p2 = document.getElementById('player-bottom');
    playerBottomTurn = document.getElementById('p1-turn');
    playerTopTurn = document.getElementById('p2-turn');
    p1Clock = document.getElementById('p1-clock');
    p2Clock = document.getElementById('p2-clock');
}
export function fmtTime(time) {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return '' + m + ':' + s.toString().padStart(2, '0');
}
export function clearTimers() {
    clearInterval(S.timerW);
    clearInterval(S.timerB);
}
export function startTimersFromSnapshot({ winner }) {
    
    if (S.turn == 'white') {
        p1.classList.remove('is-active');
        p2.classList.add('is-active');
        playerBottomTurn.classList.add('is-active');
        playerTopTurn.classList.remove('is-active');
        playerTopTurn.textContent = 'cc';
        playerBottomTurn.textContent = (S.turn == S.side) ? 'Your turn!' : 'Waiting...';
        p2Clock.textContent = fmtTime(S.gTimeB);
        if (winner == 'none') {
            S.timerW = setInterval(() => {
                p1Clock.textContent = fmtTime(S.gTimeW);
                if (S.gTimeW == 0) {
                    p1Clock.textContent = "00:00";
                    return;
                }
                --S.gTimeW;
            }, 1000)
        }

    }
    if (S.turn == 'black') {
        p1.classList.add('is-active');
        p2.classList.remove('is-active');
        playerBottomTurn.classList.remove('is-active');
        playerTopTurn.classList.add('is-active');
        playerBottomTurn.textContent = '';
        playerTopTurn.textContent = (S.turn == S.side) ? 'Your turn!' : 'Waiting...';
        p1Clock.textContent = fmtTime(S.gTimeW);
        if (winner == 'none') {
            S.timerB = setInterval(() => {
                p2Clock.textContent = fmtTime(S.gTimeB);
                if (S.gTimeB == 0) {
                    p2Clock.textContent = "00:00";
                    return;
                }
                --S.gTimeB;
            }, 1000)
        }

    }
    if (S.gTimeW == 0 && side == 'white') {
        update(matchRef, { winner: a == uid ? b : a });
    }
    if (S.gTimeB == 0 && side == 'black') {
        update(matchRef, { winner: a == uid ? b : a });
    }
}