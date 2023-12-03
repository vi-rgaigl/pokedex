let currentPokemon;
let pokemons;

// Pokedex Homepage
async function init() {
    await loadPokedexIndex();
}

async function loadPokedexIndex() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
    let resopnse = await fetch(url);
    json = await resopnse.json();
    pokemons = json['results'];
    document.getElementById('body').innerHTML = generatePokedexIndexHTML();
    renderPokedexHome(pokemons);
    renderPokedexIndexImages(pokemons);
}

function renderPokedexHome(array) {
    let container = document.getElementById('pokedex_body');
    container.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const pokemon = array[i];
        container.innerHTML += generatePokemonItemHTML(pokemon);
    }
}

function renderPokedexIndexImages(array) {
    for (let i = 0; i < array.length; i++) {
        const pokemon = array[i];
        const container = document.getElementById(`pokedex_image_${pokemon['name']}`);
        container.innerHTML = loadPokedexImage(container, pokemon['name']);
    }
}

async function loadPokedexImage(container, pokemonName) {
    let pokemon = await getPokedexImage(pokemonName);
    container.innerHTML = `<img src="${pokemon['sprites']['other']['home']['front_default']}">`;
}

async function getPokedexImage(pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let response = await fetch(url);
    let pokemon = response.json();
    return pokemon;
}

function search() {
    let search = document.getElementById('search').value;
    let iArray = [];
    const result = pokemons.filter((pokemon) => pokemon['name'].toLowerCase().includes(search.toLowerCase()));   
    if(!result) {} else {
        for (let i = 0; i < result.length; i++) {
            iArray[i] = pokemons.indexOf(result[i]);
        }  
    }
    renderPokedexHome(result, iArray);
    renderPokedexIndexImages(result, iArray);                                 
} 


function generatePokedexIndexHTML() {
    return /*html*/ `
        <header>
            <div class="header">
                <img src="./img/pokedex_logo.png" alt="">
            </div>
            <div><input onkeyup="search()" type="search" id="search" name="q" placeholder="Suche"></div>   
        </header>
        <div id="pokedex_body" class="pokedex-body"></div>
    `;
}

function generatePokemonItemHTML(pokemon) {
    return /*html */ `
    <div id="pokedex_item" class="pokedex-item" onclick="loadPokemon('${pokemon['name']}')"> 
        <div id="pokedex_image_${pokemon['name']}" class="pokedex-image">
        </div>
        <div class="pokedex-info">
            <div class="pokedex-name">${capitalizeFirstLetter(pokemon['name'])}</div>
        </div>
    </div>
    </div>
    `;
}


// Pokemon Cards
async function loadPokemon(pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let resopnse = await fetch(url);
    currentPokemon = await resopnse.json();
    console.log(await getBackgroundColor());
    let backgroundColor = await getBackgroundColor();
    document.getElementById('body').innerHTML = generatePokemonBodyHTML(backgroundColor);
    renderPokemonCard();
}

function renderPokemonCard() {
    document.getElementById('pokemon_name').innerHTML = capitalizeFirstLetter(currentPokemon['name']);
    document.getElementById('pokemon_image').src = currentPokemon['sprites']['other']['home']['front_default'];
    document.getElementById('pokemon_id').innerHTML = formatId(currentPokemon['id']);
    document.getElementById('info_content').innerHTML = generatePokemonInfoBodyHTML();
    openInfoSection('1', 'about');
}

async function getBackgroundColor() {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${currentPokemon['species']['name']}`;
    let response = await fetch(url);
    let species = await response.json();
    return species['color']['name'];
}

function generatePokemonBodyHTML(backgroundColor) {
    return /*html */ `
        <div id="pokedex" style="background-color: ${backgroundColor}"> 
            <div class="nav-bar">
                <button onclick="init()">back</button>
            </div>
            <div class="pokedex-text div-width">
                <h1 id="pokemon_name"></h1>
                <span id="pokemon_id" class="pokemon-id"></span>
            </div> 
        </div>
        <div class="info-container">
            <img id="pokemon_image">
            <div id="info_content" class="info-content div-width"></div>
        </div>
    `;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}




