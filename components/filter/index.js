import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import FilterArrowIcon from 'assets/icons/filter-arrow.svg';
import { Column } from '@worldresources/gfw-components';

import {
  FilterByWrapper,
  FilterByColumn,
  FilterByTopic,
  FilterByCategory,
} from './styles';

const Filter = ({ children }) => {
  return (
    <FilterByWrapper>
      <Column
        css={css`
          display: flex;
        `}
      >
        <FilterByColumn>
          <FilterByCategory>FILTER BY CATEGORY</FilterByCategory>
          <FilterArrowIcon />
        </FilterByColumn>
        <FilterByColumn>
          <FilterByTopic>FILTER BY TOPIC</FilterByTopic>
          <FilterArrowIcon />
        </FilterByColumn>
      </Column>
      <Column>{children}</Column>
    </FilterByWrapper>
  );
};

Filter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Filter;
