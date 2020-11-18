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

export function translateText(str, params) {
  if (!str || typeof str !== 'string') {
    return str;
  }

  if (typeof window !== 'undefined') {
    const { Transifex } = window;
    if (typeof Transifex !== 'undefined') {
      return Transifex.live.translateText(str, params);
    }
  }

  return str;
}
