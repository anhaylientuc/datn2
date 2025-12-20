import { boardEl } from "../app";
import { S } from "./state";
export function lockBoard() {
    if (!S.boardEl) return;
    S.boardEl.classList.add('locked');
}
export function unlockBoard() {
    if (!S.boardEl) return;
    S.boardEl.classList.remove('locked');
   
}
