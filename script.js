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

