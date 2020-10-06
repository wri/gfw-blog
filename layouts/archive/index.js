import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Column, theme } from 'gfw-components';
import { useRouter } from 'next/router';
import compact from 'lodash/compact';

import Link from 'next/link';
import Card from 'components/card';
import Breadcrumbs from 'components/breadcrumbs';
import Dropdown from 'components/dropdown';

import {
  Wrapper,
  SearchMobile,
  SearchDesktop,
  ResultsStatement,
} from './styles';

const SearchPage = ({ tag, tags, isSearch, posts }) => {
  const { query } = useRouter();
  const { query: searchQuery } = query || {};

  const total = posts?.length;
  const articleText = total === 1 ? 'article' : 'articles';

  const searchStatement =
    isSearch &&
    searchQuery &&
    `${total} ${articleText} with the keyword ${decodeURI(searchQuery)}`;
  const tagStatement =
    !isSearch && `${total} ${articleText} tagged with ${tag?.name}`;

  const resultsStatement = isSearch ? searchStatement : tagStatement;

  const taxFromList = tags?.find((tax) => tax.id === tag?.id);
  const allTaxOptions =
    tags && (taxFromList ? tags : [{ ...tag, count: total }, ...tags]);

  const breadCrumbs = compact([
    {
      label: isSearch ? 'Search' : 'Tags',
    },
    searchQuery &&
      isSearch && {
        label: decodeURI(searchQuery),
      },
    !isSearch && {
      label: tag?.name,
    },
  ]);

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
            links={breadCrumbs}
          />
        </Column>
        {!isSearch && (
          <Column width={[1 / 4]}>
            <SearchMobile expandable />
          </Column>
        )}
        {isSearch && (
          <>
            <Column>
              <SearchDesktop expanded isSearch />
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
          <Column width={[1, 2 / 3]}>
            <Dropdown items={allTaxOptions} selected={tag?.id} />
          </Column>
          <Column width={[1, 1 / 3]}>
            <SearchDesktop showTitle expandable />
          </Column>
        </Row>
      )}
      <Row>
        <Column
          css={css`
            margin-bottom: 50px !important;
          `}
        >
          <ResultsStatement>{resultsStatement}</ResultsStatement>
        </Column>
        {posts?.map(({ id, link, ...rest }) => (
          <Column
            width={[1, 1 / 2, 1 / 3]}
            css={css`
              margin-bottom: 40px !important;
            `}
            key={id}
          >
            <Link href={link}>
              <a>
                <Card {...rest} />
              </a>
            </Link>
          </Column>
        ))}
      </Row>
    </Wrapper>
  );
};

SearchPage.propTypes = {
  tag: PropTypes.object,
  tags: PropTypes.array,
  posts: PropTypes.array,
  isSearch: PropTypes.bool,
};

export default SearchPage;
