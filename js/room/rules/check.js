import { globalBoard } from "../../app";
import { handleMove } from "../../move";
import { S } from "../state";
export function highlightCheck() {
    let checkMoves=[], side = null, posKing = null,posYourKing=null;
    const king=S.side=='white'?'k':'K';
    const yourKing=S.side=='white'?'K':'k';
    side=S.side=='white'?'black':'white';
    for (const [pos, piece] of Object.entries(globalBoard)) {
        if (globalBoard[pos] == '.')
            continue;
        const { m, k } = handleMove(piece, pos);
        const check=k.find(move=>globalBoard[move]==king);
        const checkYourking=k.find(move=>globalBoard[move]==yourKing);
        if(check){
            posKing=check;
            checkMoves.push(pos);
        }
        if(checkYourking){
            posYourKing=checkYourking;
        }
    }
    if(posYourKing){
        return false;
    }
    if(!posKing){
        S.check=null;
        return false;
    }
    S.check = { side, posKing, posAttacker: checkMoves };
    return true;
}