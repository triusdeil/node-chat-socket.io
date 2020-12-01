const socket = io()

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
//envia INTERFAZ
btn.addEventListener('click', function(){
    socket.emit('chat:message',{
        message: message.value,
        username: username.value
    })
})

//envia INTERFAZ
message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username.value)
})

//escucha INTERFAZ
//enviar mensaje dentro del cliente
socket.on('chat:message', function(data){
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>:${data.message}
    </p>`;
})
//escucha INTERFAZ
//escribiendo mensaje dentro del cliente
socket.on('chat:typing', function(data){
    actions.innerHTML = `<p><em>${data} is typing ...</em></p>`
})