// src/room/firebaseListeners.js
import { onValue } from "firebase/database";
import { S } from "./state";
import { updateBoard } from "../app";
import { fillPieces } from "../board";
import { highlightCheck } from "./rules/check";
import { showResult } from "./ui/resultOverlay";
import { renderMovesBody } from "./render/moveTable";
import { clearTimers,startTimersFromSnapshot } from "./ui/timers";
import { lockBoard } from "./boardLock";
import { enterReplayMode } from "./replay/mode";
export function attachMatchListener(matchRef) {
    onValue(matchRef, snap => {

        if (!snap.exists()) {
            alert('Opponent left room');
            return;
        }
        let { board, turn: turnSnap, winner, timeW, timeB, listMoves, msg, lastMove: lastMoveSnap, a, b, history } = snap.val();
        S.History = history;
        renderMovesBody('online',S.History.length);
        S.lastMove = lastMoveSnap;
        S.You = a;
        S.Opp = b;
        S.turn = turnSnap;
        updateBoard(board);
        fillPieces(S.turn, S.side);
        if (S.lastMove) {
            document.querySelectorAll('.is-current')
                .forEach(el => el.classList.remove('is-current'));
            const curSquare = document.querySelector(`#board li[data-value="${S.lastMove.to}"]`);
            const prevSquare = document.querySelector(`#board li[data-value="${S.lastMove.from}"]`);

            curSquare?.classList.add('is-current');
            prevSquare?.classList.add('is-current');

        }

        if (S.lastMove) {
            highlightCheck();
        }

        S.gTimeW = timeW;
        S.gTimeB = timeB;
        clearTimers();
        startTimersFromSnapshot({ winner })
        if (winner != 'none') {
            if (winner == S.uid) {
                showResult('win');
            }
            else {
                showResult('lose');
            }
            lockBoard();
            enterReplayMode('replay',S.History.length);
            S.replayIndex=S.History.length-1;
        }


    })
}