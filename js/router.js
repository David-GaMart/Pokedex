import { homePage } from "./pages/home.js";
import { pokecardsPage } from "./pages/pokecards.js";
import { poketoolPage } from "./pages/poketool.js";
import { aboutPage } from "./pages/about.js";

export function router() {
    const main = document.querySelector("main");
    const hash = window.location.hash || "#home"; // si no hay hash, carga home

    main.innerHTML = ""; // limpiar contenido

    if (hash === "#home") {
        homePage();
    } else if (hash === "#cards") {
        pokecardsPage();
        // getPokemons(150);
    } else if (hash === "#pokedex") {
        poketoolPage()
    } else if (hash === "#about") {
        aboutPage()
    } else {
        main.innerHTML = "<h2>404</h2><p>Página no encontrada ❌</p>";
    }
}