import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';

import { Button } from 'gfw-components';

import { LangConsumer } from 'utils/lang';

import Media from 'components/media';
import CategoryList from 'components/category-list';

import {
  CardWrapper,
  MediaWrapper,
  Overlay,
  PlayIcon,
  PostTitle,
  PostExcerpt,
} from './styles';

const Card = ({
  featured_media,
  translations_posts,
  categories,
  large,
  video,
}) => (
  <LangConsumer>
    {(lang) => {
      const rawCardData = translations_posts?.find((c) => c.locale === 'en_US');
      const translatedData = translations_posts?.find((c) => c.locale === lang);
      const cardData = translatedData || rawCardData;
      const { title, excerpt, link } = cardData || {};

      return (
        <CardWrapper className="notranslate">
          <a
            href={link}
            alt={title}
            css={css`
              z-index: 1;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
            `}
          >
            &nbsp;
          </a>
          {!!featured_media && (
            <MediaWrapper large={large}>
              <Media {...featured_media} />
              {video && (
                <Overlay>
                  <Button
                    round
                    light
                    css={css`
                      border: none;
                    `}
                  >
                    <PlayIcon />
                  </Button>
                </Overlay>
              )}
            </MediaWrapper>
          )}
          {categories && (
            <CategoryList
              categories={categories}
              css={css`
                z-index: 2;
                position: relative;
              `}
            />
          )}
          {title && <PostTitle large={large}>{title}</PostTitle>}
          {excerpt && (
            <PostExcerpt large={large}>{ReactHtmlParser(excerpt)}</PostExcerpt>
          )}
        </CardWrapper>
      );
    }}
  </LangConsumer>
);

Card.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.string,
  media: PropTypes.object,
  categories: PropTypes.array,
  large: PropTypes.bool,
  video: PropTypes.bool,
  featured_media: PropTypes.object,
  translations_posts: PropTypes.array,
};

export default Card;
