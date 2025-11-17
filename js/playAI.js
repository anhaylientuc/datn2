
import { boardEl, botMove, engine, fmtBoard, fmtFEN } from "./app";
import { ref, set, update, get } from "firebase/database";
import { db, auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { handleMove } from "./move";
let user = null;
let side = '';
let turn = '';
let activePiece = null;
let fromPos = '';
let startClientX = null, startClientY = null;
let startLeft = null, startTop = null;
let globalBoard = {};
let depth = null;
const toastDiff = document.getElementById('toast-difficulty');
const diffButton = toastDiff?.querySelectorAll('[data-level]');
const closeToast = document.getElementById('btn-close-diff');
const confirmToast = document.getElementById('btn-confirm-diff');

const moveList=document.getElementById('moves-list');
let indexMove=1;
let blackMove='';
let whiteMove='';
function goToRoom()
{
    const opts={mode:'bot',difficulty:depth};
    const url=new URL('room.html',window.location.origin);
    url.searchParams.set('mode',opts.mode);
    url.searchParams.set('difficulty',opts.difficulty);
    window.location.href=url.href;
}
document.addEventListener('DOMContentLoaded', () => {


    confirmToast.addEventListener('click', async () => {
        const boardWrap = document.querySelector('.board-wrap');
        boardWrap.classList.add('is-ready');
        toastDiff.classList.add('hide');
        engine.postMessage('ucinewgame')
        engine.postMessage(`setoption name Skill Level value ${depth}`);
        goToRoom();
    })

    console.log(diffButton);
    diffButton.forEach(btn => {
        btn.addEventListener('click', (e) => {
            diffButton.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const level = btn.dataset.level;
            console.log(level);

            if (level == 'normal')
                depth = 9;
            else if (level == 'hard')
                depth = 14;
            else
                depth = 5;
            console.log(`Difficult: ${depth}`);
        })
    })
   

})
