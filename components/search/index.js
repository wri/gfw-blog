import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { Row, Column, theme } from '@worldresources/gfw-components';
import CategoryList from 'components/category-list';

import SearchIconSrc from 'assets/icons/search-white-icon.svg';
import ChevronDownWhiteSrc from 'assets/icons/chevron-down-white.svg';
import ChevronUpWhiteSrc from 'assets/icons/chevron-up-white.svg';

import TopicsList from 'components/topics-list';
import { Wrapper, Container, Input } from './styles';

const Search = ({
  actions,
  libraries,
  state,
  categories,
  topics,
  ...props
}) => {
  const { query, push } = useRouter();
  const [selectedCategories, setSelectedCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [showTopics, setShowTopics] = useState(false);

  const searchQuery = query?.query ? decodeURI(query?.query) : '';
  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    const categoriesString = query?.categories || '';

    if (categoriesString !== '') {
      const slugs = categoriesString.split(',');

      setSelectedCategories(slugs);
    }
  }, []);

  const handleSelectedCollection = (slug, collection, func) => {
    const slugs = [...collection];

    if (slugs.includes(slug)) {
      slugs.splice(
        slugs.findIndex((s) => slug === s),
        1
      );
    } else {
      slugs.push(slug);
    }

    func(slugs);
  };

  const handleSearch = () => {
    if (selectedCategories.length !== 0) {
      const categoriesString = selectedCategories.join(',');

      push(`/search?search=${search}&categories=${categoriesString}`);
      return;
    }

    // TODO: add tags

    push(`/search?search=${search}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const inputRef = React.createRef();

  return (
    <>
      <Wrapper className="notranslate" {...props}>
        <Row>
          <Column
            css={css`
              order: 2;
              margin-top: 2rem;
              display: flex;

              ${theme.mediaQueries.small} {
                order: 1;
                margin-top: 0;
              }
            `}
            width={[1, 3 / 4]}
          >
            {categories && (
              <CategoryList
                title="categories"
                categories={categories}
                selectedCategories={selectedCategories}
                onSelectCategory={(category) =>
                  handleSelectedCollection(
                    category,
                    selectedCategories,
                    setSelectedCategories
                  )}
                css={css`
                  ${theme.mediaQueries.small} {
                    min-height: 3.75rem;
                  }
                `}
              >
                <div className="topics-container">
                  <button
                    className="topics-button"
                    onClick={() => setShowTopics(!showTopics)}
                  >
                    <span>TOPICS</span>
                    <span className="chevron">
                      {showTopics ? (
                        <ChevronUpWhiteSrc />
                      ) : (
                        <ChevronDownWhiteSrc />
                      )}
                    </span>
                  </button>
                </div>
              </CategoryList>
            )}
          </Column>
          <Column
            css={css`
              order: 1;

              ${theme.mediaQueries.small} {
                order: 2;
              }
            `}
            width={[1, 1 / 4]}
          >
            <Container>
              <Input
                css={css`
                  background-color: #333333;
                  font-size: 0.875rem;
                  font-weight: 500;
                  line-height: 0.875rem;
                  letter-spacing: 0.016rem;
                  color: #ffffff !important;
                  width: 75%;
                  height: 80%;

                  ::placeholder {
                    color: #ffffff;
                    opacity: 1;
                  }
                `}
                ref={inputRef}
                value={search}
                placeholder="SEARCH GFW BLOG"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div style={{ marginRight: '0.875rem' }}>
                <button onClick={handleSearch}>
                  <SearchIconSrc />
                </button>
              </div>
            </Container>
          </Column>
        </Row>
        {showTopics && (
          <div className="hidden-content">
            <TopicsList
              topics={topics}
              onSelectTopic={(topic) =>
                handleSelectedCollection(
                  topic,
                  selectedTopics,
                  setSelectedTopics
                )}
              selectedTopics={selectedTopics}
            />
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default Search;

Search.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  libraries: PropTypes.object,
  categories: PropTypes.array,
  topics: PropTypes.array,
};
