import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'frontity';
import { Button } from 'gfw-components';
import TwitterIcon from '../assets/icons/social/twitter-1.svg';

const Blockquote = ({ children }) => (
  <>
    <blockquote>{children}</blockquote>
    <Button
      css={css`
        border: none;
      `}
      theme="button-light round big"
    >
      <img src={TwitterIcon} alt="" />
    </Button>
  </>
);

export default Blockquote;

Blockquote.propTypes = {
  children: PropTypes.node,
};
