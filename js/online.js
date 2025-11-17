import { db,auth } from "./firebase";
import { cancelGame, findGame } from "./matching";
let sec=0;
let timerId=null;
function fmt(sec)
{
    const m=Math.floor(sec/60);
    const s=sec%60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}
function startTimer()
{
    if(timerId)
        return;
    const timeEl=document.getElementById('time');
    timerId=setInterval(()=>{
        if(sec>3600){
            stopTimer();
            return;
        }
        ++sec;
        timeEl.textContent=fmt(sec);
    },1000);
}
function stopTimer()
{
    if(timerId){
        clearInterval(timerId);
        timerId=null;
    }
    sec=0;
    console.log(sec);
    const timeEl=document.getElementById('time');
    timeEl.textContent=fmt(sec);
}
document.addEventListener('DOMContentLoaded',async()=>{
    const btnFind=document.getElementById('btn-find');
    const btnCancel=document.getElementById('btn-cancel');
    const user=JSON.parse(localStorage.getItem('user'));
    const uid=user.uid;
    btnFind.addEventListener('click',async()=>{
        btnFind.classList.add('is-finding');
        btnCancel.classList.add('is-finding');
        startTimer();
        await findGame({db,auth});
    })
    btnCancel.addEventListener('click',()=>{
        btnFind.classList.remove('is-finding');
        btnCancel.classList.remove('is-finding');
        stopTimer();
        cancelGame({db,auth});
    })
    

})