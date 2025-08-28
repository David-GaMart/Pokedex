export function pokecardsPage(){

    const main = document.querySelector("main");
        main.innerHTML = `
        <section id="headerMain">
            <h1>
                Bibloteca de Pokemons
            </h1>
            <div>
                <input type="text" id="searching" placeholder="Busca tu pokemon... ">
            </div>
        </section>
        <section id="pokemonContainer">
        </section>
    `;

    let pokemonArray = [];

    const getPokemons = async (limit) => {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
            const response = await axios.get(url);
            const infoPokemons = response.data.results;

            const allPokemons = await Promise.all(infoPokemons.map(async (pokemon) => {
                const moreInfoPokemon = await axios.get(pokemon.url);
                const data = moreInfoPokemon.data;

                pokemonArray.push(data);

                return {
                    nombre: pokemon.name,
                    tipos: data.types.map((tipo) => tipo.type.name),
                    urlImage: data.sprites.front_default
                };
            }));
            createCards(allPokemons);
        } catch (error) {
            console.error("Error al obtener los pokémones:", error);
        }
    };

    getPokemons(150);

    document.getElementById("searching").addEventListener("input", (e) => {
        const pokemonName = e.target.value.toLowerCase();

        const results = pokemonArray
        .filter(p => p.name && p.name.toLowerCase().includes(pokemonName))
        .map(p => ({
            nombre: p.name,
            tipos: p.types.map(t => t.type.name),
            urlImage: p.sprites.front_default
        }));
        createCards(results);
    });

    const createCards = (pokemons) => {
        const pokemonContainer = document.getElementById('pokemonContainer');
        pokemonContainer.innerHTML = "";

        pokemons.forEach((pokemon) => {
            const card = document.createElement('div');
            const title = document.createElement('p');
            const image = document.createElement('img');

            title.innerText = pokemon.nombre;
            image.src = pokemon.urlImage || './assets/default.png';
            image.alt = pokemon.nombre;

            card.classList.add('card');
            card.appendChild(image);
            card.appendChild(title);

            card.addEventListener("click", (box) =>{
                screenSection();
            })

            pokemonContainer.appendChild(card);
        });
    };

    const screenSection = (e) =>{
        
    const screen = document.createElement('section');
    screen.classList.add('screen');
    document.body.appendChild(screen);

    };

}