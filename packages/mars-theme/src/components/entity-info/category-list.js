import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { Loader } from 'gfw-components';
import { Item } from './components';
import Link from '../link';
import TopEntitiesContext from '../heplers/context';

const CategoryList = ({ state, libraries, handler }) => {
  const data = state.source.get(state.router.link);
  const { api } = libraries.source;
  const totalNumber = Object.values(state.source.category).length;

  const context = useContext(TopEntitiesContext);
  const [page, setPage] = useState(0);
  const [isRedy, setIsReady] = useState(false);

  const fetchCategories = useCallback(() => {
    if (page) {
      const result = api.get({
        endpoint: 'categories',
        params: { _embed: true, page, orderby: 'count', order: 'desc' },
      });
      result.then((response) => {
        libraries.source.populate({ response, state, force: true });
        context.setEntity('categories');
      });
    }
  }, [page]);

  useEffect(() => {
    if (page && !isRedy) {
      fetchCategories(page);
    }
  }, [page, isRedy]);

  useEffect(() => {
    if (!context.data.categories) {
      setPage(page + 1);
    }
  }, []);

  const [categories, setCategories] = useState(
    Object.values(state.source.category).sort((prev, next) => {
      return next.count - prev.count;
    })
  );

  useEffect(() => {
    if (page) {
      const allCategories = Object.values(state.source.category)
        .filter((cat) => cat.count)
        .sort((prev, next) => {
          return next.count - prev.count;
        });
      setCategories(allCategories);
      setIsReady(true);
    }
  }, [totalNumber, setCategories, setPage, setIsReady]);

  if (!context.data.categories) {
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
