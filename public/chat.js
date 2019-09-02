'use strict';


// Make connection
let socket = io.connect('http://localhost:4000' || process.env.PORT);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

// Query DOM
let message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');




// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value,
  });
  message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<img src="/images/writing.gif">'+ '<p><em>' + data + ' is typing a message... </em></p>';
});