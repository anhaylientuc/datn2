import { S } from "../state";
export function normalize(cp, sideJustMoved) {
    return sideJustMoved === "black" ? -cp : cp;
}

export function renderMoveCell(mode, m, i) {
    if (!m)
        return "";
    const isLast = (i + 1 == S.History.length) ? 'is-last' : '';
    const { san } = m;
    let delta = null, bestPlayEval = null, normalPlayEval = null, sideJustMoved = null, tag = null;
    if (mode == 'replay') {
        //    bestPlayEval=m.bestPlayEval;
        //    normalPlayEval=m.normalPlayEval;
        //    sideJustMoved=m.sideJustMoved;
        //         delta = (Number.isFinite(bestPlayEval.value) && Number.isFinite(normalPlayEval.value)) ? 
        //     (normalize(Number(bestPlayEval.value), sideJustMoved) - normalize(Number(normalPlayEval.value), sideJustMoved)) : null;
        tag = S.History[i]['tag'];
    }

    //const tag = classifyMove(delta);

    const ICON = { best: "⭐", good: "✔️", inaccuracy: "⚠️", mistake: "❓", blunder: "💀", unknown: "" };

    return `
        <button class="move-btn ${isLast}">
                <span class="left">
                    <span class="q">${ICON[tag] ?? ''}</span>
                    <span class="san">${san}</span>
                </span>
            <span class="eval">${delta ? fmtCp(delta) : ''}</span>
        </button>

    `
}
export function fmtCp(cp) {
    const v = cp / 100;
    return (v > 0 ? '+' : '') + v.toFixed(2);
}
export function renderMovesBody(mode, l) {
    console.log(S.History);
    const movesBody = document.getElementById('moves-body');

    movesBody.innerHTML = '';
    if (!S.History)
        return;
    if (l <= 1)
        return;
    for (let i = 1; i <= Math.floor(l / 2); i++) {
        const w = S.History[i * 2 - 1];
        const b = S.History[i * 2];
        const tr = document.createElement("tr");

        tr.innerHTML =
            `
        <td class='col-no'>${i}.</td>
        <td >${renderMoveCell(mode, w, i * 2 - 1)}</td>
        <td >${renderMoveCell(mode, b, i * 2)}</td>

    `
        movesBody.appendChild(tr)
    }
    S.cBest = S.cGood = S.cInAcc = S.cMistake = S.cBlunder = 0;
    for (let i = 1; i < l; i++) {
        if (S.side == S.History[i]['sideJustMoved']) {
            const tag = S.History[i]['tag'];
            switch (tag) {
                case 'best':
                    ++S.cBest;
                    break;
                case 'good':
                    ++S.cGood;
                    break;
                case 'inaccuracy':
                    ++S.cInAcc;
                    break;
                case 'mistake':
                    ++S.cMistake;
                    break;
                case 'blunder':
                    ++S.cBlunder;
                    break;
                default:
                    break;
            }
        }

    }


    //console.log(S.cBest,S.cGood,S.cInAcc,S.cMistake,S.cBlunder);
    document.getElementById('c-best').innerText = S.cBest;
    document.getElementById('c-good').innerText = S.cGood;
    document.getElementById('c-inacc').innerText = S.cInAcc;
    document.getElementById('c-mistake').innerText = S.cMistake;
    document.getElementById('c-blunder').innerText = S.cBlunder;


}
export function classifyMove(cpl) {
    if (!Number.isFinite(cpl)) return "unknown";
    if (cpl <= 15) return "best";
    if (cpl <= 50) return "good";
    if (cpl <= 100) return "inaccuracy";
    if (cpl <= 200) return "mistake";
    return "blunder";
}
