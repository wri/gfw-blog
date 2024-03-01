import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

import { Row, Column } from '@worldresources/gfw-components';

const RowAbstraction = (props) => (
  <Row
    {...props}
    css={css(
      {
        maxWidth: '81.25rem',
      },
      props?.css && props.css
    )}
  >
    {props.children}
  </Row>
);

const ColumnAbstraction = (props) => (
  <Column {...props}>{props.children}</Column>
);

RowAbstraction.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  css: PropTypes.any,
};

ColumnAbstraction.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  css: PropTypes.any,
};

export { ColumnAbstraction as Column, RowAbstraction as Row };
