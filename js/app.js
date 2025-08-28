import { createHeader } from "./components/header.js";
import { router } from "./router.js";

const headerContainer = document.getElementById("header");
headerContainer.appendChild(createHeader());

router();

window.addEventListener("hashchange", router);