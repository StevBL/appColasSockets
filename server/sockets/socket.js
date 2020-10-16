const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.siguiente(); 
        console.log(next);
        callback(next);
    });

    client.emit('lastTicket', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getLast4()
    });

    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario.'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // act o modif cambios en last4

        client.broadcast.emit('ultimos4' ,ticketControl.getLast4());
        

    });

});