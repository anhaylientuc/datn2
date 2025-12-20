import { update } from "firebase/database";
import { S } from "../state";
import { lockBoard } from "../boardLock";
import { enterReplayMode } from "../replay/mode";

export function setupGameActions() {
    const btnResign = document.getElementById('btn-resign');
    btnResign.addEventListener('click', () => {
        if (S.You && S.Opp) {
            update(S.matchRef, { winner: S.You == S.uid ? S.Opp : S.You });
            lockBoard();
        }
    })
    document.getElementById('btn-home').addEventListener('click', () => {
        window.location.href = 'index.html';
    })
}