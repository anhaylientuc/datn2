import { auth,db } from "./firebase.js";
import {  ref, set, get, child, runTransaction,push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth, signInAnonymously, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
async function login()
{
    // const saved=JSON.parse(localStorage.getItem('user')||null);
    // if(saved){
    //     alert('User exists');
    //     return;
    // }
    const cred=await signInAnonymously(auth);
    // const user=cred.user;
    // localStorage.setItem('user',JSON.stringify(user));
    
    return cred;
}
async function logout()
{
    try {
        
        const uid=auth.currentUser.uid;
        const userRef=ref(db,`users/${uid}`);
        await set(userRef,null);
        alert("Da dang xuat");
        await signOut(auth);
        
    } catch (error) {
        console.log("Loi khi dang xuat: ",error);
    }
}
export {
    login,logout
};