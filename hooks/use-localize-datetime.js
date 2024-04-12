import dateFnsformat from 'date-fns/format';
import { enUS, es, ptBR, zhCN, fr, id } from 'date-fns/locale';

const TX_LANGUAGE_TO_DATEFNS_LOCALE_MAPPING = {
  en: enUS,
  zh: zhCN,
  fr,
  id,
  pt_BR: ptBR,
  es_MX: es,
};

const useLocalizeDatetime = (dateTime, format = 'PP') => {
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

  return dateFnsformat(new Date(dateTime), format, {
    locale: getDateFnsLocale(),
  });
};

export default useLocalizeDatetime;
