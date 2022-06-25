import { StartingPosition } from "./StartingPos.js";
import { handleMove } from "./Move.js";

const reset = document.querySelector("#Reset");
const join = document.querySelector("#joinRoom");
const creatGame = document.querySelector("#newGame");
const Rotate = document.querySelector("#Rotate-btn");
const roomId = document.querySelector("#roomId");
const joinFrom= document.querySelector('.joining_form');
const resign = document.querySelector('#resign');
const inGamebuttons= document.querySelector('.inGameButtons');
StartingPosition();
let currPalyer='white';

const rotateBoard=()=>{
    document.getElementById('Board').classList.toggle('rotate');
    let icons = document.querySelectorAll('.icons');

    icons.forEach(icon=>{
        icon.classList.toggle('rotate');
    })
}


Rotate.addEventListener("click",rotateBoard);

export let socket=io();
// let room='1';

creatGame.addEventListener("click",(event)=>{
    event.preventDefault()
    StartingPosition();
    socket.emit("creatGame"); 
    
});

join.addEventListener("click",(event)=>{
    event.preventDefault();
    const inputRoom=document.querySelector("#inputRoomId").value;
    // console.log(roomid);
    if(inputRoom!=''){
        socket.emit("joinGame",inputRoom);
        document.querySelector("#inputRoomId").value='';

        currPalyer='black'
        rotateBoard();
    }
    
});



reset.addEventListener("click",
StartingPosition
);


resign.addEventListener('click',()=>{
    StartingPosition();
    joinFrom.style.display='flex';
    inGamebuttons.style.display='none';
    socket.emit('gameover');
})



socket.on('move', (move)=> {
    handleMove(move);
});

socket.on('gameCode',(code)=>{
    console.log(code);
    console.log(roomId);
    document.querySelector("#inputRoomId").value='';
    roomId.innerText="Share this room code to start a game:\n" + code;
})


socket.on('roomFull',()=>{
    alert("room is full");
});

socket.on("InvalidCode",()=>{
    alert("Room Does Not Exists!!!");
})

socket.on('gameStarted',()=>{
    console.log('hiiiii');
    joinFrom.style.display='none';
    inGamebuttons.style.display='flex';

})

socket.on('gameover',()=>{
    alert('YOU WON');
    joinFrom.style.display='flex';
    inGamebuttons.style.display='none';

})
  