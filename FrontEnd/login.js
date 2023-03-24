
function login() {
    // Récupérer les données du formulaire
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Envoyer les données à l'API
    fetch("http://" + window.location.hostname + ":5678/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
      // Empêcher l'accès à la page juste en cliquant sur "se connecter"
        document.querySelector("#connect").addEventListener("click", function(event){
            event.preventDefault();
        });
      // Stocker les informations utilisateur localement
      localStorage.setItem("token", data.token);
      console.log(data.token);
      
      // Rediriger l'utilisateur vers la page d'accueil
      window.location.href = "./index.html";
    })
    .catch(error => {
      // Afficher un message d'erreur pour l'utilisateur
      console.error("Erreur lors de la connexion:", error);
      alert("Email ou mot de passe incorrect.");
    });
}
