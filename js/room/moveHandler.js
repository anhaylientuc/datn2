import { update } from "firebase/database";
import { globalBoard, fmtFEN, getCastleFEN, getEnpassantFEN } from "../app";
import { fillPieces, on } from "../board";
import { S } from "./state";
import { highlightCheck } from "./rules/check";
import { canCheckMate } from "./rules/checkmate";
import { fmtSAN } from "./rules/san";
import { getBestEval, getEval } from "../stockfish";
import { handleMove } from "../move";


export function attachBoardChangeHandler() {
    on('board-change', async ({ name, from, to, special }) => {
        const capture = globalBoard[to];
        let winner = (capture.toUpperCase() == 'K' ? S.uid : 'none');
        let castleFen = getCastleFEN(name, from, to);
        let enpassantFen = getEnpassantFEN(name, from, to);
        if (!S.lastFen)
            S.lastFen = fmtFEN(globalBoard, 'white', 'KQkq', '-');
        const fenBefore = S.lastFen;
        //let user move
        let res = fmtSAN({ name, from, to, special });
        globalBoard[from] = '.';
        globalBoard[to] = name;
        fillPieces(S.turn, S.side);
        highlightCheck();
        console.log(S.check);
        //then check
        if (S.check) {
       

            const { side, posKing, posCheck } = S.check;
            console.log(S.side,side);
            if (S.side == side) {
                //roll back
                globalBoard[from] = name;
                globalBoard[to] = capture;
                fillPieces(S.turn, S.side);
                highlightCheck();
                return;
            }
            else {
                if (canCheckMate()) {
                    res += '#';
                    winner = S.uid;
                }
                else {
                    res += '+';
                }
                //highlightCheck();
            }

        }
        const oppTurn = S.turn == 'white' ? 'black' : 'white';
        const fenAfter = fmtFEN(globalBoard, oppTurn, castleFen, enpassantFen);
        S.lastFen = fenAfter;
        S.History.push({
            piece: name,
            from,
            to,
            san: res,
            capture,
            fenBefore,
            fenAfter,
            sideJustMoved: S.side
        })

        await update(S.matchRef, {
            board: globalBoard,
            lastMove: { piece: name, from, to },
            turn: S.side == 'white' ? 'black' : 'white',
            winner,
            timeW: S.gTimeW,
            timeB: S.gTimeB,
            history: S.History,
            check: S.check
        });

    })
}
