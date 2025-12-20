import { fmtBoard, globalBoard, updateBoard } from "../../app";
import { fillPieces } from "../../board";
import { getBestEval, getEval } from "../../stockfish";
import { renderMovesBody } from "../render/moveTable";
import { S } from "../state";
export async function setupReplayControls() {
    const btnReplayFirst = document.getElementById('btn-replay-first');
    const btnReplayPrev = document.getElementById('btn-replay-prev');
    const btnReplayNext = document.getElementById('btn-replay-next');
    const btnReplayLast = document.getElementById('btn-replay-last');
  
    btnReplayFirst.addEventListener('click', () => {
        if (!S.History)
            return;
        S.replayIndex = 0;
        goTo(S.History[S.replayIndex]);
    })
    btnReplayPrev.addEventListener('click', () => {
        if (!S.History)
            return;

        if (S.replayIndex <= 0)
            return;
        --S.replayIndex;
        console.log(S.replayIndex)
        goTo(S.History[S.replayIndex])
    })
    btnReplayNext.addEventListener('click', () => {
        if (!S.History)
            return;
        const mx = S.History.length;

        if (S.replayIndex == mx - 1)
            return;
        ++S.replayIndex;
        console.log(S.replayIndex);
        goTo(S.History[S.replayIndex]);
    })
    btnReplayLast.addEventListener('click', () => {
        if (!S.History)
            return;
        const mx = S.History.length - 1;
        S.replayIndex = mx;
        console.log(S.replayIndex);
        goTo(S.History[S.replayIndex]);
    })

}
function goTo(cur) {
    console.log(cur);
    const fen = cur.fenAfter;
    const board = fmtBoard(fen);
    document.querySelectorAll('.is-current')
        .forEach(i => i.classList.remove('is-current'));
    updateBoard(board);
    fillPieces(S.turn, S.side);
    if (cur.from && cur.to) {
        const curSquare = document.querySelector(`#board li[data-value=${cur.to}]`);
        const prevSquare = document.querySelector(`#board li[data-value=${cur.from}]`);
        curSquare?.classList.add('is-current');
        prevSquare?.classList.add('is-current');
    }
    const btnMoves=document.body.querySelectorAll('.move-btn');
    btnMoves.forEach(btn=>btn.classList.remove('is-last'));
    console.log(btnMoves.length);
    for(let i=0;i<btnMoves.length;i++){
        if(S.replayIndex&&i==S.replayIndex-1){
            
            btnMoves[i].classList.add('is-last');
        }
    }
}
