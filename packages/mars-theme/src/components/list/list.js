/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import Item from './list-item';
import SubPost from './sub-post';
import MainPost from './main-post';
import LoadMore from './load-more';
import BlogHeader from '../blog-header';
import CategoryNameList from '../category/list-name';
import Breadcrumbs from '../breadcrumbs';
import EntityInfo from '../entity-info';
import {
  SMALL_ENDPOINT,
  MEDIUM_ENDPOINT,
  LARGE_ENDPOINT,
} from '../heplers/css-endpoints';

const POSTS_PER_PAGE = 9;

const List = ({ state }) => {
  const [isFetching, setIsFetching] = useState(false);
  const { link } = state.router;
  const isBlogHomePage = () => {
    return link === '/';
  };

  const data = state.source.get(state.router.link);
  const categories = Object.values(
    state.source.category
    // eslint-disable-next-line no-shadow
  ).map(({ name, link }) => ({ name, link }));
  const initialPosts = [...data.items];
  const mainPosts = isBlogHomePage() ? initialPosts.splice(0, 1) : [];
  const subPosts = isBlogHomePage() ? initialPosts.splice(0, 2) : [];
  const [posts, setPosts] = useState({
    [state.router.link]: initialPosts.map(({ id, type }) => ({ id, type })),
  });
  const { totalPages } = data;
  const [page, setPage] = useState(1);

  useEffect(() => {
    let fetchingAllData = true;
    let lastLoadedPage = 1;
    const loadedPosts = [];
    while (fetchingAllData) {
      const pageData = state.source.get(`${link}page/${lastLoadedPage + 1}`);
      if (pageData && pageData.items) {
        lastLoadedPage++;
        loadedPosts.push(...pageData.items);
      } else {
        fetchingAllData = false;
      }
    }
    const finalPosts = [...initialPosts, ...loadedPosts];
    setPosts({ [link]: finalPosts });
    setPage(lastLoadedPage);
  }, [link, setIsFetching, setPosts, setPage]);

  useEffect(() => {
    if (page && page > 1 && page <= totalPages && isFetching) {
      const pagesNumber = Math.round(
        (posts[state.router.link].length + mainPosts.length + subPosts.length) /
          POSTS_PER_PAGE
      );
      if (pagesNumber < page) {
        for (let i = page - 1; i < page; i++) {
          const nextPage = i + 1;
          const nextData = state.source.get(`${link}page/${nextPage}`);
          const accPosts = posts[state.router.link].concat([]);
          if (nextData && nextData.items) {
            accPosts.push(
              ...nextData.items.map(({ id, type }) => ({ id, type }))
            );
            const newPosts = { ...posts };
            newPosts[link] = accPosts;
            setPosts(newPosts);
            setIsFetching(false);
          }
        }
      } else {
        setIsFetching(false);
      }
    }
  }, [page, state, totalPages, posts, setIsFetching, isFetching]);

  const categoriesStyles = `
  margin-bottom: 1rem;
  @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
    padding: 0 1rem;
  }`;
  return (
    <Wrapper>
      <Container>
        <Breadcrumbs />
        <EntityInfo />
        {isBlogHomePage() && <BlogHeader />}
        {isBlogHomePage() && (
          <CategoryNameList
            categories={categories}
            title="Categories"
            styles={categoriesStyles}
          />
        )}
        {mainPosts &&
          mainPosts.map(({ type, id }) => {
            const item = state.source[type][id];
            return <MainPost key={item.id} post={item} />;
          })}
        {subPosts &&
          subPosts.map(({ type, id }) => {
            const item = state.source[type][id];
            return <SubPost key={item.id} item={item} />;
          })}
      </Container>
      {isBlogHomePage() && <Divider />}
      <Container>
        {isBlogHomePage() && <Title>latest articles</Title>}
        {/* Iterate over the items of the list. */}
        {posts[state.router.link] &&
          posts[state.router.link].map((el) => {
            if (!el) return null;
            const { type, id } = el;
            const item = state.source[type][id];
            // Render one Item component for each one.
            return <Item key={item.id + item.date + item.name} item={item} />;
          })}
        {posts[state.router.link] &&
          posts[state.router.link].length % 3 === 2 && <Plug />}
        {page < totalPages && (
          <LoadMore
            isFetching={isFetching}
            setIsFetching={setIsFetching}
            setPage={setPage}
            page={page}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default connect(List);

const Wrapper = styled.div`
  width: 100%;
  padding-top: 2.125rem;
  padding-bottom: 3.75rem;
  @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
    padding-bottom: 6.25rem;
  }
`;

const Divider = styled.div`
  border-top: 1px solid #e5e5df;
  margin-top: 3.75rem;
  margin-bottom: 3.75rem;
  @media screen and (max-width: ${SMALL_ENDPOINT}) {
    display: none;
  }
`;

const Container = styled.section`
  max-width: 1110px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  list-style: none;
  @media screen and (min-width: ${MEDIUM_ENDPOINT}) and (max-width: ${LARGE_ENDPOINT}) {
    padding: 0 1.5rem;
  }
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 2rem;
  text-transform: uppercase;
  width: 100%;
  @media screen and (max-width: ${SMALL_ENDPOINT}) {
    display: none;
  }
  @media screen and (min-width: ${SMALL_ENDPOINT}) and (max-width: ${MEDIUM_ENDPOINT}) {
    padding: 0 1rem;
  }
`;

const Plug = styled.i`
  width: 31.532%;
  @media screen and (max-width: ${LARGE_ENDPOINT}) {
    width: 49%;
  }
  @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
    width: 100%;
  }
`;

List.propTypes = {
  state: PropTypes.object,
};
