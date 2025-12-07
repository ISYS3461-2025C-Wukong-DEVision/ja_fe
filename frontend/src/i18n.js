import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import các tệp dịch thuật
import translationEN from './locales/en/translation.json'; 
import translationVI from './locales/vi/translation.json'; 

const resources = {
  en: {
    translation: translationEN
  },
  vi: {
    translation: translationVI
  }
};

i18n
  .use(LanguageDetector) // Phát hiện ngôn ngữ người dùng
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false // React đã tự bảo vệ khỏi XSS
    }
  });

export default i18n;