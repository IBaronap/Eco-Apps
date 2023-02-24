const express = require('express');
const os = require('os')
const cors = require('cors');
const serverApp = express();
const PORT = 5050;
// const IPaddress = os.networkInterfaces()["Ethernet"][1].address; // Si la conexión es Ethernet
const IPaddress = os.networkInterfaces()["Wi-Fi"][1].address; // Si la conexión es Wi-Fi

// Con en0 sale el error "TypeError: Cannot read properties of undefined (reading '1')"
//const IPaddress = os.networkInterfaces().en0[1].address;
// El error desaparece al cambiarlo a ["Wi-Fi"] o ["Ethernet"] (según la conexión), se uso Stringify para poder encontrar la ruta
// const IP = JSON.stringify(IPaddress);
// console.log(IP);

//---------------------------- Setting EJS
serverApp.set('view engine', 'ejs');

//---------------------------- "use" external midleware
serverApp.use(express.json());
serverApp.use(cors({
    origin: '*'
}));

//---------------------------- Server listening
serverApp.listen(PORT, (error) => {
    console.log(`http://${IPaddress}:${PORT}`);
});

//---------------------------- First serve Static resources
serverApp.use('/player', express.static('public-player'));
serverApp.use('/display', express.static('public-display'));

//---------------------------- Dinamic files
serverApp.get('/player', (request, response) => {
    response.render('player', { DNS: `http://${IPaddress}:${PORT}` });
});


serverApp.get('/display', (request, response) => {
    response.render('display', { DNS: `http://${IPaddress}:${PORT}` }); 
});


//---------------------------- Data base
let players = [];
// player structure =  {name: ‘’, move: ‘’}

//---------------------------- API Endpoints

serverApp.get('/moves', (request, response) => {
    response.send(players);
});

serverApp.post('/player', (request, response) => {  
    const {name, move} = request.body; 
    addOrUpdatePlayer(name, move);
    response.json({ received: request.body });
});

serverApp.post('/make-a-move', (request, response) => {
    const {name, move} = request.body;
    addOrUpdatePlayer(name, move);
    response.json({ received: request.body });
});


function addOrUpdatePlayer(name, move) {
    let playerIndex = players.findIndex(player => player.name === name);// Check if player is already in the array

    if (playerIndex === -1) {
       if(players.length < 2){  //Array has a length of 2, if it's already full, it doesn't push
        players.push({name: name, move: move});
       }
    } else {
        players[playerIndex].move = move;// If player is already in the array, update their move
    }
    console.log(players);
  }
  