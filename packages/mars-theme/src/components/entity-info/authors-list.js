import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { Loader } from 'gfw-components';
import { Item } from './components';
import Link from '../link';

const AUTHORS_PER_PAGE = 10;

const AuthorList = ({
  state,
  libraries,
  actions,
  handler,
  fetched,
  fetchedHandler,
}) => {
  const data = state.source.get(state.router.link);
  const { api } = libraries.source;
  const totalNumber = Object.values(state.source.author).length;

  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const fetchAuthors = useCallback(() => {
    setIsFetching(true);
    if (page) {
      const result = api.get({
        endpoint: 'users',
        params: { _embed: true, page },
      });
      result.then((response) => {
        libraries.source
          .populate({ response, state, force: true })
          .then((fetchedData) => {
            const fetches = [];
            fetchedData.forEach(({ link }) => {
              if (!state.source.data[link].isReady)
                fetches.push(actions.source.fetch(link));
            });
            Promise.all(fetches).then(() => {
              setIsReady(true);
              fetchedHandler(true);
            });
          });
      });
    }
  }, [page, setIsFetching, setIsReady]);

  useEffect(() => {
    if (page && !isFetching && !isReady) {
      fetchAuthors();
    }
  }, [page, isFetching, isReady]);

  useEffect(() => {
    if (totalNumber < AUTHORS_PER_PAGE && !fetched) {
      setPage(page + 1);
    }
  }, []);

  const [authors, setAuthors] = useState(
    Object.values(state.source.author).map(({ id }) => id)
  );

  useEffect(() => {
    const allAuthors = Object.values(state.source.author).map(({ id }) => id);
    setAuthors(allAuthors);
    if (page && isReady) {
      setIsFetching(false);
    }
  }, [totalNumber, page, setAuthors, setPage, setIsFetching, isReady]);

  if (isFetching) {
    return <Loader />;
  }

  return authors
    .sort((prev, next) => {
      return (
        state.source.data[state.source.author[next].link].total -
        state.source.data[state.source.author[prev].link].total
      );
    })
    .map((id) => {
      return (
        <Item
          key={id}
          className={data.id === id ? `current` : ``}
          onClick={handler}
        >
          <Link link={state.source.author[id].link}>
            {state.source.author[id].name}
            &nbsp; (
            {state.source.data[state.source.author[id].link].total || 0}
            )
          </Link>
        </Item>
      );
    });
};

export default connect(AuthorList);

AuthorList.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
  actions: PropTypes.object,
  handler: PropTypes.func,
};
