import { enUS, es, ptBR, zhCN, fr, id } from 'date-fns/locale';

// WP post locales mapping to TX language codes used in the app
export const WP_POST_LOCALE_TO_TX_MAPPING = {
  en_US: 'en',
  zh_CN: 'zh',
  fr_FR: 'fr',
  id_ID: 'id',
  pt_BR: 'pt_BR',
  es_MX: 'es_MX',
};

// TX language codes (set in localStorage) mapping to ISO codes that date-fns uses for locales
export const TX_LANGUAGE_TO_DATEFNS_LOCALE_MAPPING = {
  en: enUS,
  zh: zhCN,
  fr,
  id,
  pt_BR: ptBR,
  es_MX: es,
};
