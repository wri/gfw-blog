import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { Loader } from 'gfw-components';
import { Item } from './components';
import Link from '../link';
import TopEntitiesContext from '../heplers/context';

const TagList = ({ state, libraries, handler }) => {
  const data = state.source.get(state.router.link);
  const { api } = libraries.source;
  const totalNumber = Object.values(state.source.tag).filter((tag) => tag.count)
    .length;

  const context = useContext(TopEntitiesContext);
  const [page, setPage] = useState(0);
  const [isRedy, setIsReady] = useState(false);

  const fetchTags = useCallback(() => {
    if (page) {
      const result = api.get({
        endpoint: 'tags',
        params: { _embed: true, page, orderby: 'count', order: 'desc' },
      });
      result.then((response) => {
        libraries.source.populate({ response, state, force: true });
        context.setEntity('tags');
      });
    }
  }, [page]);

  useEffect(() => {
    if (page && !isRedy) {
      fetchTags(page);
    }
  }, [page, isRedy]);

  useEffect(() => {
    if (!context.data.tags) {
      setPage(page + 1);
    }
  }, []);

  const [tags, setTags] = useState(
    Object.values(state.source.tag)
      .filter((tag) => tag.count)
      .sort((prev, next) => {
        return next.count - prev.count;
      })
  );

  useEffect(() => {
    if (page) {
      const allTags = Object.values(state.source.tag)
        .filter((tag) => tag.count)
        .sort((prev, next) => {
          return next.count - prev.count;
        });
      setTags(allTags);
      setIsReady(true);
    }
  }, [totalNumber, setTags, page, setIsReady]);

  if (!context.data.tags) {
    return <Loader />;
  }

  return tags.map((tag) => {
    if (!tag.count) {
      return null;
    }
    return (
      <Item
        key={tag.name + tag.id}
        className={data.id === tag.id ? `current` : ``}
        onClick={handler}
      >
        <Link link={tag.link}>
          {tag.name}
          &nbsp; (
          {tag.count}
          )
        </Link>
      </Item>
    );
  });
};

export default connect(TagList);

TagList.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
  handler: PropTypes.func,
};
