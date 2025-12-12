document.body.classList.add('auth-pending');
import { auth, db, provider } from "./firebase.js";
import { ref, set, update, push, serverTimestamp } from "firebase/database";
import { getRedirectResult, signInAnonymously, signOut, onAuthStateChanged, signInWithRedirect, signInWithPopup } from "firebase/auth";
export let user = null;
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
        window.location.href = 'index.html'; // hoặc './index.html' tùy cấu trúc folder


    } catch (error) {
        console.log("Loi khi dang xuat: ", error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const btnGoogle = document.getElementById('btn-google');
    const btnGuest = document.getElementById('btn-guest');
    const nameEl = document.querySelector('#user-card .username');
    const avatarEl = document.querySelector('#user-card .ic img');
    const btnLogout=document.getElementById('btn-logout-danger');

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

    onAuthStateChanged(auth, (u) => {
        document.body.classList.remove('auth-pending');
        if (u) {
            document.body.classList.add('is-auth');
            const displayName = u.displayName || u.email || 'You';
            if (nameEl) nameEl.textContent = displayName;
            if (avatarEl) avatarEl.src = u.photoURL || 'src/icons/user.png';
            user=u
            console.log(user.uid)

        }
        else {
            document.body.classList.remove('is-auth');
        }
    })
    // document.body.classList.remove('auth-pending');
    // const user = JSON.parse(localStorage.getItem('user'));
    // if (user) {
    //     document.body.classList.add('is-auth');
    //     const displayName = u.displayName || u.email || 'You';
    //     if (nameEl) nameEl.textContent = displayName;
    //     if (avatarEl) avatarEl.src = u.photoURL || 'src/icons/user.png';
    //     user = u
    //     console.log(user.uid)
    // }
    // else
    //     document.body.classList.remove('is-auth');

    btnGuest?.addEventListener('click', async () => {
        try {
            console.log('ok');
            const cred = await signInAnonymously(auth);
            const user = cred.user;
            localStorage.setItem('user', JSON.stringify(user));
            const uid = user.uid;
            if (nameEl) nameEl.textContent = `Guest-${uid.slice(-4)}`;
            if (avatarEl) avatarEl.src = user.photoURL || 'src/icons/user.png';

            const userRef = ref(db, `users/${uid}`);

            await set(userRef, {
                displayName: `Guest-${uid.slice(-4)}`,
                photoURL: user.photoURL || 'src/icons/user.png',
                isGuest: true,
                matchId: null,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp()
            })

        } catch (error) {
            console.log(error);
        }

    })
    btnLogout.addEventListener('click',logout);
})