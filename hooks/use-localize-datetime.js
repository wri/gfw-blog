import dateFnsformat from 'date-fns/format';
import { enUS, es, ptBR, zhCN, fr, id } from 'date-fns/locale';

// TX language codes (set in localStorage) mapping to ISO codes that date-fns uses for locales
const TX_LANGUAGE_TO_DATEFNS_LOCALE_MAPPING = {
  en: enUS,
  zh: zhCN,
  fr,
  id,
  pt_BR: ptBR,
  es_MX: es,
};

/**
 * 
 * @param {string} dateTime Datetime string returned from the wordpress api
 * @param {string} format date-fns formatting string
 * @returns {string} with the localized datetime
 */
const useLocalizeDatetime = (dateTime, format = 'PP') => {
  // Check local storage for the language code Transifex live sets, return the respective
  //   locale component to pass to date-fns. If none are found, or an error is returned, 
  //   default to American English.
  const getDateFnsLocale = () => {
    try {
      const txLiveLanguage = JSON.parse(
        localStorage?.getItem('txlive:selectedlang')
      );
      return TX_LANGUAGE_TO_DATEFNS_LOCALE_MAPPING[txLiveLanguage];
    } catch {
      return enUS;
    }
  };

  // Format the date. 
  const localizedDate = dateFnsformat(new Date(dateTime), format, {
    locale: getDateFnsLocale(),
  });

  // Capitalize first letter (a-zA-Z only)
  const capitalizeFirstLetter = (dateStr) => {
    const match = dateStr?.match(/[a-zA-Z]/);
    if (!match) return dateStr;
    return dateStr.substring(0, match.index) + match[0].toUpperCase() + dateStr.substring(match.index + 1);
  }

  const formattedDate = capitalizeFirstLetter(localizedDate);

  return formattedDate;
};

export default useLocalizeDatetime;
