import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { Loader } from 'gfw-components';
import { Item } from './components';
import Link from '../link';

const TAGS_PER_PAGE = 10;

const TagList = ({ state, libraries, handler, fetched, fetchedHandler }) => {
  const data = state.source.get(state.router.link);
  const { api } = libraries.source;
  const totalNumber = Object.values(state.source.tag).filter((tag) => tag.count)
    .length;

  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isRedy, setIsReady] = useState(false);

  const fetchTags = useCallback(() => {
    setIsFetching(true);
    if (page) {
      const result = api.get({
        endpoint: 'tags',
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
      fetchTags(page);
    }
  }, [page, isFetching, isRedy]);

  useEffect(() => {
    if (totalNumber < TAGS_PER_PAGE && !fetched) {
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
    const allTags = Object.values(state.source.tag)
      .filter((tag) => tag.count)
      .sort((prev, next) => {
        return next.count - prev.count;
      });
    setTags(allTags);
    if (page) {
      setIsFetching(false);
      setIsReady(true);
    }
  }, [totalNumber, setTags, setPage, setIsFetching, setIsReady]);

  if (isFetching) {
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
