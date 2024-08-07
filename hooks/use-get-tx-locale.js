const useGetTxLocale = () => {
  try {
    const txLiveLanguage = JSON.parse(
      localStorage?.getItem('txlive:selectedlang')
    );

    return txLiveLanguage === null ? 'en' : txLiveLanguage;
  } catch {
    return 'en';
  }
};

export default useGetTxLocale;
