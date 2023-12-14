import React from 'react';
import PropTypes from 'prop-types';
import { Button, TwitterIcon } from '@worldresources/gfw-components';
import { css } from '@emotion/core';

import BlockquoteWrapper from './styles';

const TWITT_SHARE_URL = 'https://twitter.com/share';

const Blockquote = ({ children }) => (
  <BlockquoteWrapper>
    {children}
    <a
      href={`${TWITT_SHARE_URL}?text=${children?.[0]?.props?.children?.[0]}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="twitter"
    >
      <Button
        css={css`
          margin-top: 1.5625rem;
          border-color: #f0f0f0;
          svg {
            width: 1.25rem;
            height: 1.25rem;
            margin: 0;
          }
        `}
        light
        size="large"
        round
      >
        <TwitterIcon />
      </Button>
    </a>
  </BlockquoteWrapper>
);

export default Blockquote;

Blockquote.propTypes = {
  children: PropTypes.node,
};
