import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "welcome": "Welcome to React",
        }
      },
      es: {
        translation: {
          "welcome": "Bienvenido a React",
        }
      },
      ca: {
        translation: {
          "welcome": "Benvingut a React",
        }
      }
    },
    lng: Localization.locale.split('-')[0],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });
  
console.log("Localization.local: ",Localization.locale);
export default i18n;