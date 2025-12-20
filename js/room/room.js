import { ref, get, onDisconnect } from "firebase/database";
import { db } from "../firebase";
import { globalBoard } from "../app";
import { PIECES_AT } from "../constants/piece";
import { S } from "./state";
import { attachBoardChangeHandler } from "./moveHandler";
import { setupTimerDOM } from "./ui/timers";
import { hideResultAndEnableReplay } from "./ui/resultOverlay";
import { attachMatchListener } from "./firebaseListener";
import { applyPlayerLabels } from "./ui/players";
import { setupGameActions } from "./ui/gameActions";
import { setupReplayControls } from "./ui/replayControls";
async function flipBoardDOM() {
    const nodes = Array.from(S.boardEl.children);
    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j < 8; j++) {
            S.boardEl.appendChild(nodes[i * 8 + j]);
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

export function getLastMove() {
    return S.lastMove;
}
function initBoardPieces() {
    let cols = 'ABCDEFGH';
    for (let i = 1; i <= 8; i++) {
        for (let j = 0; j < 8; j++) {
            const pos = cols[j] + (9 - i);
            globalBoard[pos] = PIECES_AT[i - 1][j];
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    S.boardEl = document.getElementById("board");
    setupTimerDOM();
    //attatchEngineEvalListener();
    document.getElementById('btn-close-result').addEventListener('click', () => {
        hideResultAndEnableReplay();
    })
    initBoardPieces();
    setupGameActions();
    await setupReplayControls();


    document.body.classList.add('mode-online');
    const user = JSON.parse(localStorage.getItem('user'));
    S.uid = user.uid;
    const userSnap = await get(ref(db, `users/${S.uid}`));
    const { matchId, side: sideSnap } = userSnap.val();
    S.side = sideSnap;
    applyPlayerLabels();

    S.gMatchId = matchId;
    S.matchRef = ref(db, `matches/${matchId}`);
    if (S.side == 'black') {
        flipBoardDOM()
    }

    attachMatchListener(S.matchRef);
    attachBoardChangeHandler();


    const userRef = ref(db, `users/${S.uid}/matchId`);
    try {
        await onDisconnect(S.matchRef).set(null)
        await onDisconnect(userRef).set(null);
    } catch (error) {
        console.log(error);
    }
})


