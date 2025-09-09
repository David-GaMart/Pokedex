export function cardAction (img, pokemons){

        const cardAction = document.querySelector("#secondScreen");
        cardAction.innerHTML = `
        <div class="cardInfo">
        <img src="${img}">
        <p>hola ${pokemons}</p>

        </div>
        `;

    // const cardAction = document.querySelector("#secondScreen");
    //     cardAction.innerHTML = `
    //     <div>
    //     <img scr="pokemons.name" id="pokemon.image">
    //     <div id="PokemonDescription"></div>
    //     </div>
    //     `;
}