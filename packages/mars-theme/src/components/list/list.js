/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, styled, css } from 'frontity';
import Item from './list-item';
import SubPost from './sub-post';
import MainPost from './main-post';
import LoadMore from './load-more';
import BlogHeader from '../blog-header';
import CategoryNameList from '../category/list-name';
import Breadcrumbs from '../breadcrumbs';
import EntityInfo from '../entity-info';
import Search from '../search';
import SearchResults from '../search/results';
import {
  SMALL_ENDPOINT,
  MEDIUM_ENDPOINT,
  LARGE_ENDPOINT,
} from '../heplers/css-endpoints';
import { isSearchLink, isBlogHomePage } from '../heplers/content';

const POSTS_PER_PAGE = 9;
const MAIN_CATEGORIES = [
  'climate',
  'fires',
  'data-and-research',
  'people',
  'places-to-watch',
  'commodities',
];

const List = ({ state }) => {
  const [isFetching, setIsFetching] = useState(false);
  const { link } = state.router;

  const { items: allCategories } = state.source.data['all-categories/'];
  const categories = allCategories
    .filter((c) => MAIN_CATEGORIES.includes(c.slug))
    .map((c) => ({ name: c.name, link: `/category/${c.slug}` }));
  const data = state.source.get(state.router.link);
  const initialPosts = [...data.items];
  const mainPosts = isBlogHomePage(link) ? initialPosts.splice(0, 1) : [];
  const subPosts = isBlogHomePage(link) ? initialPosts.splice(0, 2) : [];
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
      const getLink =
        link[1] === '?'
          ? `page/${lastLoadedPage + 1}${link}`
          : `${link}page/${lastLoadedPage + 1}`;
      const pageData = state.source.get(getLink);
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
          const getLink =
            link[1] === '?'
              ? `page/${nextPage}${link}`
              : `${link}page/${nextPage}`;
          const nextData = state.source.get(getLink);
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
    margin-top: 1.25rem;
  `;

  return (
    <Wrapper>
      <div className="row">
        {!isBlogHomePage(link) && (
          <>
            <div
              className="column small-12"
              css={css`
                margin-bottom: 20px;
              `}
            >
              <BreadcrumbsContainer>
                <Breadcrumbs />
                <Search mobile title="" />
              </BreadcrumbsContainer>
            </div>
            <div className="column small-12 medium-7">
              <EntityInfo />
            </div>
            <div className="column small-12 medium-5">
              {!data.searchQuery && <Search />}
            </div>
          </>
        )}
      </div>
      <div
        className="row"
        css={css`
          margin-bottom: 20px;
        `}
      >
        {isBlogHomePage(link) && (
          <>
            <div
              className="column small-12 medium-10 large-8"
              css={css`
                margin-bottom: 20px;
              `}
            >
              <Search mobile title="" />
            </div>
            <div className="column small-12 medium-10 large-8">
              <BlogHeader />
            </div>
            <div className="column small-12 medium-9">
              <CategoryNameList
                categories={categories}
                title="Categories"
                styles={categoriesStyles}
              />
            </div>
            <div className="column small-12 medium-3">
              <Search />
            </div>
          </>
        )}
        <div className="column small-12">
          {isSearchLink(link) && <SearchResults />}
        </div>
      </div>
      <MainPostWrapper>
        {mainPosts &&
          mainPosts.map(({ type, id }) => {
            const item = state.source[type][id];
            return <MainPost key={item.id} post={item} />;
          })}
      </MainPostWrapper>
      <div className="row">
        {subPosts &&
          subPosts.map(({ type, id }) => {
            const item = state.source[type][id];
            return (
              <div key={item.id} className="column small-12 medium-6">
                <SubPost item={item} />
              </div>
            );
          })}
      </div>
      {isBlogHomePage() && <Divider />}
      {isBlogHomePage() && (
        <div className="row">
          <div className="column small-12">
            <Title>latest articles</Title>
          </div>
        </div>
      )}
      {/* Iterate over the items of the list. */}
      <div className="row">
        {posts[state.router.link] &&
          posts[state.router.link].map((el) => {
            if (!el) return null;
            const { type, id } = el;
            const item = state.source[type][id];
            // Render one Item component for each one.
            return (
              <div
                key={item.id + item.date + item.name}
                className="column small-12 medium-6 large-4"
              >
                <Item item={item} />
              </div>
            );
          })}
      </div>
      {posts[state.router.link] &&
        posts[state.router.link].length % 3 === 2 && <Plug />}
      {page < totalPages && (
        <LoadMore
          isFetching={isFetching}
          setIsFetching={setIsFetching}
          setPage={setPage}
          page={page}
          limit={totalPages}
        />
      )}
    </Wrapper>
  );
};

export default connect(List);

const Wrapper = styled.div`
  width: 100%;
  padding-top: 1.725rem;
  padding-bottom: 3.75rem;
  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    padding-bottom: 6.25rem;
    padding-top: 60px;
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

const MainPostWrapper = styled.div`
  max-width: 1120px;
  margin: auto;
  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    padding: 0 20px;
  }
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 50px;
  text-transform: uppercase;
  width: 100%;
  @media screen and (max-width: ${SMALL_ENDPOINT}) {
    display: none;
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

const BreadcrumbsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 3.75rem;
`;

List.propTypes = {
  state: PropTypes.object,
};
