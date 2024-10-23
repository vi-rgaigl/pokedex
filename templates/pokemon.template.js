function generatePokedexIndexHTML() {
    return /*html*/ `
        <header>
            <div class="header">
                <img src="./assets/img/pokedex_logo.png" alt="">
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