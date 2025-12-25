import { engine, engineEval } from "./app";
async function isEngineReady(regex) {
  return new Promise((resolve) => {
    engineEval.onmessage = (e) => {
      const line = String(e.data || '');
      if (regex.test(line)) {
        resolve(line);
      }
    }
  })
}
async function runEngine(fen, mxDepth) {
  engineEval.postMessage('stop');
  engineEval.postMessage('isready');
  await isEngineReady(/\breadyok\b/);

  engineEval.postMessage("position fen " + fen);
  engineEval.postMessage("go depth " + mxDepth);

  return new Promise((resolve) => {
    let lastMate = null, lastCp = null;
    let maxSeenDepth = 0;
    let done = false;

    const finish = (type) => {
      if (done) return;
      done = true;
      engineEval.removeEventListener('message', onMsg);
      engineEval.postMessage("stop");
      resolve({
        type: lastMate !== null ? 'mate' : (lastCp !== null ? 'cp' : type),
        depth: maxSeenDepth,
        value: lastMate !== null ? lastMate : lastCp
      });
    };

    const t = setTimeout(() => finish('timeout'), 8000);

    const onMsg = (e) => {
      const line = String(e.data || '');

      // parse score trước
      const mMate = line.match(/\bscore\s+mate\s+(-?\d+)/);
      if (mMate) {
        console.log(
          `[MATE DETECTED]`,
          `value=${lastMate}`,
          `fen=${fen}`,
          `line=`, line
        );
        lastMate = Number(mMate[1]);
      } 

      const mCp = line.match(/\bscore\s+cp\s+(-?\d+)/);
      if (mCp) lastCp = Number(mCp[1]);

      const mDepth = line.match(/\bdepth\s+(\d+)/);
      if (mDepth) maxSeenDepth = Math.max(maxSeenDepth, Number(mDepth[1]));

      // ✅ ƯU TIÊN mate (âm/dương đều trả)
      if (lastMate !== null) {
        clearTimeout(t);
        return finish('mate');
      }

      // đủ depth + có cp thì trả cp
      if (maxSeenDepth >= mxDepth && lastCp !== null) {
        clearTimeout(t);
        return finish('cp');
      }

      // bestmove: chỉ kết thúc nếu đã có score
      if (/\bbestmove\b/.test(line)) {
        if (lastCp !== null) {
          clearTimeout(t);
          return finish('bestmove');
        }
      }
    };

    engineEval.addEventListener('message', onMsg);
  });
}

async function runBestMove(fen, mxDepth = 16) {
  engineEval.postMessage("stop");
  engineEval.postMessage("isready");
  await isEngineReady(/\breadyok\b/);

  engineEval.postMessage("setoption name MultiPV value 3");
  engineEval.postMessage("isready");
  await isEngineReady(/\breadyok\b/);

  engineEval.postMessage("position fen " + fen);
  engineEval.postMessage("go depth " + mxDepth);

  return new Promise((resolve) => {
    let lastMate = null, lastCp = null;
    let maxSeenDepth = 0;
    let done = false;

    const finish = (type) => {
      if (done) return;
      done = true;
      engineEval.removeEventListener("message", onMsg);
      engineEval.postMessage("stop");
      resolve({
        type: lastMate !== null ? "mate" : (lastCp !== null ? "cp" : type),
        depth: maxSeenDepth,
        value: lastMate !== null ? lastMate : lastCp,
      });
    };

    const t = setTimeout(() => finish("timeout"), 8000);

    const onMsg = (e) => {
      const line = String(e.data || "");

      // bestmove: chỉ finish nếu đã có score
      if (/\bbestmove\b/.test(line)) {
        if (lastMate !== null || lastCp !== null) {
          clearTimeout(t);
          return finish("bestmove");
        }
        return;
      }

      // chỉ pv1
      const mPv = line.match(/\bmultipv\s+(\d+)/);
      const pvId = mPv ? Number(mPv[1]) : 1;
      if (pvId !== 1) return;

      // parse score trước
      const mMate = line.match(/\bscore\s+mate\s+(-?\d+)/);
      if (mMate) lastMate = Number(mMate[1]);

      const mCp = line.match(/\bscore\s+cp\s+(-?\d+)/);
      if (mCp) lastCp = Number(mCp[1]);

      const mDepth = line.match(/\bdepth\s+(\d+)/);
      if (mDepth) {
        const d = Number(mDepth[1]);
        maxSeenDepth = Math.max(maxSeenDepth, d);

        // ✅ mate ưu tiên trả ngay (âm/dương đều ok)
        if (lastMate !== null) {
          clearTimeout(t);
          return finish("mate");
        }

        // đủ depth + có cp
        if (d >= mxDepth && lastCp !== null) {
          clearTimeout(t);
          return finish("depth");
        }
      }
    };

    engineEval.addEventListener("message", onMsg);
  });
}



export async function getBestEval(fen, depth = 16) {
  const res = await runBestMove(fen, depth);
  return res;
}
export async function getEval(fen, depth = 16) {
  const res = await runEngine(fen, depth);
  return res;
}