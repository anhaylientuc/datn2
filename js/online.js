import { db, auth } from "./firebase";
import { update, ref, onValue, get, remove } from "firebase/database";
import { cancelGame, findGame } from "./matching";
let sec = 0;
let timerId = null;
let matchId=null;
function fmt(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
function startTimer() {
    if (timerId)
        return;
    const timeEl = document.getElementById('time');
    timerId = setInterval(() => {
        if (sec > 3600) {
            stopTimer();
            return;
        }
        ++sec;
        timeEl.textContent = fmt(sec);
    }, 1000);
}
function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    sec = 0;
    console.log(sec);
    const timeEl = document.getElementById('time');
    timeEl.textContent = fmt(sec);
}

document.addEventListener('DOMContentLoaded', async () => {
    const btnFind = document.getElementById('btn-find');
    const btnCancel = document.getElementById('btn-cancel');
    const user = JSON.parse(localStorage.getItem('user'));
    const uid = user.uid;
    let curTime = '3+2';
    let curType = 'Rated';
    const timeControl = document.querySelectorAll('.mode-chip');
    const modeToggle = document.querySelectorAll('.mode-toggle__pill');
    const summary = document.getElementById('mm-mode-summary');
    const mmCard = document.getElementById('mm-card');
    const oppOverplay = document.getElementById('opponent-overplay');
    const oppCard = document.getElementById('opponent-card');
    const btnCancelFound = document.getElementById('btn-cancel-found');
    const btnJoinFound = document.getElementById('btn-join-found');
    function updateSummary() {
        switch (curTime) {
            case '3+2':
                curTime = 'Blitz';
                break;
            case '10+0':
                curTime = 'Rapid';
                break;
            case '30+0':
                curTime = 'Classic';
                break;
        }
        summary.textContent = curTime + ' ' + curType;
    }
    timeControl.forEach(btn => {
        btn.addEventListener('click', () => {
            timeControl.forEach(btn => btn.classList.remove('is-active'));
            btn.classList.add('is-active');
            curTime = btn.dataset.time;
            updateSummary();

        })
    })
    modeToggle.forEach(btn => {
        btn.addEventListener('click', () => {
            modeToggle.forEach(btn => btn.classList.remove('is-active'));
            btn.classList.add('is-active');
            curType = (btn.dataset.rated == 'true') ? 'Rated' : 'Casual';
            updateSummary();
        })
    })

    const matchIdRef = ref(db, `users/${uid}/matchId`);
    const entriesRef = ref(db, `queue/entries`);
    const entryRef = ref(db, `queue/entries/${uid}`)

    const cleanup = () => { remove(entryRef); };

    const teardown = async () => {
        try { await onDisconnect(entryRef).cancel(); } catch { }
        // if (offMatch) { offMatch(); offMatch = null; }
        window.removeEventListener('beforeunload', cleanup);
        window.removeEventListener('pagehide', cleanup);
    }
    onValue(matchIdRef, async (snap) => {
        const v = snap.val();
        if (v == null) return;
        await teardown();
        matchId=v;
        alert('[MATCHED] ' + v);

        const matchRef = ref(db, `matches/${v}`);
        const matchSnap = await get(matchRef);
        const { a, b } = matchSnap.val();
        const updates = {
            [`users/${a}/side`]: 'white',
            [`users/${b}/side`]: 'black',
        }
        await update(ref(db), updates);
        oppOverplay.classList.add('show');
        oppCard.classList.add('show');
        const youAvatar=document.getElementById('you-avatar');
        const youName=document.getElementById('you-name');
        const youElo=document.getElementById('you-elo');


        console.log(user);
        //console.log(sideA, sideB);


    })
    btnFind.addEventListener('click', async () => {
        btnFind.classList.add('is-finding');
        btnCancel.classList.add('is-finding');
        mmCard.classList.add('is-finding');
        btnFind.innerText = 'Searching...';
        startTimer();
        await findGame({ db, auth });

    })
    btnCancel.addEventListener('click', () => {
        btnFind.classList.remove('is-finding');
        btnCancel.classList.remove('is-finding');
        mmCard.classList.remove('is-finding');
        btnFind.innerText = 'Play now';

        stopTimer();
        cancelGame({ db, auth });
    })
    btnCancelFound.addEventListener('click', () => {
        cleanup();
        oppOverplay.classList.remove('show');
        oppCard.classList.remove('show');
    })
    btnJoinFound.addEventListener('click', () => {
        const url = new URL('room.html', window.location.origin);

        url.searchParams.set('room', String(matchId));
        window.location.href = url.href;
    })
})