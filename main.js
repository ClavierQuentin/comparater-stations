import formPage from "./src/pages/form.js";
import homePage from "./src/pages/home.js";
import loginPage from "./src/pages/loginPage.js";

import { parseRequestUrl } from "./utils.js";
import registerPage from "./src/pages/registerPage.js";
import favorisPage from "./src/pages/favorisPage.js";
import profilPage from "./src/pages/profile.js";

const routes = {
    "/" : homePage,
    "/form" : formPage,
    "/login": loginPage,
    "/register": registerPage,
    "/favoris": favorisPage,
    "/profil": profilPage
}

const router = () => {
    const request = parseRequestUrl();
    const parseUrl = (request.page? `/${request.page}` : '/') + (request.destination? `/${request.destination}` : "") + (request.id? `/id` : "");
    const screen = routes[parseUrl]? routes[parseUrl] : "";
    screen.generate();
}

window.addEventListener('load', () =>{
    router();
});
window.addEventListener('hashchange', () =>{
    router();
});