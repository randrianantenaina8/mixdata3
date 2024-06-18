# Requirements

- Node (https://nodejs.org/en/download)
- .env.local (path dans la répértoire du projet)
- gitlab (https://gitlab.com/)
- Docker (https://www.docker.com/products/docker-desktop/)

# Contenu

- .env.local (Remarque : Veuillez mettre le nom de votre pc à la place des "nom_pc") : 
ELASTIC_END_POINT= http://localhost:9200 
DATA_STORED_DIR=./popety/
/ *** TypeORM env *** /
TYPEORM_CONNECTION=mongodb
 typeorm_connection_url=mongodb://root:password@nom_pc.local:27017/
TYPEORM_HOST=nom_pc.local
TYPEORM_USERNAME=root
TYPEORM_PASSWORD=password
TYPEORM_DATABASE=mixdata-crm
TYPEORM_PORT=27017
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=false
/ *** Mongo express *** /
MONGO_EXPRESS_FORWARD_PORT=8081

- Docker : Si vous utilisez WSL (doit être au minimum 6go de ram et 2 core pour bien fonctionner) pour cela vous pouvez créer un fichier .wslconfig dans le répértoire de votre pc (par exemple : C:\Users\Siooka\nom_de_votre_user)

- Dans .wslconfig selon la configuration de votre pc :
[wsl2]
memory=6GB  # Any size you feel like (must be an integer!)
processors=2

# Installation

- Cloner depuis le repertoire git :

  1 - Via SSH : git clone git@gitlab.com:siooka-project/mixdata-back.git
  2 - Via HHTPS : git clone https://gitlab.com/siooka-project/mixdata-back.git

  # Requirements SSH :

    1 - Clé SSH dans le pc : ssh-keygen -t rsa -b 4096 -C "votre_email@example.com"
    2 - Ajouter votre clé SSH à votre compte Git, Copiez le contenu de votre clé publique en utilisant la commande cat ou tout éditeur de texte de votre choix, puis ajoutez-le dans les paramètres SSH de votre compte Git. Vous pouvez trouver cette option dans les paramètres de compte sur la plateforme Git que vous utilisez (GitHub, GitLab, Bitbucket, etc.). Assurez-vous d'ajouter la clé publique, généralement trouvée dans le fichier id_rsa.pub.

- Exécutez la commande npm install ou yarn install
- Lancer Docker Desktop
- Exécutez la commande "./docker-dev.sh up" pour démarrer les conteneurs Docker nécessaires (attendre que tout est installé dans l'application Docker Desktop).
  
  # Import des données

   - Importer les régions à partir de l’url : http://localhost:9000/api/region/populate depuis postman avec token dans x-access-token du header. Les données se trouve dans le dossier "**popety**" du projet
 
   - Importer les communes à partir de l’url : http://localhost:9000/api/city/populate depuis postman avec token dans x-access-token du header. Les données se trouve dans le dossier popety du projet

   - Vous pouvez utiliser l’importation direct en local en utilisant les fichiers de parcelle qui se trouve dans le dossier popety du projet. Voici l’url d’importation local :  http://localhost:9000/api/lands/populate?region=geneve avec le paramètre geneve correspond au fichier « region-geneve.json » qui se trouve dans le dossier popety.

   Si l’importation des données s’est bien passé, on aura un résultat sur région et/ou city et/ou lands : http://localhost:9200/regions/_search?pretty

# Lancement du projet

- Stopper mixdata-app dans le container Mixdata-back dans l'application Docker Desktop
- Quand tout est OK du côte installation exécutez la commande : npm run start (pour lancer le serveur node)
