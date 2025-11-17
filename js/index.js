import { db, auth, onDisconnect, ref, set } from "./firebase.js";
import { findGame } from "./matching.js";
// DOM đã parse xong nên lấy được nút


const $ = (s) => document.querySelector(s);
const btnLogin = $("#btn-login");
const btnLogout = $("#btn-logout");
const btnFind = $("#btn-findgame");
const timeEl = document.getElementById('timer');
let busy = false;


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
