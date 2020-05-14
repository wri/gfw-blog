import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled, connect } from 'frontity';
import { useDebounce } from 'use-debounce';
import { KeyWordsList, InputWrapper, SearchIcon } from './components';
import { SMALL_ENDPOINT } from '../heplers/css-endpoints';

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #aaa;
  border: 0;
  z-index: 8;
  font-size: 1.375rem;
  line-height: 1.25;
  padding: 1rem;
  @media screen and (max-width: ${SMALL_ENDPOINT}) {
    padding-left: 0;
  }
`;

const Input = ({
  actions,
  libraries,
  state,
  inputClickHandler,
  resetHandler,
  defaultValue = '',
}) => {
  const { api } = libraries.source;
  const [input, setInput] = useState(defaultValue);
  const [query] = useDebounce(input, 600);
  const ref = useRef();

  const inputHandler = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      resetHandler();
      actions.router.set(`?s=${input}`);
    }
  };

  const runSearch = (keyWord) => {
    actions.router.set(`?s=${keyWord}`);
    actions.theme.toggleSearch();
  };

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    ref.current.focus();
  }, [defaultValue]);

  useEffect(() => {
    if (query && query.length > 1) {
      const tagsResult = api.get({
        endpoint: 'tags',
        params: { _embed: true, search: query, per_page: 50 },
      });
      const categoriesResult = api.get({
        endpoint: 'categories',
        params: { _embed: true, search: query, per_page: 50 },
      });

      tagsResult.then((response) => {
        libraries.source.populate({ response, state }).then((fetchedData) => {
          setTags(
            fetchedData.map((element) => {
              return state.source.tag[element.id].name;
            })
          );
        });
      });

      categoriesResult.then((response) => {
        libraries.source.populate({ response, state }).then((fetchedData) => {
          setCategories(
            fetchedData.map((element) => {
              return state.source.category[element.id].name;
            })
          );
        });
      });
    }
  }, [query, setKeywords]);

  useEffect(() => {
    try {
      const re = new RegExp(`(${query})`, 'i');
      setKeywords(
        [...tags, ...categories]
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

  return (
    <>
      <InputWrapper>
        <StyledInput
          ref={ref}
          type="text"
          name="search"
          value={input}
          onClick={inputClickHandler}
          onChange={inputHandler}
          onKeyDown={keyDownHandler}
          placeholder="Search the GFW blog  (eg. fires, Brazil, palm oil)"
        />
        <SearchIcon />
      </InputWrapper>
      {input && (
        <KeyWordsList
          keywords={keywords}
          query={query}
          input={input}
          search={runSearch}
        />
      )}
    </>
  );
};

export default connect(Input);

Input.propTypes = {
  actions: PropTypes.object,
  libraries: PropTypes.object,
  state: PropTypes.object,
  inputClickHandler: PropTypes.func,
  resetHandler: PropTypes.func,
  defaultValue: PropTypes.string,
};
