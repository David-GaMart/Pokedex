
window.onload = function() {
    getPokemons(150);
};

let pokemonArray = [];
let pokemonDescription = [];
let pokemonData = [];
let pokemonDataDes = [];


const getPokemons = async (limit) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
        const urlSp = `https://pokeapi.co/api/v2/pokemon-species?limit=${limit}`;
        const response = await axios.get(url);
        const infoPokemons = response.data.results;
        const responseSp = await axios.get(urlSp);
        const infoPokemonsSp = responseSp.data.results;

        const allPokemons = await Promise.all(infoPokemons.map(async (pokemon) => {
            const moreInfoPokemon = await axios.get(pokemon.url);
            const data = moreInfoPokemon.data;
            pokemonData.push(data);
            return {
                nombre: pokemon.name,
                tipos: data.types.map((tipo) => tipo.type.name),
                urlImage: data.sprites.front_default,
                habilidades: data.abilities.map((habilidad) => habilidad.ability.name)
            };
        }));
        pokemonArray = allPokemons;

        const textPokemons = await Promise.all(infoPokemonsSp.map(async (pokemon) => {
            const moreInfoPokemonSp = await axios.get(pokemon.url);
            const data = moreInfoPokemonSp.data;
            pokemonDataDes.push(data);
            return {
                descripcion: data.flavor_text_entries.map(desc => ({
                    descriptionText: desc.flavor_text,
                    language: desc.language.name
                })),
                nombre: data.name
            };
        }));
        pokemonDescription = textPokemons;
    } catch (error) {
        console.error("Error al obtener los pokémones:", error);
    }
};

document.getElementById("name").addEventListener("input", (e) => {
    const pokemonName = e.target.value.toLowerCase();
    console.log(pokemonName);
    
    const results = pokemonArray
    .filter(p => p.nombre && p.nombre.toLowerCase().includes(pokemonName))
    .map(p => ({
        pN: p.nombre,
        tipos: p.tipos,
        urlImage: p.urlImage
    }));
    console.log(results);
    
    createOptions(results);
});

const createOptions = (name) => {
    const pokemonOptions = document.getElementById('pokemonSelection');
    pokemonOptions.innerHTML = "";

    name.forEach((pokemon) => {
        const option = document.createElement('option');
        const title = document.createElement('p');

        title.innerText = pokemon.pN;
        
        option.classList.add('option');
        // option.value.add(name.length);
        option.appendChild(title);

        pokemonOptions.appendChild(option);
    });
};


// Entrada de seleccion de pokemons

const input = document.getElementById("name");
const suggestions = document.getElementById("pokemonSelection");

let activeIndex = -1;

input.addEventListener("input", () => {
    const text = input.value.toLowerCase();
    suggestions.innerHTML = "";
    activeIndex = -1;
    if (text === "") return;

    const optionResult = pokemonArray
    .filter(p => p.nombre && p.nombre.toLowerCase().includes(text));

    optionResult.forEach((pN, i) => {
        const option = document.createElement("div");
        option.textContent = pN.nombre;
        option.tabIndex = 0;

        option.addEventListener("click", () => {
        input.value = pN.nombre;
        suggestions.innerHTML = "";
        });

    suggestions.appendChild(option);
    });
});

// Navegación con teclado
input.addEventListener("keydown", (e) => {
    const items = suggestions.querySelectorAll("div");
    if (items.length === 0) return;

    if (e.key === "ArrowDown") {
        activeIndex = (activeIndex + 1) % items.length;
        updateSelection(items);
        e.preventDefault();
    } else if (e.key === "ArrowUp") {
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateSelection(items);
        e.preventDefault();
    } else if (e.key === "Enter") {
        if (activeIndex >= 0) {
            input.value = items[activeIndex].textContent;
            suggestions.innerHTML = "";
            activeIndex = -1;
        }
    }
});

function updateSelection(items) {
    items.forEach((item, i) => {
        if (i === activeIndex) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

// Busqueda e impresion de informacion espesifica

const buttonStart = document.getElementById("search")
.addEventListener("click", (e) => {
    const screen = document.getElementById("screen");
    screen.innerHTML = "";
    let inputName = document.getElementById("name").value;
    let pokemonNumber = 0;
    let description = [];

    const sScreen = document.createElement('div')
    const outputName = document.createElement('h1');
    const pokemonPic = document.createElement('img');
    const pokemonDes = document.createElement('p');
    const pokemonType = document.createElement('div');
    const pokemonSkills = document.createElement('div');

    // Selecion del pokemon
    for (let i = 0; i < pokemonDescription.length; i++) {
        if (inputName.toLowerCase() === pokemonDescription[i].nombre.toLowerCase()) {
            let name = pokemonDescription[i].nombre;
            let imgpk = pokemonArray[i].urlImage
            
            // Nombre del pokemon

            outputName.innerText = name;

            // Imagen del pokemon

            pokemonPic.src = imgpk;
            pokemonPic.alt = name

            // Seleccion e impresion de la descripcion
            for (let j = 0; j < pokemonDescription[i].descripcion.length; j++) {
                if (pokemonDescription[i].descripcion[j].language === "es") {
                    description.push(pokemonDescription[i].descripcion[j].descriptionText);
                    activeDescription = description[3] || description[0];

                    const withoutSpace = activeDescription.replace(/[\n\r\t\f]/g, " ");
                    pokemonDes.innerText = withoutSpace;
                    console.log(withoutSpace);
                    break;

                }
            }

            // Impresion de tipo

            pokemonArray[i].tipos.forEach(type => {
                const typeBlock = document.createElement('p')
                typeBlock.innerText = type;
                typeBlock.classList.add('typeBlock');
                pokemonType.appendChild(typeBlock);
            });
            // Impresion de Habilidades

            pokemonArray[i].habilidades.forEach(ability => {
                const abilityBlock = document.createElement('p')
                abilityBlock.innerText = ability;
                abilityBlock.classList.add('abilityBlock');
                pokemonSkills.appendChild(abilityBlock);
            });
        }

    }

    
    outputName.classList.add('outputName');
    pokemonPic.classList.add('pokemonPic');
    pokemonDes.classList.add('pokemonDes');
    pokemonType.classList.add('pokemonType');
    pokemonSkills.classList.add('pokemonSkills');
    sScreen.classList.add('screenContainer');

    sScreen.appendChild(outputName);
    sScreen.appendChild(pokemonPic);
    sScreen.appendChild(pokemonDes);
    sScreen.appendChild(pokemonType);
    sScreen.appendChild(pokemonSkills);
    screen.appendChild(sScreen);

    // Modificacion de color segun el tipo
    const tipos = document.querySelectorAll('.typeBlock');

    tipos.forEach(p => {
    const text = p.textContent.trim().toLowerCase();
    console.log(text);
    p.classList.add(`${text}`);
});

})


