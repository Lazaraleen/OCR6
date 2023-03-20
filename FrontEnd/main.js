const gallery = document.querySelector(".gallery");
let data = [];
let categorie = new Array();
let valSelect = new Array();

async function fetchUser () {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        data = await response.json();
        let valSelect = new Array ();
        tabCat();
        catego(); 

        return data;
    } catch (error) {
        console.error(error);
    }
}

fetchUser();

// Créer un tableau pour les catégories
function tabCat() {
    categorie[0]=0;
    count=1;
    
    for (let cat of data) {
        categorie[count] = cat.category.name;
        count++;
    }
}

// Afficher les projets pour les retirer du HTML
function project(key){
    for (let i of data) {
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


// Créer un bouton pour les catégories
function catego(){
    const divcat = document.querySelector(".divcat");
    const label = document.createElement("label");
    const select = document.createElement("select");
    select.setAttribute("id","category");
    select.setAttribute("onchange", "getSelectedValue()");
    label.innerHTML = 'Catégorie :';
    
    // Trier le tableau catégorie
    const sortUnique = categorie.sort();
    const unique = new Set(categorie);
    
    divcat.appendChild(label);
    divcat.appendChild(select);
    
    for (let choix of unique) {
        const option = document.createElement("option");
        if (choix === 0) {option.innerText = "Toutes catégories";
            option.value = 'Toutes catégories';}
            else { option.innerText = choix;
                option.value = choix;};
        select.appendChild(option);
    }

    filter(valSelect);
}

function getSelectedValue ()
{
    let selectedValue = document.getElementById("category").value;
    // console.log(selectedValue);
    valSelect = selectedValue;
    console.log(valSelect);
}

// Filtrer les produits
function filter (value) {
    if (value !== 'Toutes catégories') {project(value);}
    else {project(data);};
}

