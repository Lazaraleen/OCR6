const gallery = document.querySelector(".gallery");

fetch('http://localhost:5678/api/works')
    .then (function(response) {return response.json();})
    .then(function(data) {
        console.log(data);

        // Créer un tableau pour les catégories

        let categorie = new Array();
        categorie[0]=0;
        count=1;

        for (let cat of data) {
            categorie[count] = cat.category.name;
            count++;
        }

        // Trier le tableau catégorie

        const sortUnique = categorie.sort();
        const unique = new Set(categorie);
        console.log(unique);

        // Créer un bouton pour les catégories

        const divcat = document.querySelector(".divcat");
        const label = document.createElement("label");
        const select = document.createElement("select");
        select.setAttribute("id","category");
        label.innerHTML = 'Catégorie :';

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

        // Faire le tri suivant la catégorie choisie






        // Afficher les projets pour les retirer du HTML

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

    });



