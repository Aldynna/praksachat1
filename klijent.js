const net = require('net');
const readline = require('readline');
var stdin = process.openStdin();
//rl.setPrompt('');
const readline1 = require('readline');


var PORT = 8030;
const readline2 = require('readline');

var r2 = readline2.createInterface({
    input: process.stdin,
    output: process.stdout
});

konekcija();
 function  konektujse(answer) {


const client = net.createConnection({ port: PORT }, () => {
//const client = net.createConnection({ port: 80, host:'pmf.unsa.ba' }, () => {
    //'connect' listener
    console.log('Konekcija client!');
    //konekcija();
    client.write(answer);
    // client.write('Klijent!\r\n');


});
     client.on('login', function(data){
         console.log('vrijeme:'+data);
     });
client.on('data', (data) => {
    console.log(data.toString());
//r2.close();
   /* const r1 = readline1.createInterface({
        input: process.stdin,
        output: process.stdout
    })*/

   r2.on('line', function(line) {
        line = line.trim();
       if(line.toString() === 'exit') {
           client.end();
       }
       else
       {
           //readline.clearLine(process.stdout, 0)
           r2.clearLine(process.stdout, 0)
           r2.close();// OVOOOOOO dva puta sallje serveru

        client.write(line);}
       // rl.question('me ----> ', (answer) => {
           // client.write(answer);
         //   r1.close();
       // });
    });
    //r1.close();
   // r2.prompt();*/
   //chat();


});
/*client.on('message', function(data){
 console.log('message:'+data);
 });*/
client.on('end', () => {
    console.log('disconnected from server');
});
client.on('close', function() {
    console.log('Connection closed');
});

client.on('error', (err) => {
    // handle errors here
    throw err;})

client.on('vrijeme, sa servera', function(data){
    console.log('vrijeme:'+data);
});
 }

 function  chat() {
//client.write('nesto');
    /* stdin.addListener("data", function(d) {
         if (d.toString().trim() == 'exit') {
             console.log('sad prekini sve');
             client.destroy();
         }
         client.write(d.toString().trim() + '\n');
     });
   /*  const readline1= require('readline');

     const r1 = readline1.createInterface({
         input: process.stdin,
         output: process.stdout
     });


     r1.question('me--> ', (answer) => {
         // TODO: Log the answer in a database
         // if (answer!='')

         {
             console.log(`Saljemo: ${answer}`);
            // konektujse(answer);
             client.write(answer);

         }
         r1.close();
     });*/

 }

function konekcija() {

    //  var refreshIntervalId =setInterval(function() {
   /* const readline2 = require('readline');

    const r2 = readline2.createInterface({
        input: process.stdin,
        output: process.stdout
    });*/


    r2.question('Ime? ', (answer) => {
        // TODO: Log the answer in a database
        if (answer == 'exit') {
            console.log('sad prekini sve');
           // clearInterval(refreshIntervalId);

        } else if (answer!='')

        {
            console.log(`Saljemo: ${answer}`);
           // r2.close();
            konektujse(answer);
            //client.write(answer);

        }

    });
    // },9000);



}