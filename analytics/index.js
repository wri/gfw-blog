import ReactGA from 'react-ga';
import ReactPixel from 'utils/facebook-pixel';
import TwitterConvTrkr from 'react-twitter-conversion-tracker';

const IS_BROWSER = typeof window !== 'undefined';

export const initAnalytics = () => {
  if (IS_BROWSER) {
    ReactGA.initialize(process.env.NEXT_PUBLIC_ANALYTICS_PROPERTY_ID);
    ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID);
    TwitterConvTrkr.init(process.env.NEXT_PUBLIC_TWITTER_CONVERSION_ID);
  }
};

export const handlePageTrack = () => {
  const url = `${window.location.pathname}${window.location.search}`;
  ReactGA.set({ page: url });
  ReactGA.pageview(url);
  ReactPixel.pageView();
  TwitterConvTrkr.pageView();
};
