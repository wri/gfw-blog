import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import FilterArrowIcon from 'assets/icons/filter-arrow.svg';
import FilterArrowUpIcon from 'assets/icons/filter-arrow-up.svg';
import CloseWhiteIcon from 'assets/icons/close-white.svg';
import { Column } from '@worldresources/gfw-components';

import FilterDropDown from 'components/filter-dropdown';
import {
  Wrapper,
  FilterByWrapper,
  FilterByColumn,
  FilterByTopic,
  FilterByCategory,
  PillContainerWrapper,
} from './styles';

const Filter = ({
  children,
  categories,
  topics,
  selectedCategories,
  selectedTopics,
  handleSelectedCategory,
  handleSelectedTopic,
}) => {
  const [isTopicsDrodownOpen, setIsTopicsDropdownOpen] = useState(false);
  const [isCategoriesDrodownOpen, setIsCategoriesDropdownOpen] = useState(
    false
  );

  const handleTopicsOpen = () => {
    setIsTopicsDropdownOpen(!isTopicsDrodownOpen);
    setIsCategoriesDropdownOpen(false);
  };

  const handleCategoriesOpen = () => {
    setIsCategoriesDropdownOpen(!isCategoriesDrodownOpen);
    setIsTopicsDropdownOpen(false);
  };

  return (
    <Wrapper>
      <FilterByWrapper>
        <Column
          css={css`
            display: flex;
          `}
        >
          <FilterByColumn>
            <FilterByCategory>FILTER BY CATEGORY</FilterByCategory>
            <button onClick={handleCategoriesOpen}>
              {isCategoriesDrodownOpen ? (
                <FilterArrowUpIcon />
              ) : (
                <FilterArrowIcon />
              )}
            </button>
          </FilterByColumn>
          <FilterByColumn>
            <FilterByTopic>FILTER BY TOPIC</FilterByTopic>
            <button onClick={handleTopicsOpen}>
              {isTopicsDrodownOpen ? (
                <FilterArrowUpIcon />
              ) : (
                <FilterArrowIcon />
              )}
            </button>
          </FilterByColumn>
        </Column>
        <Column>{children}</Column>
      </FilterByWrapper>
      {isCategoriesDrodownOpen && (
        <FilterDropDown
          items={categories}
          selectedItems={selectedCategories}
          handleSelectItem={handleSelectedCategory}
          margin="1rem"
          onBlur={() => setIsCategoriesDropdownOpen(!isCategoriesDrodownOpen)}
        />
      )}
      {isTopicsDrodownOpen && (
        <FilterDropDown
          items={topics}
          selectedItems={selectedTopics}
          handleSelectItem={handleSelectedTopic}
          margin="12rem"
          onBlur={() => setIsTopicsDropdownOpen(!isTopicsDrodownOpen)}
        />
      )}
      <PillContainerWrapper>
        <div>
          {selectedCategories.map((item) => (
            <span key={item} className="category">
              {categories.find((c) => c.slug === item)?.name}
              &nbsp;
              <button onClick={() => handleSelectedCategory(item)}>
                <CloseWhiteIcon />
              </button>
            </span>
          ))}
        </div>
        <div>
          {selectedTopics.map((item) => (
            <span key={item} className="topic">
              {topics.find((t) => t.slug === item)?.name}
              &nbsp;
              <button onClick={() => handleSelectedTopic(item)}>
                <CloseWhiteIcon />
              </button>
            </span>
          ))}
        </div>
      </PillContainerWrapper>
    </Wrapper>
  );
};

Filter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  topics: PropTypes.array,
  categories: PropTypes.array,
  selectedCategories: PropTypes.array,
  selectedTopics: PropTypes.array,
  handleSelectedTopic: PropTypes.func,
  handleSelectedCategory: PropTypes.func,
};

export default Filter;
