
import { pieceMap, isMove } from "./constants/piece";
import { handleMove } from "./move";
import { printBoard, globalBoard } from "./app";
import { getLastMove } from "./room";
let activePiece = null;
let startLeft = 0, startTop = 0;
let startClientX = 0, startClientY = 0;
let fromPos = null;
let moveF = '', moveS = '';
let whiteMove = '', blackMove = '', curMove = '';
let name = '', curFrom = '', curTo = '';
let boardEl = null;
export let castlingMove = [], enPassantMove = null;
const eventsBus = {};
export let isCheck = false, undoMoves = [], botPause = false, gListMove = [];
let overplayPromotion = null, piecePromotion = null;
let Turn = '', Side = '';
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
function setCastlingMove(moves) {
    castlingMove = moves
}
export function getCastlingMove() {
    return castlingMove;
}
function setEnPassantMove(move) {
    enPassantMove = move;
}
export function getEnPassantMove() {
    return enPassantMove;
}
function lockEnemy(turn, side) {

    const pieces = document.querySelectorAll('.piece');
    const canGo = turn == side;
    pieces.forEach(p => {
        const nameP = p.dataset.value;
        p.classList.add('is-disabled');
        const isWhite = nameP == nameP.toUpperCase();
        if (canGo) {
            if (side == 'white' && isWhite)
                p.classList.remove('is-disabled');
            if (side == 'black' && !isWhite)
                p.classList.remove('is-disabled');
        }

    })
}
export function fillPieces(turn, side) {
    clearSuggestMove();
    const squares = document.querySelectorAll('#board li');
    Turn = turn;
    Side = side;
    squares.forEach(cur => {
        cur.innerHTML = '';
        const pos = cur.dataset.value;
        if (globalBoard[pos] != '.') {

            const nameP = globalBoard[pos];
            const p = document.createElement('div');
            p.className = 'piece';
            p.dataset.value = nameP;
            const imgPiece = document.createElement('img');
            imgPiece.src = pieceMap.get(nameP);

            p.appendChild(imgPiece);
            cur.appendChild(p);
        }
    })
    lockEnemy(Turn, Side);
    ensureDelegationBound();
}
let delegationBound = false;

function ensureDelegationBound() {
    if (delegationBound)
        return;
    delegationBound = true;
    let result = false, from = '', to = '', dropSquare = null;
    let moves = null, kill = null;
    boardEl.addEventListener('pointerdown', e => {
        const piece = e.target.closest('.piece');
        if (!piece || !boardEl.contains(piece)) {
            return;
        }
        activePiece = piece;
        name = activePiece.dataset.value;
        fromPos = activePiece.parentElement?.dataset?.value || null
        from = fromPos;
        if (name == 'K' || name == 'k') {
            const res = checkCastling(from);
            setCastlingMove(res);
        }
        if ((name == 'P' || name == 'p') && (from[1] == '4' || from[1] == '5')) {
            const ans = checkEnPassant(from);
            setEnPassantMove(ans);
        }
        const { m, k } = handleMove(activePiece.dataset.value, from);
        moves = m;
        kill = k;
        markMoves(m);
        markKills(k);
        activePiece.style.zIndex = 10;
        activePiece.style.cursor = 'grabbing';

        startClientX = e.clientX;
        startClientY = e.clientY;

      
        const rect = activePiece.getBoundingClientRect();
        const boardRect = boardEl.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        activePiece.style.position = 'absolute';

        startLeft = rect.left - boardEl.getBoundingClientRect().left;
        startTop = rect.top - boardEl.getBoundingClientRect().top;


        activePiece.style.left = startLeft + 'px';
        activePiece.style.top = startTop + 'px';

        activePiece.style.width = w + 'px';
        activePiece.style.height = h + 'px';
        boardEl.appendChild(activePiece);
        e.preventDefault();
    })
    boardEl.addEventListener('pointermove', e => {
        if (!activePiece)
            return;
        const dx = e.clientX - startClientX;
        const dy = e.clientY - startClientY;
        const boardBox = boardEl.getBoundingClientRect();
        let x = startLeft + dx;
        let y = startTop + dy;
        x = Math.max(0, Math.min(boardBox.width - activePiece.offsetWidth, x));
        y = Math.max(0, Math.min(boardBox.height - activePiece.offsetHeight, y));
        activePiece.style.left = x + 'px';
        activePiece.style.top = y + 'px';
    })
    boardEl.addEventListener('pointerup', async e => {

        if (!activePiece) {
            return;
        }
        const pieceEl = activePiece;

        pieceEl.style.zIndex = '';
        pieceEl.style.cursor = 'grab';
        pieceEl.style.pointerEvents = 'none';

        let dropSquare = document.elementFromPoint(e.clientX, e.clientY).closest('.square');
        const to = dropSquare.dataset.value;
        pieceEl.style.pointerEvents = '';
        pieceEl.remove();
        if (!dropSquare || !fromPos) {
            pieceEl.style.left = '0px';
            pieceEl.style.top = '0px';
            return;
        }

        fromPos = null;
        if (!moves.find(i => i == to) && !kill.find(i => i == to)) {
            clearSuggestMove();
            fillPieces(Turn, Side);
            return;
        }

        try {
            moveF = fmtMove(name, from, to);
            undoMoves.push({ move: from + to, capture: globalBoard[to] });
            const checked = globalBoard[to].toUpperCase() == 'K' ? 1 : 0;
            curMove = to;
            isMove[from] = true;
            if ((name == 'K' || name == 'k')) {
                const delta = to[0].charCodeAt(0) - from[0].charCodeAt(0);
                if (delta == -2) {
                    globalBoard['D' + from[1]] = globalBoard['A' + from[1]];
                    globalBoard['A' + from[1]] = '.';
                }
                if (delta == 2) {
                    globalBoard['F' + from[1]] = globalBoard['H' + from[1]];
                    globalBoard['H' + from[1]] = '.';
                }
            }

            if ((name == 'P' || name == 'p') && (to[1] == '1' || to[1] == '8')) {
                showPromotion(name, from, to);
                return;
            }
            if ((name == 'P' || name == 'p') && enPassantMove) {
                if (name == 'P')
                    globalBoard[to[0] + (parseInt(to[1]) - 1)] = '.';
                if (name == 'p')
                    globalBoard[to[0] + (parseInt(to[1]) + 1)] = '.';
                enPassantMove=null
            }

            emit('board-change', { name, from, to });

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

function emit(name, data) {
    eventsBus[name]?.forEach(fn => fn(data))
}
export function on(name, fn) {
    (eventsBus[name] ||= []).push(fn);
}
function checkCastling(from) {
    let cols = 'CDEFG';
    let kingClone = globalBoard[from];
    let backup = [];
    for (let i = 0; i < cols.length; i++) {
        backup.push(globalBoard[cols[i] + from[1]]);
    }
    for (let i = 0; i < cols.length; i++) {
        globalBoard[cols[i] + from[1]] = kingClone;
    }
    let attackSquare = [];
    for (const [pos, piece] of Object.entries(globalBoard)) {
        if (piece == '.')
            continue;
        const { k } = handleMove(piece, pos);
        attackSquare.push(...k);
    }
    for (let i = 0; i < 5; i++) {
        globalBoard[cols[i] + from[1]] = backup[i];
    }
    let ans = [];
    let isAttack = false;
    for (let i = 0; i < 3; i++) {
        if (i != 2 && globalBoard[cols[i] + from[1]] != '.') {
            isAttack = true;
            break;
        }
        isAttack = attackSquare.find(move => move == (cols[i] + from[1]));
        if (isAttack)
            break;
    }
    const posKing = from;
    let posR = 'A' + from[1];
    if (!isAttack && !isMove[posKing] && !isMove[posR]) ans.push('C' + from[1]);
    isAttack = false;
    for (let i = 2; i < 5; i++) {
        if (i != 2 && globalBoard[cols[i] + from[1]] != '.') {
            isAttack = true;
            break;
        }
        isAttack = attackSquare.find(move => move == (cols[i] + from[1]));
        if (isAttack)
            break;
    }
    posR = 'H' + from[1];
    if (!isAttack && !isMove[posKing] && !isMove[posR]) ans.push('G' + from[1]);
    return ans;
}
function checkEnPassant(from) {
    let ans = [];
    const lastMove = getLastMove();
    if(from[1]!='4'&&from[1]!='5')
        return ans;
    if(!lastMove)
        return ans;
    const { from: fromLastMove, piece,to } = lastMove;
    if(Math.abs(parseInt(to[1])-parseInt(fromLastMove[1]))!=2){
        return ans;
    }
    if (!lastMove)
        return ans;
    const fileLastmove = to[0].charCodeAt(0);
    const file = from[0].charCodeAt(0);
    const rankLastMove=to[1].charCodeAt(0);
    const rank=from[1].charCodeAt(0);
    console.log(file,fileLastmove);
    if(rank!=rankLastMove)
        return ans;
    if (Math.abs(file - fileLastmove) == 1) {
        if (piece == 'P')
            ans.push(fromLastMove[0] + 3);
        if (piece == 'p')
            ans.push(fromLastMove[0] + 6);
    }
    return ans;
}
function showPromotion(name, from, to) {
    curFrom = from;
    curTo = to;
    overplayPromotion.classList.add('show');
    piecePromotion.forEach(btn => {
        const piece = btn.dataset.piece;
        const path = `/images/${name == 'P' ? 'w' : 'b'}${piece}.png`;
        const img = btn.querySelector('img');
        img.src = path;
    })
}

document.addEventListener('DOMContentLoaded', () => {
    boardEl = document.getElementById("board");
    overplayPromotion = document.getElementById('overlay-promotion');
    piecePromotion = document.querySelectorAll('.promotion-item');
    piecePromotion.forEach(btn => btn.addEventListener('click', () => {
        let piece = btn.dataset.piece;
        piece = (name == 'P' ? piece : piece.toLowerCase());
        emit('board-change', { name: piece, from: curFrom, to: curTo })
        overplayPromotion.classList.remove('show');
    }))
})

