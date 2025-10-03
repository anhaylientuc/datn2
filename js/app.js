import {
  ref, push, get, set, remove, onValue, runTransaction, onDisconnect
} from "firebase/database";
import { onAuthStateChanged, signInAnonymously, signOut } from "firebase/auth";
import { auth,db } from "./firebase";
let board=document.getElementById('board');
const data = [
  // Quân đen (Black)
  {id:1,  name:'rook',   pos:'A8', v:'b', side:'black', img:'./src/images/rookB.png',   isClick:false, x:1, y:1},
  {id:2,  name:'knight', pos:'B8', v:'b', side:'black', img:'./src/images/knightB.png', isClick:false, x:1, y:2},
  {id:3,  name:'bishop', pos:'C8', v:'b', side:'black', img:'./src/images/bishopB.png', isClick:false, x:1, y:3},
  {id:4,  name:'queen',  pos:'E8', v:'b', side:'black', img:'./src/images/queenB.png',  isClick:false, x:1, y:5},
  {id:5,  name:'king',   pos:'D8', v:'b', side:'black', img:'./src/images/kingB.png',   isClick:false, x:1, y:4},
  {id:6,  name:'bishop', pos:'F8', v:'b', side:'black', img:'./src/images/bishopB.png', isClick:false, x:1, y:6},
  {id:7,  name:'knight', pos:'G8', v:'b', side:'black', img:'./src/images/knightB.png', isClick:false, x:1, y:7},
  {id:8,  name:'rook',   pos:'H8', v:'b', side:'black', img:'./src/images/rookB.png',   isClick:false, x:1, y:8},

  {id:9,  name:'pawn',   pos:'A7', v:'b', side:'black', img:'./src/images/pawnB.png',   isClick:false, x:2, y:1},
  {id:10, name:'pawn',   pos:'B7', v:'b', side:'black', img:'./src/images/pawnB.png',   isClick:false, x:2, y:2},
  {id:11, name:'pawn',   pos:'C7', v:'b', side:'black', img:'./src/images/pawnB.png',   isClick:false, x:2, y:3},
  {id:12, name:'pawn',   pos:'D7', v:'b', side:'black', img:'./src/images/pawnB.png',   isClick:false, x:2, y:4},
  {id:13, name:'pawn',   pos:'E7', v:'b', side:'black', img:'./src/images/pawnB.png',   isClick:false, x:2, y:5},
  {id:14, name:'pawn',   pos:'F7', v:'b', side:'black', img:'./src/images/pawnB.png',   isClick:false, x:2, y:6},
  {id:15, name:'pawn',   pos:'G7', v:'b', side:'black', img:'./src/images/pawnB.png',   isClick:false, x:2, y:7},
  {id:16, name:'pawn',   pos:'H7', v:'b', side:'black', img:'./src/images/pawnB.png',   isClick:false, x:2, y:8},

  // Quân trắng (White)
  {id:17, name:'rook',   pos:'A1', v:'w', side:'white', img:'./src/images/rookW.png',   isClick:false, x:8, y:1},
  {id:18, name:'knight', pos:'B1', v:'w', side:'white', img:'./src/images/knightW.png', isClick:false, x:8, y:2},
  {id:19, name:'bishop', pos:'C1', v:'w', side:'white', img:'./src/images/bishopW.png', isClick:false, x:8, y:3},
  {id:20, name:'queen',  pos:'D1', v:'w', side:'white', img:'./src/images/queenW.png',  isClick:false, x:8, y:4},
  {id:21, name:'king',   pos:'E1', v:'w', side:'white', img:'./src/images/kingW.png',   isClick:false, x:8, y:5},
  {id:22, name:'bishop', pos:'F1', v:'w', side:'white', img:'./src/images/bishopW.png', isClick:false, x:8, y:6},
  {id:23, name:'knight', pos:'G1', v:'w', side:'white', img:'./src/images/knightW.png', isClick:false, x:8, y:7},
  {id:24, name:'rook',   pos:'H1', v:'w', side:'white', img:'./src/images/rookW.png',   isClick:false, x:8, y:8},

  {id:25, name:'pawn',   pos:'A2', v:'w', side:'white', img:'./src/images/pawnW.png',   isClick:false, x:7, y:1},
  {id:26, name:'pawn',   pos:'B2', v:'w', side:'white', img:'./src/images/pawnW.png',   isClick:false, x:7, y:2},
  {id:27, name:'pawn',   pos:'C2', v:'w', side:'white', img:'./src/images/pawnW.png',   isClick:false, x:7, y:3},
  {id:28, name:'pawn',   pos:'D2', v:'w', side:'white', img:'./src/images/pawnW.png',   isClick:false, x:7, y:4},
  {id:29, name:'pawn',   pos:'E2', v:'w', side:'white', img:'./src/images/pawnW.png',   isClick:false, x:7, y:5},
  {id:30, name:'pawn',   pos:'F2', v:'w', side:'white', img:'./src/images/pawnW.png',   isClick:false, x:7, y:6},
  {id:31, name:'pawn',   pos:'G2', v:'w', side:'white', img:'./src/images/pawnW.png',   isClick:false, x:7, y:7},
  {id:32, name:'pawn',   pos:'H2', v:'w', side:'white', img:'./src/images/pawnW.png',   isClick:false, x:7, y:8}
];

const a=Array.from({length:9},()=>Array(9).fill(0));
onAuthStateChanged(auth,async()=>{
    const user=auth.currentUser;
    if(user){
        const snapshot=await get(ref(db,"users/"+user.uid));
        if(snapshot.exists()){
            console.log('user da ton tai');
        }
        else{
            console.log('Chua co user');
            await set(ref(db,"users/"+user.uid),{'claim':''});
        }
    }
})
function createBoard()
{
    for(let i=8;i>=1;i--){
        for(let j=0;j<8;j++){
            const li=document.createElement('li');
            li.className='square';
            li.dataset.value=String.fromCharCode('A'.charCodeAt(0)+j)+i;
            board.appendChild(li);            
        }
        
    }
    
    fillColorBoard();
    fillPieces();
}
function fillColorBoard()
{
    const container=document.querySelectorAll('#board li')
    container.forEach((item,index)=>{
        item.style.backgroundColor=(Math.floor(index/8)+index)%2==0?'#EEEED2':'#769656';
    })
    
}
function fillPieces()
{
    data.forEach((item,index)=>{
        const {pos,img,id,x,y}=item;
        const container=document.querySelectorAll('#board li')
        container.forEach((li,index)=>{
            if(li.dataset.value==pos){
                const div=document.createElement('div');
                div.className='piece';
                div.dataset.value=id;
                const _img=document.createElement('img');
                _img.src=img;
                div.appendChild(_img)
                li.appendChild(div)
                a[x][y]=id;
            }
        })
    })
    
    const pieces=document.querySelectorAll('.piece')
    pieces.forEach((item,index)=>{
        let isDragging = false;
        item.style.cursor='grab';
        item.style.position = 'absolute'; // nhớ set absolute để top/left hoạt động
        let moves=[];   

        let startClientY=0,startY=0;
        let startClientX=0,startX=0;
        let pieceX=0,pieceY=0;
        const id=item.dataset.value;
        const piece=data.find(item=>item.id==id);

        item.addEventListener('pointerdown',e=>{
            moves=getMoves(item);

            pieceX=piece.x;
            pieceY=piece.y;


            // ẩn quân cờ
            isDragging=true;
            item.style.zIndex=1;

            // cập  nhật vị trí con chuột ban đầu
            startClientY=e.clientY;
            startClientX=e.clientX;

            // lấy vị trí quân cờ hiện tại
            const curTop=parseFloat(getComputedStyle(item).top);
            const curLeft=parseFloat(getComputedStyle(item).left);
            startX=Number.isNaN(curLeft)?0:curLeft;
            startY=Number.isNaN(curTop)?0:curTop;


            item.style.cursor='grabbing';
            e.preventDefault();
        })
        item.addEventListener('pointermove',e=>{
            if(!isDragging)
                return;

            // tính khoảng cách giữa các lần di chuột
            const dx=e.clientX-startClientX;
            const dy=e.clientY-startClientY;

            // cập nhật vị trí quân cờ
            item.style.top=(startY+dy)+'px';
            item.style.left=(startX+dx)+'px';
            

            

        })
        item.addEventListener('pointerup',  e=>{
            item.style.pointerEvents='';

            if(!isDragging) 
                return;
            isDragging=false;
            item.style.zIndex='';
            item.style.cursor='grab';
            item.style.pointerEvents='none';
            const el=document.elementFromPoint(e.clientX,e.clientY).closest('.square');
            let v=el.dataset.value;
            let x=parseInt(9-v[1]);
            let y=parseInt(v[0].charCodeAt(0)-64);
            let found=moves.some(p=>p[0]==x&&p[1]==y)
            if(!found){
                item.style.left='0px';
                item.style.top='0px';
                item.style.pointerEvents='';

                return;
            }

            if(el!=null){
                el.innerHTML="";
                el.appendChild(item);
                item.style.left='0px';
                item.style.top='0px';


                a[pieceX][pieceY]=0;
                a[x][y]=id;
               
                piece.x=x;
                piece.y=y;
                piece.isClick=true;




            }
            item.style.pointerEvents='';

        })
    })
    
}
function getMoves(item)
{
    const v=parseInt(item.dataset.value);
    let piece=data.find(item=>item.id===v)
    let moves=[];
    switch(piece.name){
        case 'pawn':
            moves=handlePawn(piece)
            break;
        case 'rook':
            moves=handleRook(piece)
            break;
        case 'knight':
            moves=handleKnight(piece);
            break;
        case 'bishop':
            moves=handleBishop(piece);
            break;
        case 'queen':
            moves=handleQueen(piece);
            break;
        case 'king':
            moves=handleKing(piece);
            break;
    }
    return moves;
}
function handlePawn(piece)
{

    let {isClick,x,y,side}=piece;
    let moves=[];
    if(a[x-1][y]==0)
        moves.push([x-1,y]);
    if(!isClick&&a[x-2][y]==0){
        moves.push([x-2,y]);
    }
    if(isValid(x-1,y-1)&&a[x-1][y-1]!=0&&data[a[x-1][y-1]-1].side!=side){
        moves.push([x-1,y-1]);
    }
    if(isValid(x-1,y+1)&&a[x-1][y+1]!=0&&data[a[x-1][y+1]-1].side!=side){
        moves.push([x-1,y+1]);
    }
    return moves;
   
}
function handleRook(piece)
{
    let {x,y,side}=piece;
    let moves=[];
    let steps=[1,-1,0];
    for(let i of steps){
        for(let j of steps){
            if(i*j!=0)
                continue;
            let pieceX=x+i,pieceY=y+j;
            while(isValid(pieceX,pieceY)){
                if(a[pieceX][pieceY]!=0&&data[a[pieceX][pieceY]-1].side==side)
                    break;
                moves.push([pieceX,pieceY]);
                if(a[pieceX][pieceY]!=0&&data[a[pieceX][pieceY]-1].side!=side)
                    break;
                pieceX+=i;
                pieceY+=j;
            }
        }
    }
    return moves;
}
function isValid(x,y)
{
    if(x<1||x>8||y<1||y>8)
        return 0;
   return 1;
}
function handleKnight(piece)
{
    let {x,y,side}=piece;
    let steps=[-2,-1,1,2];
    let moves=[];
    for(let i of steps){
        for(let j of steps){
            let pieceX=x+i,pieceY=y+j;
            if(!isValid(pieceX,pieceY)){
                continue;
            }
            if(Math.abs(i*j)!=2)
                continue;
            if(a[pieceX][pieceY]==0||data[a[pieceX][pieceY]-1].side!=side)
                moves.push([pieceX,pieceY]);
        }
    }
    return moves;
}
function handleBishop(piece)
{
    let {x,y,side}=piece;
    let moves=[];
    let steps=[1,-1];
    for(let i of steps){
        for(let j of steps){
            let pieceX=x+i,pieceY=y+j;
            while(isValid(pieceX,pieceY)&&a[pieceX][pieceY]==0){
                moves.push([pieceX,pieceY]);
                pieceX+=i;
                pieceY+=j;
            }
            if(isValid(pieceX,pieceY)&&a[pieceX][pieceY]!=0&&data[a[pieceX][pieceY]-1].side!=side)
                moves.push([pieceX,pieceY]);
        }
    }
    return moves;
}
function handleQueen(piece)
{
    let moves=handleBishop(piece);
    return moves.concat(handleRook(piece));
}
function handleKing(piece)
{
    let {x,y,side}=piece;
    let moves=[];
    let steps=[1,-1,0];
    for(let i of steps){
        for(let j of steps){
            let pieceX=x+i,pieceY=y+j;
            if(isValid(pieceX,pieceY)){
                if(a[pieceX][pieceY]==0)
                    moves.push([pieceX,pieceY]);
                if(a[pieceX][pieceY]!=0&&data[a[pieceX][pieceY]-1].side!=side)
                     moves.push([pieceX,pieceY]);
                pieceX+=i;
                pieceY+=j;
            }
        }
    }
    return moves;
}
function removePiece(piece)
{
    
}
function printBoard()
{
    for(let i=1;i<=8;i++){
        let str="";
        for(let j=1;j<=8;j++){
           str+=a[i][j]+' ';

        }
       //console.log(str);
    }
}
createBoard();
