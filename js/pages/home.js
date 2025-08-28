export function homePage() {
    const main = document.querySelector("main");

    main.innerHTML = `
        <section class="home-container">
        <div class="home-hero">
            <img class="logo" src="./assets/pokeball-icon.png" alt="Pokeball Logo" />
            <h1>Bienvenido a la Pokédex</h1>
            <p>
            Explora el mundo de los Pokémon con esta aplicación interactiva.
            Busca, filtra y conoce más sobre tus Pokémon favoritos gracias a la 
            <a href="https://pokeapi.co/" target="_blank">PokeAPI</a>.
            </p>
            <div class="home-buttons">
            <a href="#cards" class="btn">Ver Pokemones</a>
            <a href="#about" class="btn btn-secondary">Acerca de</a>
            </div>
        </div>
        </section>
    `;
}