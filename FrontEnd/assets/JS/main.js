const gallery = document.querySelector(".gallery");
const divcat = document.querySelector(".divcat");
const login = document.querySelector("#login");
const logout = document.querySelector("#logout");
const span = document.querySelectorAll("span");
const edition = document.querySelector(".edition");
let formPhoto = document.querySelector("#form-photo");
let catSelect = document.querySelector("#category-select");
let buttonPhoto = document.querySelector("#submit-photo");
const photoChoose = document.querySelector(".photoChoose");
const modalAjoutPhoto = document.querySelector(".modal-ajout-photo");

let trashButtons = [];
let modal = null;
let currentCategory = "Tous";
const token = localStorage.token;


async function getWorks() {
  // vider la gallerie des différents travaux
  gallery.innerHTML = "";

  try {
    const response = await fetch("http://" + window.location.hostname + ":5678/api/works");
    data = await response.json();

    if (currentCategory == "Tous") {
      // Affiche tous les projets
      project(data);
    } else {
      // Créer un fichier newData dans lequel on mettra les projets filtrés par catégories puis l'afficher
      const newData = data.filter(
        (work) => work.category.name === currentCategory
      );
      project(newData);
    }
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

getWorks();

// **************************************  CATEGORIES **************************************

// Créer un tableau pour les catégories
async function getCategories() {
  try {
    const response = await fetch("http://" + window.location.hostname + ":5678/api/categories");
    const categories = await response.json();
    categories.unshift({ name: "Tous" });
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
function buttonCat(cat) {
  for (let i of cat) {
    const button = document.createElement("button");
    button.setAttribute("id", i.name);
    button.innerText = i.name;
    divcat.appendChild(button);
    button.addEventListener("click", () => filterWorks(button));
  }
}

// Filtrer les catégories
function filterWorks(button) {
  console.log("début");
  const allfilter = [...divcat.children];
  console.log(allfilter);
  allfilter.forEach((element) => {
    element.classList.remove("selected");
  });
  button.classList.add("selected");
  currentCategory = button.id;
  getWorks();
}

// **************************************  AFFICHER ET CREER LES TRAVAUX **************************************

// Afficher les projets pour les retirer du HTML
function project(key) {
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
  logout.addEventListener("click", deconnect);
  // Ne pas mettre les parenthèses à deconnect sinon ça appelle la fonction et déconnecte la session
}

// Pour se déconnecter
function deconnect() {
  localStorage.clear();
}

// **************************************  MODAL **************************************

const modalGallery = document.querySelector(".modal-gallery");

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(".modal1");
  target.style.display = null;
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  modalWorks();
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.removeEventListener("click", closeModal);
  modal.querySelector("js-modal-close").addEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((e) => {
  e.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

async function modalWorks() {
  modalGallery.innerHTML = "";
  try {
    const response = await fetch("http://" + window.location.hostname + ":5678/api/works");
    data = await response.json();
    data.forEach((e) => {
      const imageElement = document.createElement("img");
      const editButton = document.createElement("button");
      const trashButton = document.createElement("button");
      const div = document.createElement("div");
      const icon = document.createElement("i");
      imageElement.src = e.imageUrl;
      editButton.innerText = "éditer";
      trashButton.classList.add("trash");
      icon.classList.add("fa-solid");
      icon.classList.add("fa-trash-can");
      icon.setAttribute("id", e.id);
      modalGallery.appendChild(div);
      div.appendChild(trashButton);
      div.appendChild(imageElement);
      div.appendChild(editButton);
      trashButton.appendChild(icon);
    });
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }

  // **************************************  SUPPRIMER TRAVAUX EXISTANTS **************************************
  const buttonTrash = document.getElementsByClassName("fa-trash-can");
  for (element of buttonTrash) {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      delWorks(e);
    });
  };
}


const delWorks = async (e) => {
  const response = await fetch("http://" + window.location.hostname + ":5678/api/works/" + e.target.id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log (response.status);
  if (response.status == 200 || response.status == 204) {
    alert ("Un projet a été supprimé");
  };
  // remplir la modal
  modalWorks();
  gallery.innerHTML="";
  getWorks();
};


// **************************************  SECONDE MODAL **************************************

const openModal2 = function (e) {
  e.preventDefault();
  const modal1 = document.querySelector(".modal1");
  modal1.style.display = "none";
  const target = document.querySelector(".modal2");
  target.style.display = null;
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.addEventListener("click", openModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", openModal);
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  modalWorks();
};

document.querySelectorAll(".js-modal2").forEach((e) => {
  e.addEventListener("click", openModal2);
});


// Choisir une image sur le clic bouton
const importPhoto = document.querySelector("#importPhoto");
importPhoto.addEventListener("change", previewFile);

function previewFile() {
  const file_extension_regex = /\.(jpg|png)$/i;
  if (this.files.length == 0 || !file_extension_regex.test(this.files[0].name)) {
    return;
  }

  const file = this.files[0];
  const file_reader = new FileReader();
  file_reader.readAsDataURL(file);
  file_reader.addEventListener("load", (e) => displayImage(e, file));
}

function displayImage(event, file) {
  const modalAjoutPhoto = document.querySelector(".modal-ajout-photo");
  modalAjoutPhoto.innerHTML = "";
  const photo = document.createElement("img");
  photo.classList.add("photoChoose");
  photo.src = event.target.result;
  modalAjoutPhoto.appendChild(photo);
}



// **************************************  AJOUTER UN TRAVAIL **************************************

const addForm = async (formData) => {
  try {
    const response = await fetch("http://" + window.location.hostname + ":5678/api/works/", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });    
    if (response.status == 201) {alert ("Un nouveau projet a été ajouté")};
  } catch (error) {
    console.log(error);
  }
  // Fermer la seconde modal et actualiser la première (tout en gardant le fait de fermer la première fonctionnelle)
  const modal1 = document.querySelector(".modal1");
  const modal2 = document.querySelector(".modal2");
  modal2.style.display = "none";
  closeModal;
  modal1.style.display = null;
  modal = modal1;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  modalWorks();
  // Actualiser l'affichage de la page en arrière plan
  gallery.innerHTML="";
  getWorks();
};

formPhoto.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const image = document.getElementById('importPhoto').files[0];
  const titre = document.getElementById('titre').value;
  const category = document.getElementById('category-select').value;

  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", titre);
  formData.append("category", category);
  
  // Regarder si le formulaire est valide avant de l'envoyer
  let myRegex = /^[a-zA-Z-\s]+$/;
  if ((titre == "") || (category == "") || (image == undefined) || (myRegex.test(titre) == false)) {
    alert("Vous devez remplir tous les champs et le titre ne doit comporter que des lettres et des tirets");
    return;
  } else if (buttonPhoto.classList.contains("grey")){
    buttonPhoto.classList.remove("grey");
    buttonPhoto.classList.add("green");
    return;
    // Si en cliquant, le bouton devient vert, cest qu'il est bon à être envoyé, il suffit de recliquer dessus
  } else {
    addForm(formData);
  }
});

