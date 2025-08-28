export function createNavbar() {
    const nav = document.createElement("nav");
    nav.classList.add("navbar", "hidden"); // inicia oculto

    nav.innerHTML = `
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#cards">Cards</a></li>
            <li><a href="#pokedex">Pokedex</a></li>
            <li><a href="#about">About</a></li>
        </ul>
    `;

    return nav;
}