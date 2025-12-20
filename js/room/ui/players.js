import { S } from "../state";
export function applyPlayerLabels() {
    const p2Name = document.getElementById('p2-name');
    const p1Name = document.getElementById('p1-name');
    if (!p1Name || !p2Name) return;
    if (S.side == 'black') {
        p2Name.textContent = 'You';
        p1Name.textContent = 'Opponent';
    }
    else {
        p2Name.textContent = 'Opponent';
        p1Name.textContent = 'You';
    }
}
