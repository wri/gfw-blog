import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import Media from '../media';
import CategoryList from '../category-list';
import Link from '../link';
import { clearExcerptHellip } from '../../helpers/content';

import {
  Wrapper,
  Overlay,
  ContentWrapper,
  PostTitle,
  PostExcerpt,
} from './styles';

const MainPost = ({ libraries, state, id, type }) => {
  const postData = state.source[type][id];
  const { translations } = postData;
  const {
    theme: { lang },
  } = state;

  const rawCardData = translations?.find((c) => c.locale === 'en_US');
  const translatedData = translations?.find((c) => c.locale === lang);
  const cardData = translatedData || rawCardData;

  const { link, featured_media: featured, categories, title, excerpt } =
    cardData || {};

  const postCategories =
    categories && categories.map((cat) => state.source.category[cat]);
  const media = state.source.attachment[featured];
  const { pathname } = (link && new URL(link)) || {};

  const Html2React = libraries.html2react.Component;

  return (
    <Wrapper>
      {media && <Media {...media} />}
      <Link
        link={pathname}
        css={css`
          z-index: 1;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        `}
      />
      <Overlay>
        <ContentWrapper>
          {postCategories && <CategoryList categories={postCategories} />}
          {title && <PostTitle className="notranslate">{title}</PostTitle>}
          {excerpt && (
            <PostExcerpt className="notranslate">
              <Html2React html={clearExcerptHellip(excerpt)} />
            </PostExcerpt>
          )}
        </ContentWrapper>
      </Overlay>
    </Wrapper>
  );
};

export default connect(MainPost);

MainPost.propTypes = {
  state: PropTypes.object,
  id: PropTypes.number,
  libraries: PropTypes.object,
  type: PropTypes.string,
};
