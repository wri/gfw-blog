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
 * @param {string} yoastHeadJson yoast_head_json as returned by the API
 * @returns {string} with the localized minutes
 */
const useTranslateYoastReadingTime = (yoastHeadJson) => {
  // Get the estimated reading time string from yoast data
  const yoastEstReadingTime =
    yoastHeadJson?.twitter_misc?.['Est. reading time'] || '';

  // Check local storage for the language code Transifex live sets, return the code
  // to be used when picking a localized string for minutes.
  const getTxLiveLanguage = () => {
    try {
      const txLiveLanguage = JSON.parse(
        localStorage?.getItem('txlive:selectedlang')
      );
      return txLiveLanguage;
    } catch {
      return 'en';
    }
  };

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
    const language = getTxLiveLanguage();
    const minutesInt = extractMinutesFromYoastString(yoastEstReadingTime);
    const minutesWord = getTranslatedMinutes(minutesInt, language);

    // 
    if (!minutesInt) return null;

    return `${minutesInt} ${minutesWord}`;
  } catch {
    return yoastEstReadingTime;
  }
};

export default useTranslateYoastReadingTime;
