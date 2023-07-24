# OCR6

## Contexte du projet:

Le site d'une architecte était déjà construit côté Front-End et on nous a fourni un Back-End contenant ses projets ainsi qu'une API, Swagger, pour pouvoir y accéder.

Il fallait construire en Javascript l'affichage du DOM de ses projets pour la retirer de la page HTML (appel à l'API). Des boutons de tri devaient être construits en JS pour permettre le filtrage de ses travaux suivant leurs catégories (appel à l'API).

Construire une page Login qui appelait l'API pour constater que la connexion était autorisée et récupérer le token de connexion. 

L'affichage de la page principale devait présenter certains changements si on était connecté ou non, les filtres disparaissaient et différents boutons "modifier" devaient apparaître.

La construction d'une modale a été demandée pour pouvoir supprimer les travaux ou en rajouter, en faisant toujours appel à l'API et en s'assurant qu'on ne pouvait le faire qu'en étant connecté. L'affichage devait s'actualiser de lui-même sur la modale et à l'arrière sur la page principale en fonction de ces suppressions ou de ces ajouts

### Pas de github pages cette fois-ci car il n'en permet pas l'affichage

## Configuration

Ce projet nécessite l'installation de npm et nodejs.
Lorsque la configuration est faite, il suffit de lancer npm start dans la partie front-end du projet.
