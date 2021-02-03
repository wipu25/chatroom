const { Socket } = require('dgram');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/welcome.html');
})

app.get('/chat',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

io.on('connection', (socket)=>{
    io.emit('welcome');
    socket.on('disconnect',()=>{
        io.emit('goodbye');
    })
    socket.on('chat-msg',(msg)=>{
        io.emit('output message',msg);
        console.log(msg);
    })
})

http.listen(3000, ()=>{
    console.log("listening on 3000")
})