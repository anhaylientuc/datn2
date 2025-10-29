import { get, update } from "firebase/database";
import { renderBoard } from "./board";
import { auth, db, ref } from "./firebase";
import { BOARD, PIECES, PIECES_AT } from "./constants/piece";
export async function goToRoom(id) {
    const matchRef = ref(db, `matches/${id}`);
    const snap = await get(matchRef);
    renderBoard(snap);
}
function changeSide() {
    for (let i = 0; i < 8; i++) {
        let a = PIECES_AT[0][i];
        let b = PIECES_AT[7][i];
        [a, b] = [b, a];

        let c = PIECES_AT[1][i];
        let d = PIECES_AT[6][i];
        [c, d] = [d, c];
    }
    PIECES.forEach(item => {
        const { x } = item;
        switch (x) {
            case 0:
                item.x = 7;
                break;
            case 1:
                item.x = 6;
                break;
            case 7:
                item.x = 0;
                break;
            case 6:
                item.x = 1;
                break;
        }
    })
}
document.addEventListener("DOMContentLoaded",async ()=>{
    const params=new URLSearchParams(location.search);
    const matchId=params.get('room');
    await goToRoom(matchId);
})