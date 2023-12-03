function generatePokemonInfoBodyHTML() {
    return /*html */ `
        <div class="w3-row">
            <a href="#" onclick="openInfoSection('1', 'about');">
                <div id="tab_1" class="w3-quarter tablink w3-bottombar w3-hover-light-grey w3-padding">About</div>
            </a>
            <a href="javascript:void(0)" onclick="openInfoSection('2', 'stats');">
                <div id="tab_2" class="w3-quarter tablink w3-bottombar w3-hover-light-grey w3-padding">States</div>
            </a>
            <a href="javascript:void(0)" onclick="openInfoSection('3', 'moves');">
                <div id="tab_3" class="w3-quarter tablink w3-bottombar w3-hover-light-grey w3-padding">Moves</div>
            </a>
        </div>
              
        <div id="about" class="w3-container info" style="display:none">
            <div id="about_container" class="content-container div-margin"></div>
        </div>
        <div id="stats" class="w3-container info" style="display:none">
            <div id="stats_container" class="content-container div-margin"></div>
        </div>
        <div id="moves" class="w3-container info" style="display:none">
            <div id="moves_container" class="content-container div-margin"></div>
        </div>
    `;
}

function generateAboutHTML() {
    return /*html */ `
        <table>
            <tr>
                <td>Types</td>
                <td>${getTypes()}</td>
            </tr>
            <tr>
                <td>Height</td>
                <td>${formatHeight(currentPokemon['height']).toFixed(2)} cm</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>${formatWeight(currentPokemon['weight'])} kg</td>
            </tr>
            <tr>
                <td>Abilities</td>
                <td>${getAbilities()}</td>
            </tr>
        </table>
    `;
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

function formatHeight(height) {
    return height / 10;
}

function formatWeight(weight) {
    return weight / 10;
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

function generateStatstHTML() {
    return /*html */ `
        <table>
            ${getStats()}
        </table>
    `;
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

function generateStatsBar(number) {
    return /*html */ `
        <div class="table-cell">
            ${number}<div class="statsbar" style="width: ${number}%; background-color: ${setStatsBarColor(number)};"></div>
        </div>
    `;
}

function setStatsBarColor(number) {
    if (number < 50) {
        return 'red';
    } else {
        return '#70c927';
    }
}

function generateMovesHTML() {
    return /*html */ `
        ${getMoves()}
    `;
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