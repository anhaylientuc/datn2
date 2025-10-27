import {
    ref, get, set, remove, runTransaction, onDisconnect, onValue,
    query,
    limitToFirst, update,
    serverTimestamp
} from "firebase/database";
import { goToRoom } from "./room";
import { BOARD, PIECES_AT } from "./constants/piece";
const offMatch=null;
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

    // --- lắng nghe khi có matchId, nhớ giữ off() để gỡ ---

    offMatch=    onValue(matchIdRef, async (snap) => {
        const v = snap.val();
        if (v == null) return;

        onDisconnect(entryRef).cancel();
        window.addEventListener('beforeunload', cleanup);
        window.addEventListener('pagehide', cleanup);
        offMatch();


        alert('[MATCHED] ' + v);
        await goToRoom(v);


    })
    await set(entryRef, {ts: Date.now(),claimedBy: null});
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
        const matchId = Date.now();
        let board = {};
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                board[BOARD[i][j]] = PIECES_AT[i][j];
            }
        }
        const updates = {
            [`users/${uid}/matchId`]: matchId,
            [`users/${oppUid}/matchId`]: matchId,
            [`queue/entries/${uid}`]: null,
            [`queue/entries/${oppUid}`]: null,
            [`matches/${matchId}`]: {
                a: uid,
                b: oppUid,
                createAt: serverTimestamp(),
                board,
                turn: 'white',
                lastMove: { from: '', to: '' }
            }
        };

        try { await onDisconnect(entryRef).cancel(); }
        catch { }
        await update(ref(db), updates);
        //await createMatch(matchId);
        return;
    }
}
export async function cancelGame({db,auth})
{
    const uid=auth?.currentUser?.uid;
    if(!uid)
        return;
    if(offMatch){
        offMatch();
        offMatch=null;
    }
    const entryRef=ref(db,`queue/entries/${uid}`);
    try{
        await onDisconnect(entryRef).cancel();
    }catch(error){

    }
    try {
        remove(entryRef);
    } catch (error) {
        
    }
    console.log("Canceled queue and listener removed ");

}