import {
    ref, get, set, remove, runTransaction, onDisconnect, onValue,
    query,
    limitToFirst, update,
    serverTimestamp,
} from "firebase/database";
import { BOARD, PIECES_AT } from "./constants/piece";
import { fmtFEN, globalBoard, printBoard } from "./app";
let offMatch = null;

export async function findGame({ db, auth }) {

    if (!auth) {
        return;
    }
    const uid = auth.currentUser?.uid;
    if (!uid) {
        return;
    }
    const entriesRef = ref(db, `queue/entries`);
    const entryRef = ref(db, `queue/entries/${uid}`)
    const matchIdRef = ref(db, `users/${uid}/matchId`);

    // --- onDisconnect: tự xóa entry khi tab đóng ---
    await onDisconnect(entryRef).remove();

    // --- cleanup handler (đăng ký 1 lần, có thể gỡ) ---
    const cleanup = () => { remove(entryRef); };
    window.addEventListener('beforeunload', cleanup);
    window.addEventListener('pagehide', cleanup);


    const teardown = async () => {
        try { await onDisconnect(entryRef).cancel(); } catch { }
        if (offMatch) { offMatch(); offMatch = null; }
        window.removeEventListener('beforeunload', cleanup);
        window.removeEventListener('pagehide', cleanup);
    }

    await set(entryRef, { ts: Date.now(), claimedBy: null });
    const getCandidatesQ = query(entriesRef, limitToFirst(5));
    const listSnap = await get(getCandidatesQ);
    if (!listSnap.exists())
        return;
    const entries = listSnap.val();
    const pairs = Object.entries(entries)
        .filter(([k, v]) => k != uid);
    for (const [oppUid, oppData] of pairs) {
        const oppClaimRef = ref(db, `queue/entries/${oppUid}/claimedBy`);

        const tx = await runTransaction(oppClaimRef, cur => {
            if (cur == null)
                return uid;
            return cur;
        }, { applyLocally: false })
        const claimed = tx.committed && tx.snapshot.val() === uid;
        if (!claimed)
            continue;


        // nếu trong lúc claim mình đã bị match bởi người khác -> dừng
        const myMatchSnap = await get(matchIdRef);
        if (myMatchSnap.exists()) {
            await teardown();
            //resolve(myMatchSnap.val());
            return;
        }


        // tạo match
        const matchId = Date.now();
        const bit = Math.floor(Math.random() * 2);

        let board = {};
        const cols='ABCDEFGH';
        for (let i = 0; i <8; i++) {
            for (let j = 0; j < 8; j++) {
                board[cols[j]+(8-i)] = PIECES_AT[i][j];
            }
        }
        const updates = {
            [`users/${uid}/matchId`]: matchId,
            [`users/${oppUid}/matchId`]: matchId,
            [`queue/entries/${uid}`]: null,
            [`queue/entries/${oppUid}`]: null,
            [`matches/${matchId}`]: {
                createAt: serverTimestamp(),
                board,
                turn: 'white',
                a: bit?uid:oppUid,
                b: bit?oppUid:uid,
                winner:'none',
                timeW:600,
                timeB:600,
                "history":[
                    {fenAfter:fmtFEN(globalBoard,'white','KQkq','-')}
                ]
            }
        };

        try { await onDisconnect(entryRef).cancel(); }
        catch { }
        try {
            await update(ref(db), updates);

        } catch (error) {
            console.log(error);
        }
    }
    return null;
}
export async function cancelGame({ db, auth }) {
    const uid = auth?.currentUser?.uid;
    if (!uid)
        return;
    if (offMatch) {
        offMatch();
        offMatch = null;
    }
    const entryRef = ref(db, `queue/entries/${uid}`);
    try {
        await onDisconnect(entryRef).cancel();
    } catch (error) {

    }
    try {
        await remove(entryRef);
    } catch (error) {

    }
    console.log("Canceled queue and listener removed ");

}