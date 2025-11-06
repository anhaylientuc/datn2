import { get, update } from "firebase/database";
import { auth, db, ref } from "./firebase";
import { boardEl } from "./app";
import { fillPieces } from "./board";
let params = null;
let matchId = null;
let side = '';
async function flipBoardDOM() {

    const nodes = Array.from(boardEl.children);
    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j < 8; j++) {
            boardEl.appendChild(nodes[i * 8 + j]);
        }
    }
}
document.addEventListener('DOMContentLoaded', async () => {
    params = new URLSearchParams(window.location.search);
    matchId = params.get('room');
    const matchRef = ref(db, `matches/${matchId}`);
    const match = (await get(matchRef)).val();
    const uid = auth?.currentUser?.uid;
    const sideRef = ref(db, `users/${uid}/side`);
    side = (await get(sideRef)).val();
    if(side=='black')
        flipBoardDOM();
    await fillPieces(matchId);
})
