export function cardAction (img, pokemons){


    const getPokemons = async (name) => {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
            const response = await axios.get(url);

            console.log(response.data);
            

            const infoPokemons = response.data;

            console.log(infoPokemons);

            cardAction(infoPokemons);
        } catch (error) {
            console.error("Error al obtener los pokémones:", error);
        }
    };

    getPokemons(pokemons)

    const cardAction = (info) => {
        const secondCard = document.querySelector("#secondScreen");

        const moveNames = info.moves.slice(0, 10).map(m => m.move.name);
        const movesList = moveNames.map(name => `<li>${name}</li>`).join("");

        secondCard.innerHTML = `
        <div class="cardInfo">
        <img src="${img}" alt="${pokemons}">
        <p>${info.name}</p>
        
        <p>Habilidades: ${info.abilities.map(a => a.ability.name).join(", ")}</p>

        <h3>Movimientos:</h3>
        <ul>
            ${movesList}
        </ul>

        <p>Estadísticas: ${info.stats.map(t => `${t.stat.name}: ${t.base_stat}`).join(", ")} </p>

        <p>Tipo: ${info.types.map(t => t.type.name).join(", ")}</p>

        <p>Peso: ${info.weight} kilos</p>
        </div>
        `;

        console.log(info.abilities);
        console.log(info.moves);
        console.log(info.stats);
        console.log(info.stats[0].stat.name);
        console.log(info.stats[0].base_stat);
        console.log(info.types);
        console.log(info.weight);        
    }
}