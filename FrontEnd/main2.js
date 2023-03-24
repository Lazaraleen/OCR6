const gallery = document.querySelector(".gallery");
const divcat = document.querySelector(".divcat");
let dataFich;
let categorie = new Array();
let currentCategory = 'Tous';

async function getWorks () {
    // vider la gallerie des Works
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
        // categories.push({id: 4, name: 'Tous'});
        categories.unshift({name: 'Tous'});
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
};  



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

