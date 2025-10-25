import { auth, db, provider } from "./firebase.js";
import { ref, set,  update } from "firebase/database";
import { getRedirectResult,signInAnonymously, signOut, onAuthStateChanged,signInWithRedirect } from "firebase/auth";
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
document.addEventListener('DOMContentLoaded',()=>{
    const btnGoogle=document.getElementById('btn-google');


    getRedirectResult(auth).catch(()=>{});
    btnGoogle?.addEventListener('click',async()=>{
        btnGoogle.disable=true;
        try {
            await signInWithRedirect(auth,provider);
        } catch (error) {
            console.log(error.code);   
        }
        finally{
            btnGoogle.disable=false;
        }
    })
    onAuthStateChanged(auth,(user)=>{
        alert('Dang nhap thanh cong');
    })
})