/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import BlogHeader from './intro';
import CategoryList from '../../components/category-list';
import Search from '../../components/search';

import { Wrapper } from './styles';

const POSTS_PER_PAGE = 9;

const HomePage = ({ state }) => {
  const [isFetching, setIsFetching] = useState(false);
  const { link } = state.router;

  const { categories } = state.source.data['all-categories/'];
  const mainCategories = categories.filter(
    (cat) => cat.slug !== 'uncategorized'
  );

  const data = state.source.get(state.router.link);
  const initialPosts = [...data.items];
  const mainPosts = initialPosts.splice(0, 1);
  const subPosts = initialPosts.splice(0, 2);
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

  return (
    <Wrapper>
      <div className="row">
        <div className="column small-12 medium-10 large-8">
          <BlogHeader />
        </div>
        <div className="column small-12 medium-9">
          <CategoryList title="categories" categories={mainCategories} />
        </div>
        <div className="column small-12 medium-3">
          <Search />
        </div>
      </div>
    </Wrapper>
  );
};

HomePage.propTypes = {
  state: PropTypes.object,
};

export default connect(HomePage);

// const Divider = styled.div`
//   border-top: 1px solid #e5e5df;
//   margin-top: 3.75rem;
//   margin-bottom: 3.75rem;
//   @media screen and (max-width: ${SMALL_ENDPOINT}) {
//     display: none;
//   }
// `;

// const MainPostWrapper = styled.div`
//   max-width: 1120px;
//   margin: auto;

//   @media screen and (min-width: ${SMALL_ENDPOINT}) {
//     padding: 0 20px;
//   }
// `;

// const Title = styled.h3`
//   font-size: 1.125rem;
//   font-weight: 500;
//   margin-bottom: 50px;
//   text-transform: uppercase;
//   width: 100%;
//   @media screen and (max-width: ${SMALL_ENDPOINT}) {
//     display: none;
//   }
// `;

// const Plug = styled.i`
//   width: 31.532%;
//   @media screen and (max-width: ${LARGE_ENDPOINT}) {
//     width: 49%;
//   }
//   @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
//     width: 100%;
//   }
// `;

// const BreadcrumbsContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: baseline;
//   height: 3.75rem;
// `;
