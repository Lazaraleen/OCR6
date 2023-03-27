const gallery = document.querySelector(".gallery");
const divcat = document.querySelector(".divcat");
let dataFich;
let categorie = new Array();
const login = document.querySelector("#login");
const logout = document.querySelector("#logout");
const span = document.querySelectorAll("span");
const edition = document.querySelector(".edition");
let modal = null;
let currentCategory = 'Tous';
console.log(localStorage);

async function getWorks () {
    // vider la gallerie des différents travaux
    gallery.innerHTML= "";

    try {
        const response = await fetch("http://" + window.location.hostname + ":5678/api/works");
        data = await response.json();
        
        if (currentCategory == 'Tous') { 
            // Affiche tous les projets
            project(data);       

        } else {
            // Créer un fichier newData dans lequel on mettra les projets filtrés par catégories puis l'afficher
            const newData = data.filter(work => work.category.name === currentCategory);
            project(newData);
        }
        
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
}

getWorks();


// **************************************  CATEGORIES **************************************

// Créer un tableau pour les catégories
async function getCategories () {
    try {
        const response = await fetch("http://" + window.location.hostname + ":5678/api/categories");
        const categories = await response.json();
        categories.unshift({name: 'Tous'});
        buttonCat(categories);
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
}

// Si la personne n'est pas connectée, afficher les catégories
if (localStorage.token == "undefined" || localStorage.length == 0) { 
    getCategories(); 
}


// Créer un bouton pour les catégories
function buttonCat (cat) {
    for (let i of cat) {
        const button = document.createElement("button");
        button.setAttribute("id",i.name);
        button.innerText = i.name;
        divcat.appendChild(button);
        
        // filterWorks (button, cat);
        button.addEventListener("click", () => filterWorks(button));
    }
}

// Filtrer les catégories
function filterWorks (button) {
    console.log("début");
    const allfilter = [...divcat.children];
    console.log(allfilter);
    allfilter.forEach(element => {
        element.classList.remove('selected');
    });
    button.classList.add('selected');
    currentCategory = button.id;   
    getWorks ();     
} 


// **************************************  AFFICHER ET CREER LES TRAVAUX **************************************

// Afficher les projets pour les retirer du HTML
function project(key){
    for (let i of key) {
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const figcaptionElement = document.createElement("figcaption");
        imageElement.src = i.imageUrl;
        imageElement.alt = i.title;
        figcaptionElement.innerText = i.title;
    
        gallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
    }
}


// ************************************** LOGIN ET LOGOUT  **************************************

// Changer login pour logout
if (localStorage.token !== "undefined" && localStorage.length !== 0) {
    logout.classList.remove("invisible");
    login.classList.add("invisible");
    edition.classList.remove("invisible");
    for (let i = 0; i < span.length; i++) {        
        span[i].classList.remove("invisible");
    }
    logout.addEventListener("click", deconnect());
}

// Pour se déconnecter
function deconnect() {
    console.log(logout);
    localStorage.clear();
}

// **************************************  MODAL **************************************



const openModal = function (e) {
    e.preventDefault(); 
    const target = document.querySelector('.modal1');
    target.style.display = null;
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('js-modal-close').addEventListener('click', closeModal);
}

const closeModal = function (e) {
    if(modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.removeEventListener('click', closeModal);
    modal.querySelector('js-modal-close').addEventListener('click', closeModal);
    modal = null;
}

document.querySelectorAll('.js-modal').forEach(e => {
    e.addEventListener('click', openModal);
})