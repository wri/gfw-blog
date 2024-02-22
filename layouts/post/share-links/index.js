import React from 'react';
import PropTypes from 'prop-types';

import { trackEvent } from 'utils/analytics';

// import InstagramIcon from 'assets/icons/instagram-green.svg';
// import XIcon from 'assets/icons/x-green.svg';
// import FacebookIcon from 'assets/icons/fb-green.svg';

import { ButtonsContainer } from './styles';

const TWITT_SHARE_URL = 'https://twitter.com/share';
const FB_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php?u=';
const INSTA_URL = 'https://www.instagram.com/globalforests';

const ShareLinks = ({ url, title }) => (
  <ButtonsContainer>
    <a
      href={INSTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="instagram"
    >
      <button
        onClick={() =>
          trackEvent({
            category: 'Share',
            label: 'User goaes to GFW Intagram profile',
            action: 'Instagram',
          })}
      >
        {/* <InstagramIcon /> */}
      </button>
    </a>
    <a
      href={`${TWITT_SHARE_URL}?url=${url}&text=${title}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="X"
    >
      <button
        onClick={() =>
          trackEvent({
            category: 'Share',
            label: 'User shares a blog post',
            action: 'X',
          })}
      >
        {/* <XIcon /> */}
      </button>
    </a>
    <a
      href={`${FB_SHARE_URL}${url}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="facebook"
    >
      <button
        onClick={() =>
          trackEvent({
            category: 'Share',
            label: 'User shares a blog post',
            action: 'Facebook',
          })}
      >
        {/* <FacebookIcon /> */}
      </button>
    </a>
  </ButtonsContainer>
);

ShareLinks.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};

export default ShareLinks;
