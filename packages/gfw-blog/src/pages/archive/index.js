import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, css, decode } from 'frontity';
import { Row, Column, theme } from 'gfw-components';

import Card from '../../components/card';
import LoadMore from '../../components/load-more';
import Breadcrumbs from '../../components/breadcrumbs';
import Dropdown from '../../components/dropdown';

import {
  Wrapper,
  SearchMobile,
  SearchDesktop,
  LoadMoreWrapper,
  ResultsStatement,
  CategoryDescription,
} from './styles';

const ArchivePage = ({ state }) => {
  const [page, setPage] = useState(1);
  const { link } = state.router;
  const data = state.source.get(link);
  const { totalPages, items } = data;
  const listPosts = Array.from(Array(page).keys()).reduce((arr, pageNum) => {
    if (pageNum > 0) {
      const pageLink = data.isSearch
        ? `/page/${pageNum + 1}${data.link}`
        : `${link}page/${pageNum + 1}`;
      const { items: newPosts } = state.source.get(pageLink) || {};
      return newPosts ? [...arr, ...newPosts] : arr;
    }

    return arr;
  }, items);

  const isSearchEmpty = data.link === '/?s=';
  const isSearch = isSearchEmpty || data.isSearch;
  const { isCategory, isTag, isAuthor, total, searchQuery } = data;
  const articleText = total === 1 ? 'article' : 'articles';

  const searchStatement =
    isSearch &&
    `${total} ${articleText} with the keyword ${decodeURI(searchQuery)}`;
  const catStatement =
    isCategory &&
    `${total} ${articleText} under the ${decode(
      state.source[data.taxonomy][data.id].name
    )} category`;
  const tagStatement =
    isTag &&
    `${total} ${articleText} tagged with ${decode(
      state.source[data.taxonomy][data.id].name
    )}`;
  const authorStatement =
    isAuthor &&
    `${total} ${articleText} written by ${decodeURI(
      state.source.author[data.id].name
    )}`;

  const resultsStatement =
    searchStatement || catStatement || tagStatement || authorStatement;

  const { categories } = state.source.data['all-categories/'];
  const { tags } = state.source.data['top-tags/'];

  const allCategories = isCategory && categories;
  const allTags = isTag && tags;
  const allAuthors = isAuthor && [
    { ...state.source.author[data.id], count: total },
  ];

  const taxOptions = allCategories || allTags || allAuthors || [];
  const taxFromList =
    !!taxOptions?.length && taxOptions.find((tax) => tax.id === data?.id);
  const taxSelected =
    taxFromList ||
    state.source?.[data.taxonomy]?.[data.id] ||
    state.source.author?.[data.id];
  const taxId = taxSelected?.id;

  const allTaxOptions = taxFromList
    ? taxOptions
    : [{ ...taxSelected, count: total }, ...taxOptions];

  return (
    <Wrapper>
      <Row
        css={css`
          position: relative;
          min-height: 40px;
        `}
      >
        <Column width={[3 / 4]}>
          <Breadcrumbs
            css={css`
              margin-bottom: 25px;

              ${theme.mediaQueries.small} {
                margin-bottom: 40px;
              }
            `}
          />
        </Column>
        {!isSearch && (
          <Column width={[1 / 4]}>
            <SearchMobile open={state.theme.searchIsActive} />
          </Column>
        )}
        {isSearch && (
          <>
            <Column>
              <SearchDesktop expanded isSearch />
            </Column>
            <Column
              css={css`
                margin-bottom: 20px !important;
              `}
            >
              <ResultsStatement>{resultsStatement}</ResultsStatement>
            </Column>
          </>
        )}
      </Row>
      {!isSearch && (
        <Row
          css={css`
            position: relative;
          `}
        >
          <Column width={[1, 3 / 4]}>
            <Dropdown items={allTaxOptions} selected={taxId} />
          </Column>
          <Column width={[1, 1 / 4]}>
            <SearchDesktop showTitle open={state.theme.searchIsActive} />
          </Column>
          {isCategory && taxSelected && (
            <Column
              width={[1, 3 / 4]}
              css={css`
                margin-bottom: 20px !important;
              `}
            >
              <CategoryDescription>
                {taxSelected.description}
              </CategoryDescription>
            </Column>
          )}
          {resultsStatement && (
            <Column
              css={css`
                margin-bottom: 20px !important;
              `}
            >
              <ResultsStatement>{resultsStatement}</ResultsStatement>
            </Column>
          )}
        </Row>
      )}
      <Row>
        {listPosts &&
          listPosts.map((post) => (
            <Column
              width={[1, 1 / 2, 1 / 3]}
              css={css`
                margin-bottom: 40px !important;
              `}
              key={post.id}
            >
              <Card {...post} />
            </Column>
          ))}
        <Column>
          <Row nested>
            <Column width={[1 / 12, 1 / 3]} />
            <LoadMoreWrapper width={[5 / 6, 1 / 3]}>
              <LoadMore
                setPage={setPage}
                page={page}
                limit={totalPages}
                link={link}
                isSearch={data.isSearch}
              />
            </LoadMoreWrapper>
          </Row>
        </Column>
      </Row>
    </Wrapper>
  );
};

ArchivePage.propTypes = {
  state: PropTypes.object,
};

export default connect(ArchivePage);
