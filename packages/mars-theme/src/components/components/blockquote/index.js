import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'frontity';
import { Button, TwitterIcon } from 'gfw-components';

const TWITT_SHARE_URL = 'https://twitter.com/share';

const Blockquote = ({ children }) => (
  <>
    <blockquote>{children}</blockquote>
    <a
      href={`${TWITT_SHARE_URL}?text=${children.props.children}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="twitter"
    >
      <Button
        css={css`
          border: none;
        `}
        theme="button-light round big"
      >
        <TwitterIcon />
      </Button>
    </a>
  </>
);

export default Blockquote;

Blockquote.propTypes = {
  children: PropTypes.node,
};
