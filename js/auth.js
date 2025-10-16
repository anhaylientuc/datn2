import { auth, db } from "./firebase.js";
import { ref, set,  update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth, signInAnonymously, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
export {
     logout,onAuthStateChanged,signInAnonymously,set
};