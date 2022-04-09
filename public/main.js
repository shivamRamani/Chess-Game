import { StartingPosition } from "./StartingPos.js";
// import { io } from '/socket.io-client';
// import { io } from "/socket.io/socket.io.js"
import { handleMove } from "./Move.js";

const reset = document.querySelector("#Reset");
const join = document.querySelector("#joinRoom");
const creatGame = document.querySelector("#newGame");
const Rotate = document.querySelector("#Rotate-btn");

Rotate.addEventListener("click",()=>{
    console.log(document.getElementById('Board').classList);
    document.getElementById('Board').classList.toggle('rotate');
    let icons = document.querySelectorAll('.icons');

    icons.forEach(icon=>{
        icon.classList.toggle('rotate');
    })

});

export let socket=io();
// let room='1';

creatGame.addEventListener("click",()=>{
    StartingPosition();
    socket.emit("creatGame"); 
    
});

join.addEventListener("click",()=>{
    event.preventDefault();
    const roomid=document.querySelector("#roomId").value;
    console.log(roomid);
    socket.emit("joinGame",roomid);
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
})


socket.on('roomFull',()=>{
    alert("room is full");
})


  