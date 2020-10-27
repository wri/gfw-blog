import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import TwitterConvTrkr from 'react-twitter-conversion-tracker';

import ReactPixel from 'utils/facebook-pixel';

const IS_BROWSER = typeof window !== 'undefined';

export const initAnalytics = () => {
  if (IS_BROWSER) {
    const agreeCookies = localStorage.getItem('agreeCookies');
    if (agreeCookies) {
      window.ANALYTICS_INITIALIZED = true;
      ReactGA.initialize(process.env.NEXT_PUBLIC_ANALYTICS_PROPERTY_ID);
      ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID);
      TwitterConvTrkr.init(process.env.NEXT_PUBLIC_TWITTER_CONVERSION_ID);
    }
  }
};

export const trackPage = (url) => {
  if (IS_BROWSER && window.ANALYTICS_INITIALIZED) {
    const pageUrl =
      url || `${window.location.pathname}${window.location.search}`;
    ReactGA.set({ page: pageUrl });
    ReactGA.pageview(pageUrl);
    ReactPixel.pageView();
    TwitterConvTrkr.pageView();
  }
};

export const trackEvent = (event) => {
  if (IS_BROWSER && window.ANALYTICS_INITIALIZED) {
    ReactGA.event(event);
  }
};

export const useTrackPage = () => {
  const { asPath } = useRouter();
  const fullPathname = asPath?.split('?')?.[0];

  useEffect(() => {
    if (!window.ANALYTICS_INITIALIZED) {
      initAnalytics();
    }
    trackPage();
  }, [fullPathname]);
};
