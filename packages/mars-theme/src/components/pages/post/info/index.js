import React from 'react';
import { css } from 'frontity';
import PropTypes from 'prop-types';

import { Button, TwitterIcon, FacebookIcon } from 'gfw-components';
import theme from '../../../theme';

import NewsletterIcon from '../../../../assets/icons/social/envelope.svg';
import ChatIcon from '../../../../assets/icons/social/comment.svg';

import Link from '../../../components/link';

import {
  Wrapper,
  InfoContainer,
  InfoItem,
  BoldTitle,
  ButtonsContainer,
  Label,
} from './styles';

const TWITT_SHARE_URL = 'https://twitter.com/share';
const FB_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php?u=';

const PostInfo = ({ data = {}, author, dateStr, fullUrl, title }) => {
  const scrollTocomment = (e) => {
    e.preventDefault();
    const el = document.getElementById('add-comment-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Wrapper>
      {data.isPost && (
        <InfoContainer>
          {author && (
            <InfoItem>
              <BoldTitle>By&nbsp;</BoldTitle>
              <Link link={author.link}>{author.name}</Link>
            </InfoItem>
          )}
          <InfoItem>
            <BoldTitle>Posted on&nbsp;</BoldTitle>
            <div>{dateStr}</div>
          </InfoItem>
          <InfoItem>
            <BoldTitle>Languages&nbsp;</BoldTitle>
            <div>Léelo en español</div>
          </InfoItem>
        </InfoContainer>
      )}
      <ButtonsContainer>
        <a
          href={`${TWITT_SHARE_URL}?url=${fullUrl}&text=${title}`}
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
          href={`${FB_SHARE_URL}${fullUrl}`}
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
    </Wrapper>
  );
};

PostInfo.propTypes = {
  data: PropTypes.object,
  author: PropTypes.string,
  dateStr: PropTypes.string,
  fullUrl: PropTypes.string,
  title: PropTypes.string,
};

export default PostInfo;
