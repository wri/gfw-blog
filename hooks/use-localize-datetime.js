import dateFnsformat from 'date-fns/format';

import { WP_POST_LOCALE_TO_TX_MAPPING, TX_LANGUAGE_TO_DATEFNS_LOCALE_MAPPING } from 'constants/locale-mapping';

/**
 * 
 * @param {string} dateTime Datetime string returned from the wordpress api
 * @param {string} locale locale override. If not set the function will use the one set by txlive
 * @param {string} format date-fns formatting string
 * @returns {string} with the localized datetime
 */
const useLocalizeDatetime = (dateTime, wpLocale, format = 'PP') => {
  // Check local storage for the language code Transifex live sets, return the code
  // to be used when picking a localized string for minutes.
  const getTxLocale = () => {
    try {
      const txLiveLanguage = JSON.parse(
        localStorage?.getItem('txlive:selectedlang')
      );
      return txLiveLanguage;
    } catch {
      return 'en';
    }
  };

  // Get Transifex locale
  const txLocale = getTxLocale();

  // We'll get the dateFns locale object based on the locale we want to use. 
  // If a wpLocale has been set, we'll need to first resort to the mapping.
  const dateFnsLocale = TX_LANGUAGE_TO_DATEFNS_LOCALE_MAPPING[
    wpLocale ? WP_POST_LOCALE_TO_TX_MAPPING[wpLocale] : txLocale
  ]

  // Format the date. 
  const localizedDate = dateFnsformat(new Date(dateTime), format, {
    locale: dateFnsLocale,
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
