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
    console.log('haha');
    await calcEval(i);
  }
  renderMovesBody(mode, i);
  document.querySelector(".moves-tools")?.classList.remove("is-disabled");
  document.getElementById("btn-resign")?.setAttribute("disabled", true);
}
async function calcEval(l) {
  try {
    for (let i = 1; i < l; i++) {
      const { fenBefore, fenAfter, sideJustMoved } = S.History[i];

      const bestPlayEval = await getBestEval(fenBefore);
      const normalPlayEval = await getEval(fenAfter);

      const typeBest = bestPlayEval.type;
      const typeNormal = normalPlayEval.type;
      // ✅ Nếu có mate -> không dùng delta số
      if (typeBest === 'mate' || typeNormal === 'mate') {
        S.History[i].delta = `${formatEval(bestPlayEval)} → ${formatEval(normalPlayEval)}`;

        // // Missed mate
        // if (typeBest === 'mate' && typeNormal === 'cp') {
        //   S.History[i].tag = 'blunder';
        // }

        // // Cp → Mate
        // else if (typeBest === 'cp' && typeNormal === 'mate') {
        //   S.History[i].tag =
        //     normalPlayEval.value > 0 ? 'best' : 'blunder';
        // }

        // // Mate → Mate
        // else if (typeBest === 'mate' && typeNormal === 'mate') {
        //   // nếu đi từ M2 → M1 thì tốt, ngược lại thì tệ
        //   S.History[i].tag =
        //     Math.abs(normalPlayEval.value) <= Math.abs(bestPlayEval.value)
        //       ? 'good'
        //       : 'mistake';
        // }

        continue;
      }


      // ✅ cp-cp: tính delta như bình thường
      const delta =
        (Number.isFinite(bestPlayEval.value) && Number.isFinite(normalPlayEval.value))
          ? (normalize(Number(bestPlayEval.value), sideJustMoved) -
            normalize(Number(normalPlayEval.value), sideJustMoved))
          : null;

      S.History[i].delta = delta;
      S.History[i].tag = classifyMove(delta);
    }
  } catch (error) {
    console.log(error);
  }
}

function formatEval(ev) {
  if (!ev) return '';
  if (ev.type === 'mate') return `M${ev.value}`;
  return (Number(ev.value) / 100).toFixed(2);
}





