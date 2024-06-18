
# Requirements

- Node (https://nodejs.org/en/download)
- .env.local (path dans la répértoire du projet)
- gitlab (https://gitlab.com/)

# Contenu 

- .env.local : REACT_APP_BASE_URL="http://localhost:9000/api"

# Installation

- Cloner depuis le repertoire git :

  1 - Via SSH : git clone git@gitlab.com:siooka-project/mixdata-front.git
  2 - Via HHTPS : git clone https://gitlab.com/siooka-project/mixdata-front.git
  
  # Requirements SSH :

    1 - Clé SSH dans le pc : ssh-keygen -t rsa -b 4096 -C "votre_email@example.com"
    2 - Ajouter votre clé SSH à votre compte Git, Copiez le contenu de votre clé publique en utilisant la commande cat ou tout éditeur de texte de votre choix, puis ajoutez-le dans les paramètres SSH de votre compte Git. Vous pouvez trouver cette option dans les paramètres de compte sur la plateforme Git que vous utilisez (GitHub, GitLab, Bitbucket, etc.). Assurez-vous d'ajouter la clé publique, généralement trouvée dans le fichier id_rsa.pub.

- Exécutez la commande npm install ou yarn install
  
# Lancement du projet

- Quand tout est OK du côte installation executer la commande : npm run start (pour lancer le serveur node)
- Vérifier sur le navigateur dans (http://localhost:3000)
