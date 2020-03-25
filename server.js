const path = require('path');
const http = require('http');
const express=require('express');
const socketio = require('socket.io');

const app= express();
const server = http.createServer(app);
const io = socketio(server);
 

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//run when client connects

//welcoming a client
io.on('connection', socket =>{
    console.log('New WS Connection');
    socket.emit('message','welcome to chatCord!');
    socket.broadcast.emit('message','A user has joined');
   
    //when one disconnects
    socket.on('disconnect',()=>{
        io.emit('message','A user has left the chat');
    });
    //broadcast when a user connects

    //listen for  chat message 
    socket.on('chatMessage', msg=>{
        io.emit('message',msg);
    });
   
      
});

const PORT = 3000 || process.env.PORT

server.listen(PORT,()=>console.log(`server running on port ${PORT}`))