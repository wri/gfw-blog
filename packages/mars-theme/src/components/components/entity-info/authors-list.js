import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { Loader } from 'gfw-components';
import { Item } from './components';
import Link from '../link';
import TopEntitiesContext from '../heplers/context';

const AuthorList = ({ state, libraries, actions, handler }) => {
  const data = state.source.get(state.router.link);
  const { api } = libraries.source;
  const totalNumber = Object.values(state.source.author).length;

  const context = useContext(TopEntitiesContext);
  const [page, setPage] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const fetchAuthors = useCallback(() => {
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
              context.setEntity('authors');
            });
          });
      });
    }
  }, [page, setIsReady]);

  useEffect(() => {
    if (page && !isReady) {
      fetchAuthors();
    }
  }, [page, isReady]);

  useEffect(() => {
    if (!context.data.authors) {
      setPage(page + 1);
    }
  }, []);

  const [authors, setAuthors] = useState(
    Object.values(state.source.author).map(({ id }) => id)
  );

  useEffect(() => {
    if (page && isReady) {
      const allAuthors = Object.values(state.source.author).map(({ id }) => id);
      setAuthors(allAuthors);
    }
  }, [totalNumber, page, setAuthors, setPage, isReady]);

  if (!context.data.authors) {
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
