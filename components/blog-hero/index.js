import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';

import { theme } from '@worldresources/gfw-components';
import { Column, Row } from 'components/grid';
import Intro from 'components/intro';

import { Hero, SearchMobile, SearchDesktop } from 'layouts/home/styles';

const BlogHero = ({ homepage, categories, topics }) => (
  <>
    <Row
      css={css`
        background-size: cover;
        background-image: url('/blog/images/hero-bg-mobile.png');
        margin-bottom: 1.25rem;
        max-width: 90rem;
        padding: 4.375rem 0;
        width: 100%;
        ${theme.mediaQueries.small} {
          margin-bottom: 3.125rem;
          background-image: url('/blog/images/hero-bg-desktop.png');
        }
      `}
    >
      <Column
        css={css`
          padding: 0;
        `}
        width={[1, 5 / 6]}
      >
        <Hero>
          <Intro
            title={homepage?.title}
            description={ReactHtmlParser(homepage?.excerpt)}
          />
        </Hero>
      </Column>
    </Row>
    <Row
      css={css`
        width: 100%;
        max-width: 90rem;
      `}
    >
      <Column
        css={css`
          display: block;
          height: 12rem;
          background-color: #f7f7f7;
          padding: 2rem 0;
          margin-top: -1.25rem;
          ${theme.mediaQueries.small} {
            display: none;
          }
        `}
      >
        <SearchMobile categories={categories} topics={topics} isFixed={false} />
      </Column>
      <Column
        css={css`
          margin-top: -1.35rem;
          padding: 0 !important;
        `}
      >
        <SearchDesktop
          categories={categories}
          topics={topics}
          isFixed={false}
        />
      </Column>
    </Row>
  </>
);

BlogHero.propTypes = {
  homepage: PropTypes.object,
  categories: PropTypes.array,
  topics: PropTypes.array,
};

export default BlogHero;
