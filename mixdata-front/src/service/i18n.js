import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Bad Request(400): Invalid input': 'Erreur',
      '"email" must be a valid email': '"E-mail" doit être une adresse e-mail valide',
      '"password" should be at least 8 characters long': '"Mot de passe" doit comporter au moins 8 caractères',
      '"password" should contain at least 1 upper-cased letter': '"Mot de passe" doit contenir au moins 1 lettre majuscule',
      '"password" should contain at least 1 number': '"Mot de passe" doit contenir au moins 1 chiffre',
      '"password" should contain at least 1 symbol': '"Mot de passe" doit contenir au moins 1 symbole',
      '"username" length must be at least 3 characters long' : '"Pseudo" doit contenir au moins 3 caractères',
      '"firstname" length must be at least 3 characters long' : '"Prénom" doit contenir au moins 3 caractères',
      'Invalid username or password' : 'Pseudo ou mot de passe invalide',
      '"username" length must be less than or equal to 25 characters long' : '"Pseudo" doit être inférieure ou égale à 25 caractères',
      '"firstname" length must be less than or equal to 100 characters long' : '"Prénom" doit être inférieure ou égale à 100 caractères',
      '"password" should not be longer than 26 characters' : '"Mot de passe" ne doit pas dépasser 26 caractères' ,
      'User with given username already exist' : 'Pseudo déjà existant'
    },
  },
  fr: {
    translation: {
        'Bad Request(400): Invalid input': 'Erreur',
        '"email" must be a valid email': '"E-mail" doit être une adresse e-mail valide',
        '"password" should be at least 8 characters long': '"Mot de passe" doit comporter au moins 8 caractères',
        '"password" should contain at least 1 upper-cased letter': '"Mot de passe" doit contenir au moins 1 lettre majuscule',
        '"password" should contain at least 1 number': '"Mot de passe" doit contenir au moins 1 chiffre',
        '"password" should contain at least 1 symbol': '"Mot de passe" doit contenir au moins 1 symbole',
        '"username" length must be at least 3 characters long' : '"Pseudo" doit contenir au moins 3 caractères',
        '"firstname" length must be at least 3 characters long' : '"Prénom" doit contenir au moins 3 caractères',
        'Invalid username or password' : 'Pseudo ou mot de passe invalide',
        '"username" length must be less than or equal to 25 characters long' : '"Pseudo" doit être inférieure ou égale à 25 caractères',
        '"firstname" length must be less than or equal to 100 characters long' : '"Prénom" doit être inférieure ou égale à 100 caractères',
        '"password" should not be longer than 26 characters' : '"Mot de passe" ne doit pas dépasser 26 caractères' ,
        'User with given username already exist' : 'Pseudo déjà existant'
      },
  },
  // Autres langues et traductions...
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr', // Langue par défaut
  fallbackLng: 'fr', // Langue de secours en cas de traduction manquante
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
