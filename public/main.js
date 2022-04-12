import { StartingPosition } from "./StartingPos.js";
// import { io } from '/socket.io-client';
// import { io } from "/socket.io/socket.io.js"
import { handleMove } from "./Move.js";

const reset = document.querySelector("#Reset");
const join = document.querySelector("#joinRoom");
const creatGame = document.querySelector("#newGame");
const Rotate = document.querySelector("#Rotate-btn");
const roomId = document.querySelector("#roomId");

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

creatGame.addEventListener("click",()=>{
    StartingPosition();
    socket.emit("creatGame"); 
    
});

join.addEventListener("click",()=>{
    event.preventDefault();
    const inputRoom=document.querySelector("#inputRoomId").value;
    // console.log(roomid);
    if(inputRoom!=''){
        socket.emit("joinGame",inputRoom);
        // rotateBoard();
    }
    
});

StartingPosition();


reset.addEventListener("click",
StartingPosition
);

socket.on('move', (move)=> {
    
    handleMove(move);
});

socket.on('gameCode',(code)=>{
    console.log(code);
    console.log(roomId);
    roomId.innerText="Your Room Code Id : " + code;
})


socket.on('roomFull',()=>{
    alert("room is full");
});

socket.on("InvalidCode",()=>{
    alert("Room Does Not Exists!!!");
})


  