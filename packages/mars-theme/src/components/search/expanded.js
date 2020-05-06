import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import TopEntitiesContext from '../heplers/context';
import Input from './input';
import {
  SearchInputWrapper,
  KeyWordsList,
  InputWrapper,
  SearchIcon,
} from './components';

const debounce = require('debounce');

const SearchExpanded = ({ state, actions, libraries, ...props }) => {
  const [keywords, setKeywords] = useState([]);
  const context = useContext(TopEntitiesContext);
  const { tags, categories, query } = context.search;
  const { api } = libraries.source;

  const handler = () => {
    context.search.toggleSearch();
  };

  const inputClickHandler = (e) => {
    e.stopPropagation();
  };

  const searchHandler = debounce((str) => {
    context.search.setQuery(str);
  }, 200);

  const runSearch = (keyWord) => {
    actions.router.set(`?s=${keyWord}`);
    context.search.toggleSearch();
  };

  useEffect(() => {
    const tagsKeywords = tags.map((tag) => state.source.tag[tag].name);
    const categoriesKeywords = categories.map(
      (cat) => state.source.category[cat].name
    );

    try {
      const re = new RegExp(`(${query})`, 'i');
      setKeywords(
        [...tagsKeywords, ...categoriesKeywords]
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          })
          .map((word) => {
            return {
              initial: word,
              rendered: word.replace(re, `<b>$1</b>`),
            };
          })
      );
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }, [tags, categories, state, setKeywords, query]);

  useEffect(() => {
    if (query) {
      const tagsResult = api.get({
        endpoint: 'tags',
        params: { _embed: true, search: query },
      });
      const categoriesResult = api.get({
        endpoint: 'categories',
        params: { _embed: true, search: query },
      });

      tagsResult.then((response) => {
        libraries.source.populate({ response, state }).then((fetchedData) => {
          context.search.setTags(
            fetchedData.map((element) => {
              return element.id;
            })
          );
        });
      });

      categoriesResult.then((response) => {
        libraries.source.populate({ response, state }).then((fetchedData) => {
          context.search.setCategories(
            fetchedData.map((element) => {
              return element.id;
            })
          );
        });
      });
    }
  }, [query]);

  if (!context.search.active) {
    return null;
  }
  return (
    <Wrapper {...props}>
      <MiddleWrapper>
        <SearchInputWrapper>
          <InputWrapper>
            <Input
              defaultValue={context.search.query}
              inputClickHandler={inputClickHandler}
              searchHandler={searchHandler}
              resetHandler={handler}
            />
            <SearchIcon />
          </InputWrapper>
          {!!keywords.length && (
            <KeyWordsList
              keywords={keywords}
              query={context.search.query}
              search={runSearch}
            />
          )}
        </SearchInputWrapper>
      </MiddleWrapper>
    </Wrapper>
  );
};

export default connect(SearchExpanded);

SearchExpanded.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  libraries: PropTypes.object,
};

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
`;

const MiddleWrapper = styled.div`
  width: 100%;
  position relative;
  display: flex;
  justify-content: center;
`;
