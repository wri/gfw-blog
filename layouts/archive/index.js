import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Row, Column, Mobile, Desktop, theme } from 'gfw-components';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/router';
import compact from 'lodash/compact';
import Sticky from 'react-stickynode';

import Link from 'next/link';
import Card from 'components/card';
import SimpleCard from 'components/card-simple';
import Menu from 'components/menu';
import Breadcrumbs from 'components/breadcrumbs';
import Dropdown from 'components/dropdown';

import {
  Wrapper,
  SearchMobile,
  SearchDesktop,
  ResultsStatement,
  MenuWrapper,
} from './styles';

const SearchPage = ({
  tag,
  tags,
  articles,
  webinars,
  additionalMaterials,
  isSearch,
}) => {
  const [type, setType] = useState('articles');
  const { query } = useRouter();
  const { query: searchQuery } = query || {};

  const total =
    articles?.length + webinars?.length + additionalMaterials?.length;
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

  const links = [
    {
      label: 'Step by step instructions',
      onClick: () => setType('articles'),
      active: type === 'articles',
      count: articles?.length || '0',
    },
    {
      label: 'Webinars',
      onClick: () => setType('webinars'),
      active: type === 'webinars',
      count: webinars?.length || '0',
    },
    {
      label: 'Additional Materials',
      onClick: () => setType('additional-materials'),
      active: type === 'additional-materials',
      count: additionalMaterials?.length || '0',
    },
  ];

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
      <Mobile>
        <MenuWrapper>
          <Menu links={links} />
        </MenuWrapper>
      </Mobile>
      <div className="sticky-boundary" style={{ position: 'relative' }}>
        <Row>
          <Column
            css={css`
              margin-bottom: 50px !important;
            `}
          >
            <ResultsStatement>{resultsStatement}</ResultsStatement>
          </Column>
          <Column width={[1, 1 / 4]}>
            <Desktop>
              <Sticky top={120} bottomBoundary=".sticky-boundary">
                <Menu links={links} />
              </Sticky>
            </Desktop>
          </Column>
          <Column width={[1, 7 / 12]}>
            <Row nested>
              {type === 'articles' &&
                articles?.map(({ id, excerpt, link, ...rest }) => (
                  <Column
                    key={id}
                    css={css`
                      margin-bottom: 40px !important;
                    `}
                  >
                    <Link href={link}>
                      <a>
                        <SimpleCard
                          {...rest}
                          text={ReactHtmlParser(excerpt?.rendered)}
                          arrow
                        />
                      </a>
                    </Link>
                  </Column>
                ))}
              {type === 'webinars' &&
                webinars?.map(
                  ({ id, excerpt, featured_media: media, link, ...rest }) => (
                    <Column
                      width={[1, 1 / 2]}
                      css={css`
                        margin-bottom: 40px !important;
                      `}
                      key={id}
                    >
                      <Link href={link}>
                        <a>
                          <Card
                            {...rest}
                            excerpt={ReactHtmlParser(excerpt?.rendered)}
                            {...(media && {
                              media,
                            })}
                            video
                          />
                        </a>
                      </Link>
                    </Column>
                  )
                )}
              {type === 'additional-materials' &&
                additionalMaterials?.map(({ id, excerpt, link, ...rest }) => (
                  <Column
                    key={id}
                    css={css`
                      margin-bottom: 40px !important;
                    `}
                  >
                    <Link href={link}>
                      <a>
                        <SimpleCard
                          {...rest}
                          text={ReactHtmlParser(excerpt?.rendered)}
                          arrow
                        />
                      </a>
                    </Link>
                  </Column>
                ))}
            </Row>
          </Column>
        </Row>
      </div>
      <Mobile>
        <MenuWrapper>
          <Menu links={links} />
        </MenuWrapper>
      </Mobile>
    </Wrapper>
  );
};

SearchPage.propTypes = {
  tag: PropTypes.object,
  tags: PropTypes.array,
  articles: PropTypes.array,
  webinars: PropTypes.array,
  additionalMaterials: PropTypes.array,
  isSearch: PropTypes.bool,
};

export default SearchPage;
