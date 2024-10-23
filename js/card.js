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

async function getBackgroundColor() {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${currentPokemon['species']['name']}`;
    let response = await fetch(url);
    let species = await response.json();
    return species['color']['name'];
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

function getAbilities() {
    let abilities = currentPokemon['abilities'];
    let result = '<div class="ability-container">';
    for (let i = 0; i < abilities.length; i++) {
        const ability = abilities[i];
        result += '<div class="ability">' + capitalizeFirstLetter(ability['ability']['name']) + '</div>';
    }
    return result + '</div>';
}

function getTypes() {
    let types = currentPokemon['types'];
    let result = '<div class="ability-container">';
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        result += '<div class="type">' + capitalizeFirstLetter(type['type']['name']) + '</div>';
    }
    return result + '</div>';
}

function getStats() {
    let stats = currentPokemon['stats'];
    let result = '';
    for (let i = 0; i < stats.length; i++) {
        const stat = stats[i];
        result += '<tr><td>' + capitalizeFirstLetter(stat['stat']['name']) + '</td><td>' + generateStatsBar(stat['base_stat']) + '</td></tr>';
    }
    return result;
}

function setStatsBarColor(number) {
    if (number < 50) {
        return 'red';
    } else {
        return '#70c927';
    }
}

function getMoves() {
    let moves = currentPokemon['moves'];
    let result = '<div class="moves-container">';
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        result += '<div class ="moves">' + capitalizeFirstLetter(move['move']['name'])  + '</div>';
    }
    return result + '</div>';
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