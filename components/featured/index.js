import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

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

const MainPost = ({ featured_media, categories, title, excerpt }) => {
  return (
    <Wrapper>
      {featured_media && <Media {...featured_media} />}
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
};

export default MainPost;
