import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

import { Column } from '@worldresources/gfw-components';

const ColumnAbstraction = (props) => (
  <Column
    {...props}
    css={css`
      max-width: 81.25rem;
    `}
  >
    {props.children}
  </Column>
);

ColumnAbstraction.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ColumnAbstraction;
