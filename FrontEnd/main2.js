const gallery = document.querySelector(".gallery");
const divcat = document.querySelector(".divcat");
let dataFich;
let categorie = new Array();
var valSelect = new Array();

async function getWorks () {
    try {
        const response = await fetch("http://" + window.location.hostname + ":5678/api/works");
        data = await response.json();
        project(data); 
        // console.log(data);
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
}

getWorks();
// console.log(valSelect);
// Créer un tableau pour les catégories
async function getCategories () {
    try {
        const response = await fetch("http://" + window.location.hostname + ":5678/api/categories");
        const categories = await response.json();
        categories.push({id: 4, name: 'Tous'});
        // console.log(categories);
        buttonCat(categories);
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
}
getCategories();


// Créer un bouton pour les catégories
function buttonCat (cat) {
    for (let i of cat) {
        const button = document.createElement("button");
        button.setAttribute("id",i.name);
        button.innerText = i.name;
        divcat.appendChild(button);
        
        filterWorks (button, cat);
    }
}

// Filtrer les catégories
function filterWorks (button, cat) {
    button.addEventListener("click", (event) => 
        {console.log(event.target.id);
        for (let i of cat) {
            if (i == event.target.id) {
                const figureElement = document.createElement("figure");
                const imageElement = document.createElement("img");
                const figcaptionElement = document.createElement("figcaption");
                imageElement.src = i.imageUrl;
                imageElement.alt = i.title;
                figcaptionElement.innerText = i.title;
            
                gallery.appendChild(figureElement);
                figureElement.appendChild(imageElement);
                figureElement.appendChild(figcaptionElement);
                console.log(i);
            }
            }
        });

    // button.addEventListener("click", function () {
    //     const worksFilter = select.filter(function (button) {
    //         project(button.id);
    //     });
    //     console.log(button.id);
    // });
}

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

