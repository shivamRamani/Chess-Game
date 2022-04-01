import { StartingPosition } from "./StartingPos.js";
// import { io } from '/socket.io-client';
// import { io } from "/socket.io/socket.io.js"


StartingPosition();

const reset = document.querySelector("#Reset");

reset.addEventListener("click",
    StartingPosition
);





  