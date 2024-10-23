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

function generateStatstHTML() {
    return /*html */ `
        <table>
            ${getStats()}
        </table>
    `;
}


function generateStatsBar(number) {
    return /*html */ `
        <div class="table-cell">
            ${number}<div class="statsbar" style="width: ${number}%; background-color: ${setStatsBarColor(number)};"></div>
        </div>
    `;
}


function generateMovesHTML() {
    return /*html */ `
        ${getMoves()}
    `;
}