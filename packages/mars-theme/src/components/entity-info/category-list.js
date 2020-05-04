import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { Loader } from 'gfw-components';
import { Item } from './components';
import Link from '../link';

const CATEGORIES_PER_PAGE = 10;

const CategoryList = ({
  state,
  libraries,
  handler,
  fetched,
  fetchedHandler,
}) => {
  const data = state.source.get(state.router.link);
  const { api } = libraries.source;
  const totalNumber = Object.values(state.source.category).length;

  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isRedy, setIsReady] = useState(false);

  const fetchCategories = useCallback(() => {
    setIsFetching(true);
    if (page) {
      const result = api.get({
        endpoint: 'categories',
        params: { _embed: true, page, orderby: 'count', order: 'desc' },
      });
      result.then((response) => {
        libraries.source.populate({ response, state, force: true });
        fetchedHandler(true);
      });
    }
  }, [page, setIsFetching]);

  useEffect(() => {
    if (page && !isFetching && !isRedy) {
      fetchCategories(page);
    }
  }, [page, isFetching, isRedy]);

  useEffect(() => {
    if (totalNumber < CATEGORIES_PER_PAGE && !fetched) {
      setPage(page + 1);
    }
  }, []);

  const [categories, setCategories] = useState(
    Object.values(state.source.category).sort((prev, next) => {
      return next.count - prev.count;
    })
  );

  useEffect(() => {
    const allCategories = Object.values(state.source.category)
      .filter((cat) => cat.count)
      .sort((prev, next) => {
        return next.count - prev.count;
      });
    setCategories(allCategories);
    if (page) {
      setIsFetching(false);
      setIsReady(true);
    }
  }, [totalNumber, setCategories, setPage, setIsFetching, setIsReady]);

  if (isFetching) {
    return <Loader />;
  }

  return categories.map((cat) => {
    if (!cat.count) {
      return null;
    }
    return (
      <Item
        key={cat.name + cat.id}
        className={data.id === cat.id ? `current` : ``}
        onClick={handler}
      >
        <Link link={cat.link}>
          {cat.name}
          &nbsp; (
          {cat.count}
          )
        </Link>
      </Item>
    );
  });
};

export default connect(CategoryList);

CategoryList.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
  handler: PropTypes.func,
};
