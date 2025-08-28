export function aboutPage() {
    const main = document.querySelector("main");

    main.innerHTML = `
        <section class="about-container">
        <h1>Acerca de esta Pokédex Web</h1>
        <p>
            Este proyecto es una aplicación web construida con <strong>HTML</strong>, <strong>CSS</strong> y <strong>JavaScript</strong>.
            Consume la <a href="https://pokeapi.co/" target="_blank" rel="noopener">PokeAPI</a> para mostrar
            dinámicamente información detallada de los Pokémon.
        </p>

        <h2>Desarrollo y estructura del proyecto</h2>
        <ul>
            <li>Usa una estructura organizada: carpetas para <em>assets</em>, estilos (<em>css</em>), lógica (<em>js</em>) y utilidades (<em>utils</em>)</li>
            <li>Interfaz responsiva y amigable que permite navegar y buscar Pokémon fácilmente</li>
            <li>Se enfoca en la manipulación del DOM para crear tarjetas, filtros y detalles de Pokémon</li>
        </ul>

        <h2>¿Qué puedes hacer?</h2>
        <ul>
            <li>Explorar Pokémon por su nombre o tipo</li>
            <li>Ver imágenes, tipos y estadísticas al estilo Pokedex</li>
            <li>Navegar sin recargar gracias a un router ligero (hash-based SPA)</li>
        </ul>

        <h2>Metodología & buenas prácticas</h2>
        <p>
            El código está separado por funcionalidades (separación de responsabilidades), facilitando su mantenimiento y escalabilidad.
            Se aprovechan técnicas como carga asíncrona (fetch/axios), renderizado dinámico y modularización.
        </p>

        <h2>Créditos</h2>
        <p>
            - Datos e imágenes obtenidos de la <a href="https://pokeapi.co/" target="_blank" rel="noopener">PokeAPI</a>.<br>
            - Repositorio original del proyecto: <a href="https://github.com/David-GaMart/Pokedex" target="_blank" rel="noopener">Pokedex en GitHub</a>
        </p>
        </section>
    `;
}