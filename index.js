const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//Websockets
//io.on cuando alguien se conecte ejecute codigo
io.on('connection',(socket) => {
    console.log('new connection')
    //escucha servidor
    socket.on('chat:message', (data) =>{
        io.sockets.emit('chat:message', data)
    })
    //escucha servidor
    socket.on('chat:typing', (data) =>{
        socket.broadcast.emit('chat:typing',data)
    })
})

//settings
app.set('port', process.env.PORT || 3000)

//static files
app.use(express.static(path.join(__dirname,'public')))

//start the server
server.listen(app.get('port'), () =>{
    console.log('server on port 3000')
})
