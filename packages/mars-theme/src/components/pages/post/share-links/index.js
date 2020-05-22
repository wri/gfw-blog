import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'frontity';
import { Button, TwitterIcon, FacebookIcon } from 'gfw-components';
import theme from '../../../theme';

import NewsletterIcon from '../../../../assets/icons/social/envelope.svg';
import ChatIcon from '../../../../assets/icons/social/comment.svg';

import { ButtonsContainer, Label } from './styles';

const TWITT_SHARE_URL = 'https://twitter.com/share';
const FB_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php?u=';

const ShareLinks = ({ url, title, scrollTocomment }) => (
  <ButtonsContainer>
    <a
      href={`${TWITT_SHARE_URL}?url=${url}&text=${title}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="twitter"
    >
      <Button
        css={css`
          border-color: #f0f0f0;
          svg {
            width: 20px;
            height: 20px;
          }
        `}
        theme="button-light round big"
      >
        <TwitterIcon />
      </Button>
    </a>
    <a
      href={`${FB_SHARE_URL}${url}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="facebook"
    >
      <Button
        css={css`
          border-color: #f0f0f0;
          svg {
            width: 20px;
            height: 20px;
          }
        `}
        theme="button-light round big"
      >
        <FacebookIcon />
      </Button>
    </a>
    <a href="#" onClick={scrollTocomment}>
      <Button
        css={css`
          border-color: #f0f0f0;
        `}
        theme="button-light round big"
      >
        <img src={ChatIcon} alt="" />
      </Button>
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.globalforestwatch.org/subscribe"
    >
      <Button
        theme="round big"
        css={css`
          ${theme.mediaQueries.small} {
            margin-top: 20px;
          }
        `}
      >
        <img src={NewsletterIcon} alt="" />
      </Button>
    </a>
    <Label>
      Subscribe to the
      <br />
      GFW newsletter
    </Label>
  </ButtonsContainer>
);

ShareLinks.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  scrollTocomment: PropTypes.func,
};

export default ShareLinks;
