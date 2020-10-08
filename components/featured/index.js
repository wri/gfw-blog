import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';

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

const MainPost = ({
  featured_media,
  categories,
  title,
  excerpt,
  link,
  extLink,
}) => {
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
      {!extLink && link && (
        <Link href={link}>
          <a> </a>
        </Link>
      )}
      <Overlay>
        <ContentWrapper>
          {categories && <CategoryList categories={categories} />}
          {title && <PostTitle className="notranslate">{title}</PostTitle>}
          {excerpt && (
            <PostExcerpt className="notranslate">
              {ReactHtmlParser(clearExcerptHellip(excerpt))}
            </PostExcerpt>
          )}
        </ContentWrapper>
      </Overlay>
    </Wrapper>
  );
};

MainPost.propTypes = {
  featured_media: PropTypes.object,
  title: PropTypes.string,
  excerpt: PropTypes.string,
  categories: PropTypes.array,
  link: PropTypes.string,
  extLink: PropTypes.string,
};

export default MainPost;
