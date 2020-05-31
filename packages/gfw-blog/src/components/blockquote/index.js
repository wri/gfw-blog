import React from 'react';
import PropTypes from 'prop-types';
import { Button, TwitterIcon } from 'gfw-components';
import { css } from 'frontity';

import BlockquoteWrapper from './styles';

const TWITT_SHARE_URL = 'https://twitter.com/share';

const Blockquote = ({ children }) => (
  <BlockquoteWrapper>
    {children}
    <a
      href={`${TWITT_SHARE_URL}?text=${children.props.children}`}
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
