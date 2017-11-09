const net = require('net');
var PORT = 8030;
var klijenti = [];
var validUsers = {};
var name= [];

const server = net.createServer((socket) => {
    var ima=false;
    //socket.end('close socket\n');
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
   // klijenti.push(socket);
    socket.ima=false;
    console.log('client connected,socket\n');
//console.log(socket);
  /*  klijenti.forEach(function (client) {
        // Don't want to send it to sender
        if (client == socket) ima=true;

    });*/
   // socket.write("Dobrodosao" + socket.nama + "\n"); //ispis na klijentu
 //   broadcast(socket.name + "se pridruzio\n", socket); //ispis na svim ostalim klijentima, osim ovog upravo konektovanog


    socket.on('data',(data)=>{ //svaki klijent ima svoj socket
       // broadcast(socket.nick + ": " + data, socket);
      console.log('Podaci od klijenta, ispis server' +': ' + data+"\n");
      if(!socket.ima) {
          socket.nick = data.toString();
          if(nickovi(socket.nick)) {
              socket.write('nick je vec u upotrebi,pokusajte drugi\n')
          } else {
              klijenti.push(socket);
                if(name!='')
              socket.write("Trenutno na chatu: "+name+"\n");
                else    socket.write("Trenutno nema niko na chatu");
              name.push(socket.nick);
              socket.write("Dobrodosao " + socket.nick + "\n"); //ispis na klijentu
              broadcast(socket.nick + " se pridruzio\n", socket.name); //ispis na svim ostalim klijentima, osim ovog upravo konektovanog
          }

          socket.ima=true;
      }
      else {
         // console.log('poslano '+data);
          broadcast(socket.nick + ": " + data+"\n", socket.name);
          //ima=false;
      }
      // ispis poruke ostalim korisnicima
    });



        socket.on('end', () => {
        console.log('client disconnected\n');
        klijenti.splice(klijenti.indexOf(socket), 1);
        broadcast(socket.nick + " left the chat.\n",socket);

    });

 /*   socket.on('connection', function (sockets)
    {
        var hs = sockets.handshake;
        if(hs.session)
        {
            if(hs.session.username)
            {

                clients[sockets.id] = sockets; // add the client data to the hash
                validUsers[hs.session.username] = sockets.id; // connected user with its socket.id
            }
        }
        console.log("nesto");
        clients[validUsers[username]].emit('move-story', data);
    });*/



}).on('error', (err) => {
    // handle errors here
    /* if (err.code === 'EADDRINUSE') {
     console.log('Address in use, retrying...');
     setTimeout(() => {
     server.close();
     server.listen(PORT);
     }, 1000);
     }*/
    throw err;
}).on('connection',(socket)=>{
    //sta se desi ukoliko pokusamo da se konektujemo na stranicu, preko browsera,localhost:port
    console.log('Pokusaj konekcije');
});
function nickovi(us){
    name.forEach(function (client) {
        if (client ===us) return true;
        else return false;
    });

}
function broadcast(message, sender) {
    klijenti.forEach(function (socket, index, array) {
        console.log("uporedba:"+sender+socket.nick+socket.name+"\n");
        // Don't want to send it to sender
        if (socket.name === sender) return;
        //if (client.name!==sender)
            socket.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
};


// grab an arbitrary unused port.
server.listen({
    port: PORT

},(socket) => {

    console.log('opened server on', server.address());


});

//svako 4 sekunde ispis vremena
/*setInterval(function(){
 var d=new Date();
 client.emit('vrijeme, sa servera', d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
 }, 4000);*/
/*setInterval(function(){
 var d=new Date();
 client.emit('vrijeme, sa servera', d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
 }, 4000);*/