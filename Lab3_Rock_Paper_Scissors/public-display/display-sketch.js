let canvas;
let time = 0;
let counter = 10;
let players = [];

console.log('Server DNS: ',getDNS);
const DNS = getDNS;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function draw() {
    background(255, 50);
    fill(0);
    ellipse(pmouseX, pmouseY, 50, 50);
    textSize(40);
    for (let i = 0; i < players.length; i++) {
        textSize(20);
        text(players[i][0].name + " chose " + players[i][0].move, windowWidth/2 - 50, 150 + (i * 100));
        text(players[i][1].name + " chose " + players[i][1].move, windowWidth/2 - 50, 180 + (i * 100));
    }

    time++;
    if (time % 60 == 0) {
        counter--;
    }
    textSize(20);
    text('Rock, paper, scissors: ' + counter, windowWidth/2 - 110, 50);
    if (time > (60 * 10)) {
        console.log('update');
        time = 0;
        counter = 10;
        updateMoves();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

//---------------------------------------- async fetch functions
let data;

async function updateMoves() {
    const UpdatedMoves = await fetch(`${DNS}/moves`);
    data = await UpdatedMoves.json();
    players.push(data);
    console.log(players);
}
