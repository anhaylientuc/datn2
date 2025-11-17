
import { runTransaction, ref, onValue, get, update } from "firebase/database";
import { pieceMap } from "./constants/piece";
import { handleMove } from "./move";
import { boardEl, fmtFEN, fmtBoard, printBoard } from "./app";
import { engine } from "./app";
import { globalBoard, showResult, addMoveList, gTimeW, gTimeB, clearTimer } from "./room";
import { db } from "./firebase";
let activePiece = null;
let startLeft = 0, startTop = 0;
let startClientX = 0, startClientY = 0;
let fromPos = null;
let turn = '';
let side = '', moveF = '', moveS = '';
let gSide='';
let curMove = '', whiteMove = '', blackMove = '';
export let isCheck = false, undoMoves = [], botPause = false,gListMove=[];

function parseMove(uci) {
    const fromCol = uci[0].toUpperCase();
    const fromRow = uci[1];
    const toCol = uci[2].toUpperCase();
    const toRow = uci[3];
    return { from: fromCol + fromRow, to: toCol + toRow };
}
function clearSuggestMove() {
    document.querySelectorAll('.is-move, .is-capture')
        .forEach(el => el.classList.remove('is-move', 'is-capture'));
}
function fmtMove(piece, from, to) {
    let line = '';
    const name = piece.toUpperCase();
    if (name != 'P')
        line = name;
    if (globalBoard[to] != '.') {
        if (name == 'P')
            line += from[0].toLowerCase();
        line += 'x'
    }
    line += to.toLowerCase();
    return line;
}
export function fillPieces(mode, side, canGo) {
    clearSuggestMove();
    gSide=side;
    document.querySelectorAll('.is-current')
        .forEach(el => el.classList.remove('is-current'));
    const curSquare = document.querySelector(`#board li[data-value="${curMove}"]`);
    curSquare?.classList.add('is-current');
    const squares = document.querySelectorAll('#board li');
    squares.forEach(cur => {
        cur.innerHTML = '';
        const pos = cur.dataset.value;
        if (globalBoard[pos] != '.') {
            const name = globalBoard[pos];
            const p = document.createElement('div');
            p.className = 'piece';
            p.classList.add('is-disabled');
            if (canGo) {
                if (side == 'white' && (name == 'P' || name == 'R' || name == 'N' || name == 'B' || name == 'Q' || name == 'K'))
                    p.classList.remove('is-disabled');
                if (side == 'black' && (name == 'p' || name == 'r' || name == 'n' || name == 'b' || name == 'q' || name == 'k'))
                    p.classList.remove('is-disabled');
            }
            p.dataset.value = name;
            const imgPiece = document.createElement('img');
            imgPiece.src = pieceMap.get(name);

            p.appendChild(imgPiece);
            cur.appendChild(p);
        }
    })
    ensureDelegationBound(mode);
}
let delegationBound = false;

function ensureDelegationBound(mode) {
    if (delegationBound)
        return;
    delegationBound = true;
    let result = false, from = '', to = '', dropSquare = null;
    let moves = null, kill = null;
    boardEl.addEventListener('pointerdown', e => {
        const piece = e.target.closest('.piece');
        if (!piece || !boardEl.contains(piece) || side != turn) {
            return;
        }
        activePiece = piece;
        fromPos = activePiece.parentElement?.dataset?.value || null
        from = fromPos;
        const { m, k } = handleMove({ name: activePiece.dataset.value }, from, globalBoard);
        moves = m;
        kill = k;
        markMoves(m);
        markKills(k);
        activePiece.style.zIndex = 1;
        activePiece.style.cursor = 'grabbing';

        startClientX = e.clientX;
        startClientY = e.clientY;

        const cs = getComputedStyle(activePiece);
        startLeft = Number.isNaN(parseFloat(cs.left)) ? 0 : parseFloat(cs.left);
        startTop = Number.isNaN(parseFloat(cs.top)) ? 0 : parseFloat(cs.top);
        e.preventDefault();
    })
    boardEl.addEventListener('pointermove', e => {
        if (!activePiece)
            return;
        const dx = e.clientX - startClientX;
        const dy = e.clientY - startClientY;

        activePiece.style.left = startLeft + dx + 'px';
        activePiece.style.top = startTop + dy + 'px';
    })
    boardEl.addEventListener('pointerup', async e => {

        if (!activePiece)
            return;
        const pieceEl = activePiece;

        pieceEl.style.zIndex = '';
        pieceEl.style.cursor = 'grab';
        pieceEl.style.pointerEvents = 'none';

        let dropSquare = document.elementFromPoint(e.clientX, e.clientY).closest('.square');
        const to = dropSquare.dataset.value;
        pieceEl.style.pointerEvents = '';
        if (!dropSquare || !fromPos) {
            pieceEl.style.left = '0px';
            pieceEl.style.top = '0px';
            return;
        }

        fromPos = null;
        if (!moves.find(i => i == to) && !kill.find(i => i == to)) {
            clearSuggestMove();
            fillPieces(mode,gSide,1);
            return;
        }


        try {
            moveF = fmtMove(pieceEl.dataset.value, from, to);
            undoMoves.push({ move: from + to, capture: globalBoard[to] });
            console.log(moveF);
            const checked=globalBoard[to].toUpperCase()=='K'?1:0;
            globalBoard[from] = '.';
            globalBoard[to] = pieceEl.dataset.value;
            curMove = to;


            fillPieces(mode);
            const { m, k } = handleMove({ name: activePiece.dataset.value }, to, globalBoard);
            moves = m;
            kill = k;





            const check = kill.find(move => globalBoard[move].toLowerCase() == 'k')
            if (check) {
                moveF += '+';
            }
            activePiece = null;



            if (globalBoard[to] == 'k') {
                showResult('win');
            }
            whiteMove = curMove.toLowerCase();
            if (mode != 'bot') {
                const user = JSON.parse(localStorage.getItem('user'));
                const uid = user.uid;
                const snap = await get(ref(db, `users/${uid}`));
                const {matchId,side} = snap.val();

                const matchRef=ref(db,`matches/${matchId}`);
                const snapMatch=await get(matchRef);
                let {listMoves}=snapMatch.val();
                listMoves=listMoves||[];
                listMoves.push(moveF);
                clearTimer();
                await update(ref(db, `matches/${matchId}`), {   
                    board:globalBoard,
                    turn:side=='white'?'black':'white',
                    winner:checked?uid:'none',
                    timeW:gTimeW,
                    timeB:gTimeB,
                    listMoves:listMoves
                });
                return;
            }
            gListMove.push(moveF);
            botGo(globalBoard, 'black');

        } catch (error) {
            console.log(error);
        }
    })
}
function markMoves(moves) {
    const set = new Set(moves);
    const sq = document.querySelectorAll('#board li');
    sq.forEach(item => {
        const pos = item.dataset.value;
        if (set.has(pos)) {
            item.classList.add('is-move');
        }
    })

}
function markKills(moves) {
    const set = new Set(moves);
    const sq = document.querySelectorAll('#board li');
    sq.forEach(item => {
        const pos = item.dataset.value;
        if (set.has(pos)) {
            item.classList.add('is-capture');
        }
    })
}

export function botGo(globalBoard) {
    const fen = fmtFEN(globalBoard, 'black');
    engine.postMessage(`position fen ${fen}`);
    engine.postMessage('go depth 10');
    engine.onmessage = (e) => {
        const line = typeof e.data === 'string' ? e.data : e;
        if (line.startsWith('bestmove')) {
            const move = line.split(' ')[1];
            const parse = parseMove(move);
            const { from, to } = parse;
            curMove = to;

            if (move == '(none)') {
                showResult('lose');
            }

            setTimeout(() => {
                moveS = fmtMove(globalBoard[from], from, to);
                undoMoves.push({ move: from + to, capture: globalBoard[to] });
                gListMove.push(moveS);
                curMove = to;
                globalBoard[to] = globalBoard[from];
                globalBoard[from] = '.';
                blackMove = curMove.toLowerCase();
                const { m, k } = handleMove({ name: globalBoard[to] }, to, globalBoard);
                let kill = k;

                const check = kill.find(move => globalBoard[move].toLowerCase() == 'k')
                if (check) {
                    moveS += '+';
                }
                fillPieces('bot','white',1);
                addMoveList(gListMove);
            }, 1000); // 1000ms = 1

        }
    };
    engine.onerror = (err) => {
        console.error('[ENGINE ERROR]', err);
    };
}
