const fs = require('fs');

class Ticket {
    constructor(numero, escritorio){
        this.numero  = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        let data = require('../data/data.json');
        
        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        }else {
            this.reiniciarConteo();
        }
    }

    siguiente(){
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }

    getLast4(){
        return this.last4;
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0){
            return 'No hay Tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.last4.unshift( atenderTicket ); // agrega el ticket al inicio del arreglo

        if(this.last4.length > 4){
            this.last4.splice(-1,1); //borra el ultimo elemento
        }

        this.grabarArchivo();
        //console.log('Ultimos 4');
        //console.log(this.last4);

        return atenderTicket;

    }

    reiniciarConteo(){
       this.ultimo = 0;
       this.tickets = [];
       this.last4 = [];

       console.log('Se ha inicializado el sistema');
       this.grabarArchivo();
    }

    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets : this.tickets,
            last4 : this.last4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
}