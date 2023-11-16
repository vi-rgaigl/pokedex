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
            <p>xxx</p>
        </div>
        <div id="states" class="w3-container info" style="display:none">
            <p>yyy</p> 
        </div>
        <div id="evolution" class="w3-container info" style="display:none">
            <p>zzz</p>
        </div>
        <div id="moves" class="w3-container info" style="display:none">
            <p>aaa</p>
        </div>
    `;
}