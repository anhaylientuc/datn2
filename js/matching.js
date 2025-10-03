import {
    ref, push, get, set, remove, runTransaction, onDisconnect, onValue,
    query,
    limitToFirst, update,
    orderByChild,
    serverTimestamp
} from "firebase/database";
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

    await onDisconnect(entryRef).remove();

    const cleanup = () => { remove(entryRef); };
    window.addEventListener('beforeunload', cleanup);
    window.addEventListener('pagehide', cleanup);

    onValue(matchIdRef, (snap) => {
        const v = snap.val();
        if (v == null) return;

        onDisconnect(entryRef).cancel();
        window.addEventListener('beforeunload', cleanup);
        window.addEventListener('pagehide', cleanup);

        alert('[MATCHED] ' + v);
        stop();
    })
    await set(entryRef, {
        ts: Date.now(),
        claimedBy: null
    });
    const getCandidatesQ = query(entriesRef, limitToFirst(5)); const listSnap = await get(getCandidatesQ);
    if (!listSnap.exists())
        return;
    const entries = listSnap.val();
    const pairs = Object.entries(entries)
        .filter(([k, v]) => k != uid);
    for (const [oppUid, oppData] of pairs) {
        const oppRef = ref(db, `queue/entries/${oppUid}`);
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
        const updates = {
            [`users/${uid}/matchId`]: matchId,
            [`users/${oppUid}/matchId`]: matchId,
            [`queue/entries/${uid}`]: null,
            [`queue/entries/${oppUid}`]: null,
            [`matches/${matchId}`]: {
                a: uid,
                b: oppUid,
                createAt: serverTimestamp()
            }
        };
        try { await onDisconnect(entryRef).cancel(); }
        catch { }
        await update(ref(db), updates);
        return;
    }



}