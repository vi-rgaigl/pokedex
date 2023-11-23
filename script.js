let currentPokemon;
let pokemons;

async function init() {
    // await loadPokemon();
    await loadPokemonIndex();
}

async function loadPokemonIndex() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    let resopnse = await fetch(url);
    json = await resopnse.json();
    pokemons = json['results'];
    renderPokemonIndex();
}

function renderPokemonIndex() {  
    let container = document.getElementById('pokedex_body');
    console.log(pokemons);
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        container.innerHTML += generatePokemonItemHTML(pokemon);
    }
}

function generatePokemonItemHTML(pokemon) {
    return `
    <div id="pokemon_item" class="pokemon-item"> 
        <div class="pokemon-image">
           
        </div>
        <div class="pokemon-info">
            <div class="pokemon-name">${capitalizeFirstLetter(pokemon['name'])}</div>
        </div>
    </div>
    </div>
    `;
}
//onclick="loadPokemon('${pokemon['url']}')

async function loadPokemon(url) {
    // let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let resopnse = await fetch(url);
    currentPokemon = await resopnse.json();
    renderPokemonCard();
}

function renderPokemonCard() {
    document.getElementById('pokemon_name').innerHTML = capitalizeFirstLetter(currentPokemon['name']);
    document.getElementById('pokemon_image').src = currentPokemon['sprites']['other']['home']['front_default'];
    document.getElementById('pokemon_id').innerHTML = formatId(currentPokemon['id']);
    document.getElementById('info_content').innerHTML = generatePokemonInfoBodyHTML();
    openInfoSection('1', 'about');
}

function openInfoSection(tab, section) {
    let infoDivs = document.getElementsByClassName('info');
    for (let i = 0; i < infoDivs.length; i++) {
        infoDivs[i].style.display = 'none';
    }
    for (let i = 1; i <= 3; i++) {
        setBorderMarker(i, tab);
    }
    document.getElementById(section).style.display = 'block';
    document.getElementById(`${section}_container`).innerHTML = generateInfoContent(section); 
}

function generateInfoContent(section) {
    switch(section) {
        case 'about': return generateAboutHTML();
        break;
        case 'stats': return generateStatstHTML();
        break;
        case 'moves': return generateMovesHTML();
        break;
        default: return generateAboutHTML();
    }
}

function setBorderMarker(i, tab) {
    document.getElementById(`tab_${tab}`).classList.remove('w3-bottombar');
    document.getElementById(`tab_${tab}`).classList.add('border-marker');
    if (tab != i) {
        document.getElementById(`tab_${i}`).classList.add('w3-bottombar');
        document.getElementById(`tab_${i}`).classList.remove('border-marker');
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatId(id) {
    if (id < 10) {
        return '#00' + id;
    } else if (id < 100 && id > 10) {
        return '#0' + id;
    } else {
        return '#' + id;
    }
}


