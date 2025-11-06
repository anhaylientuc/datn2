export const PIECES = [
  // Quân đen (Black)
  {id:1,  name:'rook',   pos:'A1', v:'b', side:'black', img:'/images/rookB.png',   isClick:false, x:0, y:0,status:0},
  {id:2,  name:'knight', pos:'B1', v:'b', side:'black', img:'/images/knightB.png', isClick:false, x:0, y:1,status:0},
  {id:3,  name:'bishop', pos:'C1', v:'b', side:'black', img:'/images/bishopB.png', isClick:false, x:0, y:2,status:0},
  {id:4,  name:'queen',  pos:'E1', v:'b', side:'black', img:'/images/queenB.png',  isClick:false, x:0, y:3,status:0},
  {id:5,  name:'king',   pos:'D1', v:'b', side:'black', img:'/images/kingB.png',   isClick:false, x:0, y:4,status:0},
  {id:6,  name:'bishop', pos:'F1', v:'b', side:'black', img:'/images/bishopB.png', isClick:false, x:0, y:5,status:0},
  {id:7,  name:'knight', pos:'G1', v:'b', side:'black', img:'/images/knightB.png', isClick:false, x:0, y:6,status:0},
  {id:8,  name:'rook',   pos:'H1', v:'b', side:'black', img:'/images/rookB.png',   isClick:false, x:0, y:77,status:0},

  {id:9,  name:'pawn',   pos:'A2', v:'b', side:'black', img:'/images/pawnB.png',   isClick:false, x:1, y:0,status:0},
  {id:10, name:'pawn',   pos:'B2', v:'b', side:'black', img:'/images/pawnB.png',   isClick:false, x:1, y:1,status:0},
  {id:11, name:'pawn',   pos:'C2', v:'b', side:'black', img:'/images/pawnB.png',   isClick:false, x:1, y:2,status:0},
  {id:12, name:'pawn',   pos:'D2', v:'b', side:'black', img:'/images/pawnB.png',   isClick:false, x:1, y:3,status:0},
  {id:13, name:'pawn',   pos:'E2', v:'b', side:'black', img:'/images/pawnB.png',   isClick:false, x:1, y:4,status:0},
  {id:14, name:'pawn',   pos:'F2', v:'b', side:'black', img:'/images/pawnB.png',   isClick:false, x:1, y:5,status:0},
  {id:15, name:'pawn',   pos:'G2', v:'b', side:'black', img:'/images/pawnB.png',   isClick:false, x:1, y:6,status:0},
  {id:16, name:'pawn',   pos:'H2', v:'b', side:'black', img:'/images/pawnB.png',   isClick:false, x:1, y:7,status:0},

  // Quân trắng (White)
  {id:17, name:'rook',   pos:'A8', v:'w', side:'white', img:'/images/rookW.png',   isClick:false, x:7, y:0,status:0},
  {id:18, name:'knight', pos:'B8', v:'w', side:'white', img:'/images/knightW.png', isClick:false, x:7, y:1,status:0},
  {id:19, name:'bishop', pos:'C8', v:'w', side:'white', img:'/images/bishopW.png', isClick:false, x:7, y:2,status:0},
  {id:20, name:'queen',  pos:'D8', v:'w', side:'white', img:'/images/queenW.png',  isClick:false, x:7, y:3,status:0},
  {id:21, name:'king',   pos:'E8', v:'w', side:'white', img:'/images/kingW.png',   isClick:false, x:7, y:4,status:0},
  {id:22, name:'bishop', pos:'F8', v:'w', side:'white', img:'/images/bishopW.png', isClick:false, x:7, y:5,status:0},
  {id:23, name:'knight', pos:'G8', v:'w', side:'white', img:'/images/knightW.png', isClick:false, x:7, y:6,status:0},
  {id:24, name:'rook',   pos:'H8', v:'w', side:'white', img:'/images/rookW.png',   isClick:false, x:7, y:7,status:0},

  {id:25, name:'pawn',   pos:'A7', v:'w', side:'white', img:'/images/pawnW.png',   isClick:false, x:6, y:0,status:0},
  {id:26, name:'pawn',   pos:'B7', v:'w', side:'white', img:'/images/pawnW.png',   isClick:false, x:6, y:1,status:0},
  {id:27, name:'pawn',   pos:'C7', v:'w', side:'white', img:'/images/pawnW.png',   isClick:false, x:6, y:2,status:0},
  {id:28, name:'pawn',   pos:'D7', v:'w', side:'white', img:'/images/pawnW.png',   isClick:false, x:6, y:3,status:0},
  {id:29, name:'pawn',   pos:'E7', v:'w', side:'white', img:'/images/pawnW.png',   isClick:false, x:6, y:4,status:0},
  {id:30, name:'pawn',   pos:'F7', v:'w', side:'white', img:'/images/pawnW.png',   isClick:false, x:6, y:5,status:0},
  {id:31, name:'pawn',   pos:'G7', v:'w', side:'white', img:'/images/pawnW.png',   isClick:false, x:6, y:6,status:0},
  {id:32, name:'pawn',   pos:'H7', v:'w', side:'white', img:'/images/pawnW.png',   isClick:false, x:6, y:7,status:0}
];
export const BOARD = [
  ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1'],
  ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
  ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3'],
  ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4'],
  ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5'],
  ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6'],
  ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],
  ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8']
];
export const PIECES_AT=[
  [1,2,3,4,5,6,7,8],
  [9,10,11,12,13,14,15,16],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [25,26,27,28,29,30,31,32],
  [17,18,19,20,21,22,23,24],
]