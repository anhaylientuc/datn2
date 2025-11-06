

import { BOARD } from "./constants/piece";
export let boardEl=null;
async function renderBoard() {
    try {
       
        if(!boardEl)
            boardEl=document.getElementById('board');
        BOARD.flat().forEach((cur, index) => {
            const li = document.createElement('li');
            li.className = 'square';
            li.dataset.value = cur;
            boardEl.appendChild(li);
        })
        fillColorBoard();
        // if (side == 'black') {
        //     console.log('cc');
        //     flipBoardDOM();
        // }
        //initBoardDOM();

        //await fillPieces(matchId);
    } catch (error) {
        console.log(error);
    }
}
function fillColorBoard() {
    const container = document.querySelectorAll('#board li')
    container.forEach((item, index) => {
        item.style.backgroundColor = (Math.floor(index / 8) + index) % 2 == 0 ? '#EEEED2' : '#769656';
    })
}
function loadData()
{
    renderBoard();
}

loadData();





