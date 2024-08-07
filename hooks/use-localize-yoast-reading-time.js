import { WP_POST_LOCALE_TO_TX_MAPPING } from 'constants/locale-mapping';

import useGetTxLocale from 'hooks/use-get-tx-locale';

// Translation strings for minutes
const LOCALE_STRINGS_MINUTES = {
  en: {
    singular: 'minute',
    plural: 'minutes',
  },
  zh: {
    singular: '分钟',
    plural: '分钟',
  },
  fr: {
    singular: 'minute',
    plural: 'minutes',
  },
  id: {
    singular: 'menit',
    plural: 'menit',
  },
  pt_BR: {
    singular: 'minuto',
    plural: 'minutos',
  },
  es_MX: {
    singular: 'minuto',
    plural: 'minutos',
  },
};

/**
 *
 * @param {object} yoastHeadJson yoast_head_json as returned by the API
 * @param {string} wpLocale locale override. If not set the function will use the one set by txlive
 * @param {string} overridenReadTime quantity in minutes that was manually entered as reading time value in the API
 * @returns {string} with the localized minutes
 */
const useLocalizeYoastReadingTime = ({
  yoastHeadJson,
  wpLocale,
  overridenReadTime,
}) => {
  // Get Transifex locale
  const txLocale = useGetTxLocale();

  // Get the estimated reading time string from yoast data
  let yoastEstReadingTime =
    yoastHeadJson?.twitter_misc?.['Est. reading time'] || '';

  // if overridenReadTime isn't undefined, then use it instead of 'Est. reading time'
  if (overridenReadTime !== undefined) {
    yoastEstReadingTime = overridenReadTime;
  }

  // Extract the minutes integer from the time string provided by yoast.
  // We use regex to extract this information (eg: '10 minutes').
  const extractMinutesFromYoastString = (timeStr) => {
    const match = timeStr?.match(/^([\d]+)\s[a-zA-Z]+$/);
    if (!match) return timeStr;
    return parseInt(match[1], 10);
  };

  // Given the number of minutes, we get the localized string. Because '1' tends
  // to be followed by a singular word 'minutes' in many languages,
  // we need to take this into account.
  const getTranslatedMinutes = (minutes, lang) => {
    const localeStrings = LOCALE_STRINGS_MINUTES[lang];
    return minutes === 1 ? localeStrings.singular : localeStrings.plural;
  };

  try {
    const minutesInt = extractMinutesFromYoastString(yoastEstReadingTime);

    // If wpLocale has been set, then we'll have to resort to the mapping to check
    // the corresponding Transifex live based locale entry we want to use.
    const locale = wpLocale ? WP_POST_LOCALE_TO_TX_MAPPING[wpLocale] : txLocale;

    const minutesWord = getTranslatedMinutes(minutesInt, locale);

    // There are instances in which this information isn't returned with the yoast data.
    // Returning null here will allow the components to hide the pipe | and estimated
    // reading time entirely
    if (!minutesInt) return null;

    return `${minutesInt} ${minutesWord}`;
  } catch {
    return yoastEstReadingTime;
  }
};

export default useLocalizeYoastReadingTime;
