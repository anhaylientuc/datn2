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
  return new Promise(async (resolve) => {
    let lastMate = null, lastCp = null;
    const onMsg = (e) => {
      const line = String(e.data || '');
      const mDepth = line.match(/\bdepth\s+(\d+)/);
      if (!mDepth) return;
      const d = Number(mDepth[1]);
      if (d < mxDepth)
        return;
      const mMate = line.match(/\bscore\s+mate\s+(-?\d+)/);
      if (mMate) lastMate = Number(mMate[1]);

      const mCp = line.match(/\bscore\s+cp\s+(-?\d+)/);
      if (mCp) lastCp = Number(mCp[1]);
      engineEval.removeEventListener('message', onMsg);
      engineEval.postMessage("stop");
      resolve({
        type: lastMate ? 'mate' : 'cp',
        depth: d,
        value: lastCp
      })
    }
    engineEval.addEventListener('message', onMsg);

  })
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

  return await new Promise((resolve) => {
    let lastMate = null;
    let lastCp = null;
    let done = false;

    const onMsg = (e) => {
      const line = String(e.data || "");

      const mDepth = line.match(/\bdepth\s+(\d+)/);
      if (!mDepth) return;
      const d = Number(mDepth[1]);
      const mPv = line.match(/\bmultipv\s+(\d+)/);
      const pvId = mPv ? Number(mPv[1]) : 1;
      if (pvId !== 1) return;

      if (d < mxDepth) return; // ✅ chờ đủ depth

      const mMate = line.match(/\bscore\s+mate\s+(-?\d+)/);
      if (mMate) lastMate = Number(mMate[1]);

      const mCp = line.match(/\bscore\s+cp\s+(-?\d+)/);
      if (mCp) lastCp = Number(mCp[1]);

      if (lastMate === null && lastCp === null) return;
      if (done) return;
      done = true;

      engineEval.removeEventListener("message", onMsg);
      engineEval.postMessage("stop");
      resolve({
        type: lastMate !== null ? "mate" : "cp",
        depth: d,
        value: lastMate !== null ? lastMate : lastCp,
      });


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