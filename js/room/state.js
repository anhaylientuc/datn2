// src/room/state.js
export const S = {
  gMatchId: null,
  boardEl: null,

  gTimeW: 0,
  gTimeB: 0,

  timerW: null,
  timerB: null,

  You: '',
  Opp: '',
  turn: '',
  side: '',

  History: null,
  replayIndex: null,
  lastMove: '',

  uid: '',
  matchRef: null,

  lastFen: null,
  isGameOver: false,
  isReplay: false,
  
  cBest:0,
  cGood:0,
  cInAcc:0,
  cMistake:0,
  cBlunder:0,

  check:null

};
