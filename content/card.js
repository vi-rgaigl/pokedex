function generatePokemonInfoBodyHTML() {
    return /*html */ `
        <div class="w3-row">
            <a href="#" onclick="openInfoSection('1', 'about');">
                <div id="tab_1" class="w3-quarter tablink w3-bottombar w3-hover-light-grey w3-padding">About</div>
            </a>
            <a href="javascript:void(0)" onclick="openInfoSection('2', 'states');">
                <div id="tab_2" class="w3-quarter tablink w3-bottombar w3-hover-light-grey w3-padding">States</div>
            </a>
            <a href="javascript:void(0)" onclick="openInfoSection('3', 'evolution');">
                <div id="tab_3" class="w3-quarter tablink w3-bottombar w3-hover-light-grey w3-padding">Evolution</div>
            </a>
            <a href="javascript:void(0)" onclick="openInfoSection('4', 'moves');">
                <div id="tab_4" class="w3-quarter tablink w3-bottombar w3-hover-light-grey w3-padding">Moves</div>
            </a>
        </div>
              
        <div id="about" class="w3-container info" style="display:none">
            <div id="about_container" class="about-container div-margin"></div>
        </div>
        <div id="states" class="w3-container info" style="display:none">
        <div id="states_container" class="states-container div-margin"></div>
        </div>
        <div id="evolution" class="w3-container info" style="display:none">
        <div id="evolution_container" class="evolution-container div-margin"></div>
        </div>
        <div id="moves" class="w3-container info" style="display:none">
        <div id="moves_container" class="moves-container div-margin"></div>
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



function generateStatestHTML(currentPokemon) {

}
function generateEvolutionHTML(currentPokemon) {

}
function generateMovesHTML(currentPokemon) {

}