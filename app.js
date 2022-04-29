const express = require("express");
const app = express();
const port=process.env.PORT || 3000;
const {v4 : uuidv4} = require('uuid')

app.use(express.static('public'));
let http =require('http').Server(app);

const io=require('socket.io')(http);

const rooms={};
const currRooms=[];
let roomClients={};

io.on('connection', function(socket) { 
    console.log('new connection '+socket.id);




    socket.on('move', function(move) { 
        let roomName=rooms[socket.id];
        // console.log(socket.rooms);
        console.log(roomName);
        socket.to(roomName).emit('move',move);
        // socket.broadcast.emit('move',move);  
    });

    socket.on("creatGame",()=>{

        let code=uuidv4();
        rooms[socket.id]=code;
        currRooms.push(code);
        roomClients[code]=1;
        socket.join(code);
        socket.emit("gameCode",code);
        // console.log(socket.rooms);
        // const arr = Array.from(io.sockets.adapter.rooms);
        // console.log(arr);
    });

    socket.on("joinGame",(code)=>{

        if(currRooms.includes(code)){
            let clients=Array.from(io.sockets.adapter.rooms.get(code));
            console.log("clients are " + (clients));
            if(clients.length==2){
                socket.emit("roomFull");
            }
            else {
                console.log(code);
                rooms[socket.id]=code;
                socket.join(code);
            }
        }
        else {
            socket.emit("InvalidCode");
        }
        
        

        
        
       

        // console.log(socket.rooms);
    })


});


app.get('/',(req,res)=>{
    console.log("hello");   
    res.sendFile(__dirname+'/public/index.html');
});

http.listen(port,()=>{
    console.log("listing on "+ port);
});