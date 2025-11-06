document.body.classList.add('auth-pending');
import { auth, db, provider } from "./firebase.js";
import { ref, set, update,push, serverTimestamp } from "firebase/database";
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
    const btnGuest = document.getElementById('btn-guest');
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
        document.body.classList.remove('auth-pending');
        if (user) {
            document.body.classList.add('is-auth');
            const displayName = user.displayName || user.email || 'You';
            if (nameEl) nameEl.textContent = displayName;
            if (avatarEl) avatarEl.src = user.photoURL || 'src/icons/user.png';


        }
        else {
            document.body.classList.remove('is-auth');
        }
    })

    btnGuest?.addEventListener('click', async () => {
        try {
            const cred=await signInAnonymously(auth);
            const user=cred.user;
            const uid=user.uid;
            if (nameEl) nameEl.textContent = `Guest-${uid.slice(-4)}`;
            if (avatarEl) avatarEl.src = user.photoURL || 'src/icons/user.png';

            const userRef=ref(db,`users/${uid}`);

            await set(userRef,{
                displayName:`Guest-${uid.slice(-4)}`,
                photoURL:user.photoURL || 'src/icons/user.png',
                isGuest:true,
                matchId:null,
                createdAt: serverTimestamp(),
                lastLogin:serverTimestamp()
            })

        } catch (error) {
            console.log(error);
        }
        
    })
})