// comando para establecer la coenexion

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('Conectado al Servidor.');
});

socket.on('disconnect', function(){
    console.log('Desconectado al Servidor.');
});

socket.on('lastTicket', function(resp) {
    label.text(resp.actual); 
});

$('button').on('click', function(){
    
    socket.emit('nextTicket', null, function(nextTicket){
            label.text(nextTicket);
    });

});