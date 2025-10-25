import { auth, db, provider } from "./firebase.js";
import { ref, set, update } from "firebase/database";
import { getRedirectResult, signInAnonymously, signOut, onAuthStateChanged, signInWithRedirect, signInWithPopup } from "firebase/auth";
async function logout() {
    try {

        const user = auth.currentUser;
        if (!user) {
            return;
        }
        const uid = user.uid;
        const updates = {};
        updates[`users/${uid}/matchId`] = null;
        updates[`queue/entries/${uid}`] = null;

        await update(ref(db), updates);
        await signOut(auth)

    } catch (error) {
        console.log("Loi khi dang xuat: ", error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const btnGoogle = document.getElementById('btn-google');
    const nameEl = document.querySelector('#user-card .username');
    const avatarEl = document.querySelector('#user-card .ic img');


    getRedirectResult(auth)
        .then((res) => {
            if (res?.user) console.log("[Auth] Redirect OK:", res.user.uid);
        })
        .catch((err) => {
            console.error("[Auth] Redirect error:", err.code, err.message);
            alert("Google redirect error: " + err.code);
        });
    btnGoogle?.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error.code);
            await signInWithRedirect(auth, provider);
            return;
        }
        finally {
        }
    })
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user)
            document.body.classList.add('is-auth');
            const displayName = user.displayName || user.email || 'You';
            if (nameEl) nameEl.textContent = displayName;
            if (avatarEl) avatarEl.src = user.photoURL || 'src/icons/user.png';


        }
        else {
            document.body.classList.remove('is-auth');
        }
    })
})