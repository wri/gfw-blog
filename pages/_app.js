import { CacheProvider } from '@emotion/core';
import { cache } from 'emotion';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
