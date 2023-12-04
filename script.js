let currentPokemon;
let currentPokedex;
let pokemons;
let limit = 20;
let offset;

// Pokedex Homepage
async function init() {
    offset = 0;
    await loadPokedexIndex(offset, limit);
    loadAllPokemons();
}

async function loadAllPokemons() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=800&offset=0`;
    let resopnse = await fetch(url);
    json = await resopnse.json();
    pokemons = json['results'];
}

async function loadPokedexIndex(offset, limit) {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let resopnse = await fetch(url);
    json = await resopnse.json();
    currentPokedex = json['results'];
    document.getElementById('body').innerHTML = generatePokedexIndexHTML();
    renderPokedexHome(currentPokedex);
    renderPokedexIndexImages(currentPokedex);
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

function loadPreviousPokedex() {
    offset -= limit;
    if (offset < 0) {
        offset = 0;
    }
    loadPokedexIndex(offset, limit);
}

function loadNextPokedex() {
    offset += limit;
    if (offset > pokemons.length - limit) { 
        offset = pokemons.length - limit;
    }
    loadPokedexIndex(offset, limit);
}


function search() {
    let search = document.getElementById('search').value;
    if (search.length == 0) {
        loadPokedexIndex(offset, limit);
    } else {
        let iArray = [];
        const result = pokemons.filter((pokemon) => pokemon['name'].toLowerCase().includes(search.toLowerCase()));
        if (!result) { } else {
            for (let i = 0; i < result.length; i++) {
                iArray[i] = pokemons.indexOf(result[i]);
            }
        }
        renderPokedexHome(result, iArray);
        renderPokedexIndexImages(result, iArray);
    }
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
        <footer>
            <div onclick="loadPreviousPokedex()" class="change-page">zurück</div>
            <div onclick="loadNextPokedex()" class="change-page">vorwärts</div>
        </footer>
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
async function loadPokemon(pokemonVariable) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonVariable}`;
    let resopnse = await fetch(url);
    currentPokemon = await resopnse.json();
    let backgroundColor = await getBackgroundColor();
    document.getElementById('body').innerHTML = generatePokemonBodyHTML(backgroundColor, currentPokemon['id']);
    renderPokemonCard();
}

function renderPokemonCard() {
    document.getElementById('pokemon_name').innerHTML = capitalizeFirstLetter(currentPokemon['name']);
    document.getElementById('pokemon_image').src = currentPokemon['sprites']['other']['home']['front_default'];
    document.getElementById('pokemon_id').innerHTML = formatId(currentPokemon['id']);
    document.getElementById('info_content').innerHTML = generatePokemonInfoBodyHTML();
    openInfoSection('1', 'about');
}

function nextPokemon() {
    let currentId = currentPokemon['id'];
    console.log(currentId);
    if (currentId >= pokemons.length) {
        toggleDiv('next_pokemon');
    } else {
        loadPokemon(currentId + 1);
    }  
}

function previousPokemon() {
    let currentId = currentPokemon['id'];
    console.log(currentId);
    if(currentId <= 1) {
        toggleDiv('previous_pokemon');
    } else {
        loadPokemon(currentId - 1);
    }
}

function toggleDiv(id) {
    document.getElementById(id).classList.toggle('d-none');
}

async function getBackgroundColor() {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${currentPokemon['species']['name']}`;
    let response = await fetch(url);
    let species = await response.json();
    return species['color']['name'];
}

function generatePokemonBodyHTML(backgroundColor, id) {
    return /*html */ `
        <div id="${id}" class="pokedex" style="background-color: ${backgroundColor}"> 
            <div class="nav-bar">
                <button onclick="loadPokedexIndex(offset, limit)">Home</button>
            </div>
            <div class="pokedex-text div-width">
                <h1 id="pokemon_name"></h1>
                <span id="pokemon_id" class="pokemon-id"></span>
            </div> 
        </div>
        <div class="info-container">
            <img id="pokemon_image">
            <div id="info_content" class="info-content div-width"></div>
            <div class="change-line">
                <div onclick="previousPokemon()" id="previous_pokemon" class="change-card">vorheriger<br> Pokemon</div>
                <div onclick="nextPokemon()" id="next_pokemon"  class="change-card">nächster<br> Pokemon</div>
            </div>
        </div>
        
    `;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}