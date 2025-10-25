import { db, auth, onDisconnect, ref, set } from "./firebase.js";
import { findGame } from "./matching.js";
// DOM đã parse xong nên lấy được nút


const $ = (s) => document.querySelector(s);
const btnLogin = $("#btn-login");
const btnLogout = $("#btn-logout");
const btnFind = $("#btn-findgame");
const timeEl = document.getElementById('timer');
let busy = false;
// onAuthStateChanged(auth, user => {
//     document.documentElement.setAttribute("data-auth", user ? "auth" : "guest");
//     if (user) {
//         const entryRef = ref(db, `queue/entries/${user.uid}`);
//         onDisconnect(entryRef).remove();
//     }
//     [btnLogin, btnLogout, btnFind].forEach(b => b?.removeAttribute("disabled"));
//     busy = false;
// })

btnLogin?.addEventListener("click", async () => {
    if (busy)
        return;
    busy = true;
    btnLogin.disabled = true;
    try {
        const cred = await signInAnonymously(auth);
        const uid = cred.user.uid;
        const userRef = ref(db, `/users/${uid}`);
        await set(userRef, { claimed: '' })
    } catch (e) {
        alert(e.message);
    }

});
btnLogout?.addEventListener("click", async () => {
    if (busy)
        return;
    busy = true;
    btnLogout.disabled = true;
    try {
        console.log('ok');
        await logout();
    } catch (e) {
        alert(e.message);
        busy = false;
        btnLogout.disabled = false;
    }
});
let timer = null;
let elapsed = 0;
function pad(n) {
    return String(n).padStart(2, '0');
}
function fmt(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
btnFind?.addEventListener("click", async () => {
    let txt = btnFind.innerText.trim();
    if (txt == 'Find game') {
        btnFind.textContent = "Cancel...";
        setInterval(() => {
            elapsed++;
            timeEl.textContent = fmt(elapsed);

        }, 1000)
        const u = auth.currentUser;
        console.log(u);
        if (!u) return alert('Hay dang nhap truoc da');
        findGame({ db, auth });
    }
    else {
        btnFind.textContent = "Find game";
        const uid = auth.currentUser.uid;
        const entryRef = ref(db, `queue/entries/${uid}`);
        await set(entryRef, null);
    }
});