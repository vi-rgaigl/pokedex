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
                <td>Height</td>
                <td>${currentPokemon['height']}</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>${currentPokemon['weight']}</td>
            </tr>
            <tr>
                <td>Abilities</td>
                <td>${getAbilities()}</td>
            </tr>
            <tr>
                <td>Types</td>
                <td>${getTypes()}</td>
            </tr>
        </table>
    `;
}

function getAbilities() {
    let abilities = currentPokemon['abilities'];
    let result = '';
    for (let i = 0; i < abilities.length; i++) {
        const ability = abilities[i];
        result += capitalizeFirstLetter(ability['ability']['name']);
        if(i < abilities.length-1) {
            result += ', ';
        }
    }
    return result;
}

function getTypes() {
    let types = currentPokemon['types'];
    let result = '<div>';
    for (let i = 0; i < types.length; i++) {
        const type= types[i];
        result += capitalizeFirstLetter(type['type']['name']) + '</div>';
    }
    return result;
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
    for(let i = 0; i < stats.length; i++) {
        const stat = stats[i];
        result += '<tr><td>' + stat['stat']['name'] + '</td><td>' + stat['base_stat'] + '</td></tr>';
    }
    return result;
}

function generateMovesHTML() {
    return /*html */ `
        ${getMoves()}
    `;
}

function getMoves() {
    let moves = currentPokemon['moves'];
    let result = '';
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        result += capitalizeFirstLetter(move['move']['name']);
        if(i < moves.length-1) {
            result += ', ';
        }
    }
    return result;
}