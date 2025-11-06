
import { runTransaction, ref, onValue, get, update } from "firebase/database";
import { PIECES } from "./constants/piece";
import { auth, db } from "./firebase";
import { handleMove } from "./move";
import { boardEl } from "./app";
let activePiece = null;
let startLeft = 0, startTop = 0;
let startClientX = 0, startClientY = 0;
let fromPos = null;
let turn = '';
let side = '';
export let globalBoard = null;
export async function fillPieces(matchId) {
    const boardRef = ref(db, `matches/${matchId}/board`);
    const squares = document.querySelectorAll('#board li');
    const uid = auth?.currentUser?.uid;
    const sideRef = ref(db, `users/${uid}/side`);
    side = (await get(sideRef)).val();
    const stopBoard = onValue(boardRef, async snap => {
        if (!snap.exists())
            return;
        const turnRef = ref(db, `matches/${matchId}/turn`);
        turn = (await get(turnRef)).val();
        console.log(turn);
        const board = snap.val();
        globalBoard = board;
        const pieces = [];
        for (const [k, v] of Object.entries(board)) {
            pieces.push({ k, v });
        }
        const piecesMap = new Map(Object.entries(board));
        squares.forEach(cur => {
            cur.innerHTML = '';
            const pos = cur.dataset.value;
            if (piecesMap.get(pos)) {
                const idPiece = piecesMap.get(pos);
                const p = document.createElement('div');
                p.className = 'piece';
                p.dataset.value = idPiece;

                const imgPiece = document.createElement('img');
                imgPiece.src = PIECES[idPiece - 1].img;

                PIECES[idPiece - 1].status = (PIECES[idPiece - 1].side == turn ? 1 : 0);

                p.appendChild(imgPiece);
                cur.appendChild(p);
            }
        })
        await ensureDelegationBound(matchId);
    })
}
let delegationBound = false;
async function ensureDelegationBound(matchId) {
    if (delegationBound)
        return;
    delegationBound = true;
    boardEl.addEventListener('pointerdown', e => {
        const piece = e.target.closest('.piece');
        const idPiece = piece.dataset.value;

        if (!piece || !boardEl.contains(piece) || PIECES[idPiece - 1].status == 0 || side != turn) {
            console.log(side, turn);
            return;
        }
        activePiece = piece;


        fromPos = activePiece.parentElement?.dataset?.value || null

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

        activePiece.style.pointerEvents = 'none';
        const dropSquare = document.elementFromPoint(e.clientX, e.clientY).closest('.square');
        activePiece.style.pointerEvents = '';

        const pieceEl = activePiece;
        activePiece = null;

        pieceEl.style.zIndex = '';
        pieceEl.style.cursor = 'grab';

        if (!dropSquare || !fromPos) {
            pieceEl.style.left = '0px';
            pieceEl.style.top = '0px';
            return;
        }

        const to = dropSquare.dataset.value;
        const from = fromPos;
        fromPos = null;

        let pendingUpdate = null;


        let result = handleMove(pieceEl, from, to);
        if (!result) {
            //trả quân về chỗ cũ trong DOM
            pieceEl.style.left = '0px';
            pieceEl.style.top = '0px';
            return;
        }
        for (const [k, v] of Object.entries(globalBoard)) {
            if (k == from) {
                globalBoard[k] = 0;
            }
            if (k == to)
                globalBoard[k] = pieceEl.dataset.value;
        }
        const nextTurn = turn == 'white' ? 'black' : 'white';
        pendingUpdate = {
            board: globalBoard,
            lastMove: { from, to, ts: Date.now() },
            turn: nextTurn

        };




        if (pendingUpdate) {
            try {
                const matchRef = ref(db, `matches/${matchId}`);
                await update(matchRef, pendingUpdate);
            } catch (err) {
                console.error('update(board) failed:', err);
            }
        }
    })


}


