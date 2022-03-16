# Groupomania
Septième et dernier projet du parcours développeur web chez OpenClassrooms.
Créer un réseau social d'entreprise.

Instructions 


- Vous verrez deux dossiers: frontend et backend.

* Il faut installé sur votre machine:
    Backend : NodeJS , express , sequelize Base de données : MySQL ;
    Frontend : Vue , Vuex , bootstrap ;
    

FRONTEND

-Depuis le terminal de l'éditeur de code, se rendre sur le dossier "frontend" et exécuter la commande :

``` 
npm install
```

- Puis une fois l'installation terminée:

```
npm run serve
```

- A ce moment là un message s'affichera:

```
App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.1.109:8080/
  ```

BACKEND

- Cette partie se décompose en deux rubriques: MySQL et Serveur.

MySQL

- Assurez vous qu'une instance MySQL soit bien active dans votre ordinateur.

- Connectez-vous à mysql.

- Importez le fichier "groupomaniaBdd.sql" qui se trouve à la racine du projet.
-> Ceci va créer une base de données nommée "groupomania"

Serveur

```
npm install
```
-ensuite

```
nodemon server
```

## DANS LE NAVIGATEUR

- Ouvrez votre navigateur à l'adresse: http://localhost:8080/

- Allez dans la rubrique INSCRIPTION, inscrivez l'utilisateur de votre choix en suivant les instructions, puis connectez-vous.

- Pour se connecter en tant qu'Administrateur importez le fichier setAdmin.sql. Cela attribuera au premier utilisateur créé (User id=1) les privilèges d'administration (isAdmin=1).

Recharger la page de votre navigateur pour voir votre compte passer de simple utilisateur à administrateur.



#   P 7 _ K h a d i j a _ A i t Y d i r _ 1 4 - 0 2 - 2 0 2 2  
 