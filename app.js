const express = require("express");
const app = express();
const port=3000;

app.use(express.static('public'));
let http =require('http').Server(app);

const io=require('socket.io')(http);




io.on('connection', function(socket) {
    console.log('new connection '+socket.id);

    socket.on('message', function(msg) {
        console.log('Got message from client: ' + msg);     
    });
});


app.get('/',(req,res)=>{
    console.log("hello");   
    res.sendFile(__dirname+'/public/index.html');
});

http.listen(port,()=>{
    console.log("listing on "+ port);
});