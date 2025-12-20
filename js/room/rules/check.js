import { globalBoard } from "../../app";
import { handleMove } from "../../move";
export function highlightCheck() {
    let wCheck = null, bCheck = null;
    for (const [pos, piece] of Object.entries(globalBoard)) {
        if (globalBoard[pos] == '.')
            continue;
        const { m, k } = handleMove(piece, pos);
        const w = k.find(move => globalBoard[move] == 'K');
        const b = k.find(move => globalBoard[move] == 'k');
        if (w) wCheck = w;
        if (b) bCheck = b;
    }
    if (wCheck && bCheck) {
        return 'invalid';
    }
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => {
        if (sq.dataset.value == (wCheck || bCheck)) {
            sq.classList.add('is-check');
        }
        else {
            sq.classList.remove('is-check');
        }
    })
    return wCheck ? 'w' : null || bCheck ? 'b' : null;
}