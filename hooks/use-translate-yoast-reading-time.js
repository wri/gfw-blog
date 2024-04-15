const LOCALE_STRINGS = {
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

const useTranslateYoastReadingTime = (yoast_head_json) => {
  const yoastEstReadingTime = yoast_head_json?.twitter_misc?.['Est. reading time'] || '';

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

  const extractMinutesFromYoastString = (timeStr) => {
    const match = timeStr?.match(/^([\d]+)\s[a-zA-Z]+$/);
    if (!match) return timeStr;
    return parseInt(match[1], 10);
  };

  const getTranslatedMinutes = (minutes, lang) => {
    const localeStrings = LOCALE_STRINGS[lang];
    return (minutes === 1) ? localeStrings.singular : localeStrings.plural;
  };

  try {
    const language = getTxLiveLanguage();
    const minutesInt = extractMinutesFromYoastString(yoastEstReadingTime);
    const minutesWord = getTranslatedMinutes(minutesInt, language);

    return `${minutesInt} ${minutesWord}`;
  } catch {
    return yoastEstReadingTime;
  } 
};

export default useTranslateYoastReadingTime;
