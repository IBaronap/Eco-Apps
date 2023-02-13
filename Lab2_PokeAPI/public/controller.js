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
    background(50, 50);
    newCursor();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255, 0, 0);
    ellipse(pmouseX, pmouseY, 10, 10);
}

//Fetch
let pokemon_id;

async function getData (pokemon_id){
    const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`)
    data = await res.json();
    console.log(data);
    render();
}

//Onclick events

document.getElementById("Bulbasaur").addEventListener('click', function(){
    pokemon_id = 1;
    getData(pokemon_id);
});

document.getElementById("Charmander").addEventListener('click', function(){
    pokemon_id = 4;
    getData(pokemon_id);
});

document.getElementById("Squirtle").addEventListener('click', function(){
    pokemon_id = 7;
    getData(pokemon_id);
});

document.getElementById("Pikachu").addEventListener('click', function(){
    pokemon_id = 25;
    getData(pokemon_id);
});

//Render

function render(){
    document.getElementById('PokemonResults').innerHTML = ``;
    const PokeData = document.createElement('div');
    PokeData.innerHTML = `  <img alt="No gif found" src="${data.sprites.versions["generation-v"]["black-white"].animated.front_default}">
                            <div id="PokemonData">
                                <p class="SmallText">No° ${data.id}</p>
                                <h3>${data.name}</h3>
                                <p id="Type">${data.types[0].type.name}</p>
                                <div id="BasicInfo">
                                    <div>
                                        <h4>Height</h4>
                                        <p>${data.height}0 cm</p>
                                    </div>
                                    <div>
                                        <h4>Weight</h4>
                                        <p>${data.weight}00 g</p>
                                    </div>
                                    <div>
                                        <h4>Base Exp</h4>
                                        <p>${data.base_experience}</p>
                                    </div>
                                </div>
                                <div>
                                    <button onclick="Devolve()" id="Devolve">Devolve</button>
                                    <button onclick="Evolve()" id="Evolve">Evolve</button>
                                </div>
                            </div>
                        `;
    document.getElementById('PokemonResults').appendChild(PokeData);

    changeColor();
}

    //Color based on type

    function changeColor(){
        if(data.types[0].type.name == "grass"){
            document.getElementById("Type").className = "Grass";
        }
        if(data.types[0].type.name == "fire"){
            document.getElementById("Type").className = "Fire";
        }
        if(data.types[0].type.name == "water"){
            document.getElementById("Type").className = "Water";
        }
        if(data.types[0].type.name == "electric"){
            document.getElementById("Type").className = "Electric";
        }
    }

    //Evolve & Devolve
    
    function Evolve(){
        if(pokemon_id == 1 || pokemon_id == 2 || pokemon_id == 4 || pokemon_id == 5 || pokemon_id == 7 || pokemon_id == 8 || pokemon_id == 25 ){
            getData(++pokemon_id);
        }
        else if(pokemon_id == 172){
            getData(25);
        }
    }

    function Devolve(){
        if(pokemon_id == 2 || pokemon_id == 3 || pokemon_id == 5 || pokemon_id == 6 || pokemon_id == 8 || pokemon_id == 9 || pokemon_id == 26){
            getData(--pokemon_id);
        }
        else if(pokemon_id == 25){
            getData(172);
        }
    }