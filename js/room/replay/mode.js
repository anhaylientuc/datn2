import { clearTimers } from "../ui/timers";
import { lockBoard } from "../boardLock";
import { classifyMove, renderMovesBody } from "../render/moveTable";
import { getBestEval, getEval } from "../../stockfish";
import { S } from "../state";
import { normalize } from "../render/moveTable";
export async function enterReplayMode(mode, i) {
  document.body.classList.add("is-gameover", "is-replay");

  clearTimers();
  lockBoard();
  if (S.History) {
    await calcEval(i);
  }
  renderMovesBody(mode, i);
  document.querySelector(".moves-tools")?.classList.remove("is-disabled");
  document.getElementById("btn-resign")?.setAttribute("disabled", true);
}
async function calcEval(l) {
  for (let i = 1; i < l; i++) {
    const { fenBefore, fenAfter } = S.History[i];
     //    bestPlayEval=m.bestPlayEval;
        //    normalPlayEval=m.normalPlayEval;
        //    sideJustMoved=m.sideJustMoved;
        //         delta = (Number.isFinite(bestPlayEval.value) && Number.isFinite(normalPlayEval.value)) ? 
        //     (normalize(Number(bestPlayEval.value), sideJustMoved) - normalize(Number(normalPlayEval.value), sideJustMoved)) : null;
    const bestPlayEval = await getBestEval(fenBefore);
    const normalPlayEval = await getEval(fenAfter);
    const sideJustMoved=S.History[i]['sideJustMoved'];
    const delta = (Number.isFinite(bestPlayEval.value) && Number.isFinite(normalPlayEval.value)) ? 
             (normalize(Number(bestPlayEval.value), sideJustMoved) - normalize(Number(normalPlayEval.value), sideJustMoved)) : null;
    S.History[i]['delta']=delta;
    S.History[i]['tag']=classifyMove(delta);
  }
}




