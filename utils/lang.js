import { createContext } from 'react';

export const apiLangCodes = {
  en: 'en_US',
  zh: 'zh_CN',
  pt_BR: 'pt_BR',
  es_MX: 'es_MX',
  id: 'id_ID',
  fr: 'fr_FR',
};

export const getAPILangCode = (lang) => apiLangCodes[lang];

const LangContext = createContext('en_US');

export const LangProvider = LangContext.Provider;
export const LangConsumer = LangContext.Consumer;
