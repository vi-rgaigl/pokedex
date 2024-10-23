function toggleDiv(id) {
    document.getElementById(id).classList.toggle('d-none');
}

async function getBackgroundColor() {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${currentPokemon['species']['name']}`;
    let response = await fetch(url);
    let species = await response.json();
    return species['color']['name'];
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

function formatHeight(height) {
    return height / 10;
}

function formatWeight(weight) {
    return weight / 10;
}