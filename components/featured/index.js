import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';

import { LangConsumer } from 'utils/lang';

import Media from 'components/media';
import CategoryList from 'components/category-list';
import { clearExcerptHellip } from 'utils/content';

import {
  Wrapper,
  Overlay,
  ContentWrapper,
  PostTitle,
  PostExcerpt,
} from './styles';

const MainPost = ({ featured_media, categories, translations_posts }) => {
  return (
    <LangConsumer>
      {(lang) => {
        const rawCardData = translations_posts?.find(
          (c) => c.locale === 'en_US'
        );
        const translatedData = translations_posts?.find(
          (c) => c.locale === lang
        );
        const cardData = translatedData || rawCardData;
        const { title, excerpt, link, extLink } = cardData || {};

        return (
          <Wrapper>
            {featured_media && <Media {...featured_media} />}
            {extLink && (
              // eslint-disable-next-line jsx-a11y/anchor-has-content
              <a
                href={extLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={title}
              />
            )}
            {!extLink && link && <Link href={link} />}
            <Overlay>
              <ContentWrapper>
                {categories && <CategoryList categories={categories} />}
                {title && (
                  <PostTitle className="notranslate">{title}</PostTitle>
                )}
                {excerpt && (
                  <PostExcerpt className="notranslate">
                    {ReactHtmlParser(clearExcerptHellip(excerpt))}
                  </PostExcerpt>
                )}
              </ContentWrapper>
            </Overlay>
          </Wrapper>
        );
      }}
    </LangConsumer>
  );
};

MainPost.propTypes = {
  featured_media: PropTypes.object,
  translations_posts: PropTypes.array,
  categories: PropTypes.array,
};

export default MainPost;
