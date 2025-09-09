import { createNavbar } from "./navbar.js";

export function createHeader() {
    const header = document.createElement("div");
    // header.classList.add("header");

    header.innerHTML = `
        <img class="logo" src="./assets/pokebolas.png" alt="pokeLogo">
        <img src="./assets/PokedexFont.png" alt="PokedexFont">
        <button id="menuBtn" class="image-hover"></button>
    `;
    
    // Creamos el navbar y lo añadimos debajo del header
    const navbar = createNavbar();
    header.appendChild(navbar);

    // Al hacer click en el botón, mostramos/ocultamos el navbar
    const button = header.querySelector("#menuBtn");
    button.addEventListener("click", () => {
        navbar.classList.toggle("hidden");
    });

// 👉 Cierra el navbar si haces click en el main
document.querySelector("main").addEventListener("click", () => {
    if (button.classList.contains("hidden")) {
        button.classList.remove("hidden");
    }
});

// 👉 Cierra el navbar si cambias de hash
window.addEventListener("hashchange", () => {
    if (button.classList.contains("hidden")) {
        button.classList.remove("hidden");
    }
});
    return header;
};