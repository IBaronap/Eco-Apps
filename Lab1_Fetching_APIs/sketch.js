//Canvas

let canvas;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function draw() {
    background(0, 50);
    newCursor();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}

//Onclick Events

document.getElementById("User").onclick = user;
document.getElementById("Bitcoin").onclick = bitcoin;
document.getElementById("US").onclick = uspopulation;
document.getElementById("Dog").onclick = dog;
document.getElementById("Cat").onclick = cat;

//Fetch

let data;

async function getData(URL){
    const response = await fetch(URL);
    data = await response.json();
    console.log(data);
    render(URL);
}

function user(){
    getData("https://randomuser.me/api/");
    render();
}

function bitcoin(){
    getData("https://api.coindesk.com/v1/bpi/currentprice.json");
    render();
}

function uspopulation(){
    getData("https://datausa.io/api/data?drilldowns=Nation&measures=Population");
    render();
}

function cat(){
    getData("https://catfact.ninja/fact");
    render();
}

function dog(){
    getData("https://dog.ceo/api/breeds/image/random");
    render();
}

//Render results

function render(URL) {
    document.getElementById("display").innerHTML = '';
    const answer = document.createElement('div');
    if(URL == "https://randomuser.me/api/"){
        answer.innerHTML = `<h3>Here's a random user</h3> <br> <div class="RandomUser"> <img class="UserPic" src="${data.results[0].picture.large}"> <section class="UserInfo"> <p>Name: ${data.results[0].name.first} ${data.results[0].name.last}</p> <p>Gender: ${data.results[0].gender}</p> <p>Age: ${data.results[0].dob.age}</p> <p>Location: ${data.results[0].location.city}, ${data.results[0].location.country}</p> <p>Email: ${data.results[0].email}</p> <p>Username: ${data.results[0].login.username}</p> <p>Password: ${data.results[0].login.password}</p> </section> </div>`;
    }
    if(URL == "https://api.coindesk.com/v1/bpi/currentprice.json"){
        answer.innerHTML = `<h3>Here's bitcoin's current price</h3> <br> <p>${data.bpi.USD.code}: ${data.bpi.USD.symbol} ${data.bpi.USD.rate}</p> <p>${data.bpi.EUR.code}: ${data.bpi.EUR.symbol} ${data.bpi.EUR.rate}</p> <br> <p>Last updated: ${data.time.updated}</p> <p class="SmallText">${data.disclaimer}</p>`;
    }
    if(URL == "https://datausa.io/api/data?drilldowns=Nation&measures=Population"){
        answer.innerHTML = `<h3>Here's the US population per year</h3> <br> <p>${data.data[0].Year}: ${data.data[0].Population}</p> <p>${data.data[1].Year}: ${data.data[1].Population}</p> <p>${data.data[2].Year}: ${data.data[2].Population}</p> <p>${data.data[3].Year}: ${data.data[3].Population}</p> <p>${data.data[4].Year}: ${data.data[4].Population}</p> <br> <p class="SmallText">${data.source[0].annotations.dataset_link}</p>`;
    }
    if(URL == "https://catfact.ninja/fact"){
        answer.innerHTML = `<h3>Here's a random cat fact</h3> <br> <p>${data.fact}</p> <p>&#128049;</p>`;
    }
    if(URL == "https://dog.ceo/api/breeds/image/random"){
        answer.innerHTML = `<h3>Here's a random dog image</h3> <p class="SmallText">This might take a little while</p> <br> <img src="${data.message}">`;
    }
    document.getElementById("display").appendChild(answer);
}
