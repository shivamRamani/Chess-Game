import { StartingPosition } from "./StartingPos.js";
// import { io } from '/socket.io-client';
// import { io } from "/socket.io/socket.io.js"


StartingPosition();

const reset = document.querySelector("#Reset");

reset.addEventListener("click",
    StartingPosition
);

var socket = io();
 
  window.onclick = function(e) {
      socket.emit('message', 'hello world!');
  };



