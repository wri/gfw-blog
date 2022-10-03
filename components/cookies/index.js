import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { CookiesBanner, theme } from 'gfw-components';

import { trackEvent, initAnalytics, trackPage } from 'utils/analytics';

const Cookies = () => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const agreeCookies = JSON.parse(localStorage.getItem('agreeCookies'));
    setAccepted(agreeCookies);
  }, []);

  useEffect(() => {
    initAnalytics();
    trackPage();
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('agreeCookies', true);
    setAccepted(true);
    trackEvent({
      category: 'Cookies banner',
      action: 'User accepts cookies',
      label: 'cookies',
    });
  };

  return (
    <>
      {!accepted && (
        <CookiesWrapper>
          <CookiesBanner onAccept={acceptCookies} />
        </CookiesWrapper>
      )}
    </>
  );
};

const CookiesWrapper = styled.div`
  position: fixed;
  z-index: 99999;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  bottom: 0;

  ${theme.mediaQueries.small} {
    max-width: 620px;
    bottom: 30px;
  }
`;

export default Cookies;
