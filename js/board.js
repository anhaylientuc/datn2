
import { runTransaction, ref, onValue, get, update } from "firebase/database";
import { PIECES, BOARD } from "./constants/piece";
import { auth, db } from "./firebase";
import { handleMove } from "./move";
const boardEl = document.getElementById('board');
let activePiece = null;
let startLeft = 0, startTop = 0;
let startClientX = 0, startClientY = 0;
let fromPos = null;
let curSide = '';
let currentTurn = null;
export let globalBoard=null;
function flipBoardDOM() {
    const nodes = Array.from(boardEl.children);
    for(let i=7;i>=0;i--){
        for(let j=0;j<8;j++){
            boardEl.appendChild(nodes[i*8+j]);
        }
    }
}
export async function renderBoard(snap) {
    const match = snap.val();
    const matchId = snap.key;
    const { a, b } = match;
    const uid = auth.currentUser.uid;

    const side = (uid == a ? 'white' : 'black');

    curSide = side;
    BOARD.flat().forEach((cur, index) => {
        const li = document.createElement('li');
        li.className = 'square';
        li.dataset.value = cur;
        boardEl.appendChild(li);
    })
    fillColorBoard();
    if (side == 'black')
        flipBoardDOM();
    await fillPieces(matchId, match, snap);
}

function fillColorBoard() {
    const container = document.querySelectorAll('#board li')
    container.forEach((item, index) => {
        item.style.backgroundColor = (Math.floor(index / 8) + index) % 2 == 0 ? '#EEEED2' : '#769656';
    })

}
async function fillPieces(matchId, match, snap) {
    const boardRef = ref(db, `matches/${matchId}/board`);
    const squares = document.querySelectorAll('#board li');

    const stopBoard = onValue(boardRef, snap => {
        if (!snap.exists())
            return;

        const board = snap.val();
        globalBoard=board;
        const pieces = [];
        for (const [k, v] of Object.entries(board)) {
            pieces.push({ k, v });
        }
        const piecesMap = new Map(Object.entries(board));
        squares.forEach(cur => {
            const pos = cur.dataset.value;
            if (piecesMap.get(pos) == 0) {
                cur.innerHTML = '';
            }
        })

        pieces.forEach(item => {

            const { k, v } = item;
            const curPiece = PIECES.find(item => item.id == v);
            if (curPiece) {
                const { pos, img, id, x, y } = curPiece;
                squares.forEach((cur) => {
                    if (cur.dataset.value !== k) {
                        return;
                    }
                    if (cur.querySelector('.piece'))
                        return;
                    const div = document.createElement('div');
                    div.className = 'piece';
                    div.dataset.value = id;

                    const _img = document.createElement('img');
                    _img.src = img;

                    div.appendChild(_img)
                    cur.appendChild(div)
                })
            }

        })
    })
    await ensureDelegationBound(matchId);



}
let delegationBound = false;
async function ensureDelegationBound(matchId) {
    if (delegationBound)
        return;
    delegationBound = true;
    const turnRef = ref(db, `matches/${matchId}/turn`);
    onValue(turnRef, (s) => {
        if (s.exists()) currentTurn = s.val();   // 'white' | 'black'
    });
    boardEl.addEventListener('pointerdown', e => {
        if (currentTurn !== curSide) {
            // feedback nhỏ cho UX
            // ví dụ: rung nhẹ quân hoặc log
            // piece.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 120 });
            console.log('[TURN] Not your turn:', { currentTurn, curSide });
            return;
        }
        const piece = e.target.closest('.piece');
        if (!piece || !boardEl.contains(piece)) {
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
            console.log('clm');
            pieceEl.style.left = '0px';
            pieceEl.style.top = '0px';
            return;
        }

        const to = dropSquare.dataset.value;
        const from = fromPos;
        fromPos = null;

        let pendingUpdate = null;

        console.log('TO',to);

        let result = handleMove(pieceEl, from, to);
        if (!result) {
            //trả quân về chỗ cũ trong DOM
            pieceEl.style.left = '0px';
            pieceEl.style.top = '0px';
            return;
        }
        for (const [k, v] of Object.entries(globalBoard)) {
            if(k==from){
                globalBoard[k]=0;
            }
            if(k==to)
                globalBoard[k]=pieceEl.dataset.value;
        }
        pendingUpdate = {
            board: globalBoard,
            lastMove: { from, to, ts: Date.now() },
            turn: curSide == 'white' ? 'black' : 'white'

        };

        // dropSquare.innerHTML = '';
        // dropSquare.appendChild(pieceEl);
        // pieceEl.style.left = '0px';
        // pieceEl.style.top = '0px';



        if (pendingUpdate) {
            try {
                const matchRef = ref(db, `matches/${matchId}`);
                await update(matchRef, pendingUpdate);
            } catch (err) {
                console.error('update(board) failed:', err);
                // optional: rollback UI hoặc báo lỗi
            }
        }
        console.log('POINT UP');
    })


}


