import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'frontity';
import { Button, TwitterIcon, FacebookIcon } from 'gfw-components';
import theme from '../../../app/theme';

import NewsletterIcon from '../../../assets/icons/envelope.svg';
import ChatIcon from '../../../assets/icons/comment.svg';

import { ButtonsContainer, Label } from './styles';

const TWITT_SHARE_URL = 'https://twitter.com/share';
const FB_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php?u=';

const ShareLinks = ({ url, title, scrollToComment }) => (
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
        light
        round
        big
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
        light
        round
        big
      >
        <FacebookIcon />
      </Button>
    </a>
    <Button
      css={css`
        border-color: #f0f0f0;
      `}
      light
      round
      big
      onClick={scrollToComment}
    >
      <img src={ChatIcon} alt="" />
    </Button>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.globalforestwatch.org/subscribe"
    >
      <Button
        round
        big
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
  scrollToComment: PropTypes.func,
};

export default ShareLinks;
