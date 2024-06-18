import jwtInterceptor from "../service/jwtInterceptor";
import { AFFAIRE_ENDPOINTS } from "../utils/api";

const dbName = "MaBaseDeDonnees";
const dbVersion = 3;
let affaireAssociee = JSON.parse(localStorage.getItem("affaireAssociee")) || [];
let tachesAssociees = JSON.parse(localStorage.getItem("tachesAssociees")) || [];
let notesAssociees = JSON.parse(localStorage.getItem("notesAssociees")) || [];

let db;

const request = indexedDB.open(dbName, dbVersion);

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  if (!db.objectStoreNames.contains("affaires")) {
    db.createObjectStore("affaires", { keyPath: "id", autoIncrement: true });
  }

  if (!db.objectStoreNames.contains("taches")) {
    const tachesStore = db.createObjectStore("taches", {
      keyPath: "id",
      autoIncrement: true,
    });
    tachesStore.createIndex("nom_affaire", "nom_affaire", { unique: false });
  }
  if (!db.objectStoreNames.contains("notes")) {
    db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
  }
  if (!db.objectStoreNames.contains("historique")) {
    db.createObjectStore("historique", { keyPath: "id", autoIncrement: true });
  }
};

request.onsuccess = (event) => {
  db = event.target.result;
};

request.onerror = (event) => {
  console.error(
    "Erreur lors de l'ouverture de la base de données",
    event.target.error
  );
};



async function ajouterAffaire(
  nom_affaire,
  num_parcelle,
  montant,
  description,
  etapes,
  files,
  contactId
) {


  const affaireRequest = {
    name: nom_affaire,
    land_id: num_parcelle,
    contact_id: contactId,
    amount: montant,
    description: description,
    status: etapes,
    documents: files
  };

  console.log("affaireRequest", affaireRequest)
  const affaireResponse = await jwtInterceptor.post(AFFAIRE_ENDPOINTS.new, affaireRequest);
  
  //TODO update localStorage
}

function generateUniqueID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function recupererNouvelleAffaire() {
  const affaires = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("affaire_")) {
      const affaireString = localStorage.getItem(key);
      const affaire = JSON.parse(affaireString);
      affaires.push(affaire);
    }
  }
  return affaires;
}

function getAffaireAssociee() {
  return affaireAssociee;
}

function mettreAJourAffaire(id, nouvellesDonnees) {
  const transaction = db.transaction(["affaires"], "readwrite");
  const objectStore = transaction.objectStore("affaires");
  const miseAJour = objectStore.put(nouvellesDonnees, id);

  miseAJour.onsuccess = () => {
    console.log("Affaire mise à jour avec succès");
  };

  miseAJour.onerror = () => {
    console.error(
      "Erreur lors de la mise à jour de l'affaire",
      miseAJour.error
    );
  };
}

function supprimerAffaire(id) {
  const transaction = db.transaction(["affaires"], "readwrite");
  const objectStore = transaction.objectStore("affaires");
  const suppression = objectStore.delete(id);

  suppression.onsuccess = () => {
    console.log("Affaire supprimée avec succès");

    const affaire = { id: id };
    ajouterEvenementHistorique("Affaire supprimée", affaire);

    console.log('ity le affaire' , affaire)


    affaireAssociee = affaireAssociee.filter((affaire) => affaire.id !== id);
    localStorage.setItem("affaireAssociee", JSON.stringify(affaireAssociee));
  };

  suppression.onerror = () => {
    console.error("Erreur lors de la suppression de l'affaire", suppression.error);
  };
}

function ajouterTache(
  nom_affaire,
  objectif,
  description,
  date_Echeance,
  assigneA,
  statut,
  date_create
) {
  const transaction = db.transaction(["taches"], "readwrite");
  const objectStore = transaction.objectStore("taches");

  const ajout = objectStore.add({
    nom_affaire: nom_affaire,
    objectif: objectif,
    description: description,
    date_Echeance: date_Echeance,
    assigneA: assigneA,
    statut: statut,
    date_create,
  });

  ajout.onsuccess = () => {
    console.log("Tâche ajoutée avec succès");

    const tache = {
      nom_affaire: nom_affaire,
      objectif: objectif,
      description: description,
      date_Echeance: date_Echeance,
      assigneA: assigneA,
      statut: statut,
      date_create: date_create,
    };
        ajouterEvenementHistorique("Tâche créé", tache);

    tachesAssociees.push(tache);
    localStorage.setItem("tachesAssociees", JSON.stringify(tachesAssociees));
  };

  ajout.onerror = () => {
    console.error("Erreur lors de l'ajout de la tâche", ajout.error);
  };
}

function recupererTacheParId(id) {
  const transaction = db.transaction(["taches"], "readonly");
  const objectStore = transaction.objectStore("taches");
  const recuperation = objectStore.get(id);

  recuperation.onsuccess = () => {
    const tache = recuperation.result;
    console.log("Tâche récupérée avec succès", tache);
  };

  recuperation.onerror = () => {
    console.error(
      "Erreur lors de la récupération de la tâche",
      recuperation.error
    );
  };
}
function recupererTachesAssociees() {
  return JSON.parse(localStorage.getItem("tachesAssociees")) || [];
}
function getTachesAssociees() {
  return tachesAssociees;
}
function getNotesAssociees() {
  return notesAssociees;
}

function ajouterNote(description, num_parcelle, date_create) {
  if (!db.objectStoreNames.contains("notes")) {
    console.error("L'objectStore 'notes' n'existe pas");
    return;
  }

  const transaction = db.transaction(["notes"], "readwrite");
  const objectStore = transaction.objectStore("notes");

  const ajout = objectStore.add({
    description: description,
    num_parcelle: num_parcelle,
    date_create: date_create,
  });

  ajout.onsuccess = () => {
    console.log("Note ajoutée avec succès");

    const note = {
      description: description,
      num_parcelle: num_parcelle,
      date_create: date_create,
    };

    ajouterEvenementHistorique("Note créé", note);

    const noteString = JSON.stringify(note);
    localStorage.setItem(`note_${num_parcelle}`, noteString);

    notesAssociees.push(note);
    localStorage.setItem("notesAssociees", JSON.stringify(notesAssociees));
  };

  ajout.onerror = () => {
    console.error("Erreur lors de l'ajout de la note", ajout.error);
  };
}

function recupererNotes() {
  const transaction = db.transaction(["notes"], "readonly");
  const objectStore = transaction.objectStore("notes");
  const notes = [];

  objectStore.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      notes.push(cursor.value);
      cursor.continue();
    } else {
      console.log("Notes récupérées avec succès", notes);
    }
  };

  transaction.oncomplete = () => {};
}

function mettreAJourNote(id, nouvellesDonnees) {
  const transaction = db.transaction(["notes"], "readwrite");
  const objectStore = transaction.objectStore("notes");
  const miseAJour = objectStore.put(nouvellesDonnees, id);

  miseAJour.onsuccess = () => {
    console.log("Note mise à jour avec succès");
  };

  miseAJour.onerror = () => {
    console.error("Erreur lors de la mise à jour de la note", miseAJour.error);
  };
}

function supprimerNote(id) {
  const transaction = db.transaction(["notes"], "readwrite");
  const objectStore = transaction.objectStore("notes");
  const suppression = objectStore.delete(id);

  suppression.onsuccess = () => {
    console.log("Note supprimée avec succès");
  };

  suppression.onerror = () => {
    console.error(
      "Erreur lors de la suppression de la note",
      suppression.error
    );
  };
}

function ajouterEvenementHistorique(action, details) {
  const transaction = db.transaction(["historique"], "readwrite");
  const objectStore = transaction.objectStore("historique");

  const ajout = objectStore.add({
    action: action,
    details: details,
    date: new Date().toISOString(),
  });

  ajout.onsuccess = () => {
    console.log("Événement ajouté à l'historique avec succès");
  };

  ajout.onerror = () => {
    console.error(
      "Erreur lors de l'ajout de l'événement à l'historique",
      ajout.error
    );
  };
}

function recupererEvenementsHistorique() {
  const transaction = db.transaction(["historique"], "readonly");
  const objectStore = transaction.objectStore("historique");
  const evenements = [];

  return new Promise((resolve, reject) => {
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        evenements.push(cursor.value);
        cursor.continue();
      } else {
        resolve(evenements);
      }
    };

    transaction.oncomplete = () => {
      resolve(evenements);
    };

    transaction.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

function viderHistorique() {
  const transaction = db.transaction(["historique"], "readwrite");
  const objectStore = transaction.objectStore("historique");
  const suppression = objectStore.clear();

  suppression.onsuccess = () => {
    console.log("Historique vidé avec succès");
  };

  suppression.onerror = () => {
    console.error(
      "Erreur lors de la suppression de l'historique",
      suppression.error
    );
  };
}

export {
  ajouterAffaire,
  recupererNouvelleAffaire,
  mettreAJourAffaire,
  supprimerAffaire,
  ajouterTache,
  getAffaireAssociee,
  getTachesAssociees,
  getNotesAssociees,
  recupererTacheParId,
  recupererTachesAssociees,
  ajouterNote,
  recupererNotes,
  mettreAJourNote,
  supprimerNote,
  recupererEvenementsHistorique,
  viderHistorique,
};
