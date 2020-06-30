import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import Media from '../media';
import CategoryList from '../category-list';
import Link from '../link';
import { clearExcerptHellip } from '../../helpers/content';

import { CardWrapper, MediaWrapper, PostTitle, PostExcerpt } from './styles';

const Card = ({ libraries, state, id, type, large }) => {
  const postData = state.source[type][id] || {};
  const { locale, translations_posts: translations, acf } = postData;
  const { post_link: extLink } = acf || {};

  // find the card data based on the active lang
  // if search ignore locale and show base language
  const {
    theme: { lang },
    router,
  } = state;
  const isSearch = router.link.includes('?s=');
  const activeLocale = isSearch ? locale : lang;

  const rawCardData = translations?.find((c) => c.locale === 'en_US');
  const translatedData = translations?.find((c) => c.locale === activeLocale);
  const cardData = translatedData || rawCardData;

  const { link, featured_media: featured, categories, title, excerpt } =
    cardData || {};

  const postCategories =
    categories && categories.map((cat) => state.source.category[cat]);
  const media = featured && state?.source?.attachment?.[featured];
  const { pathname } = (link && new URL(link)) || {};

  const Html2React = libraries.html2react.Component;

  return (
    <CardWrapper>
      {extLink ? (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a
          href={extLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="external link"
          css={css`
            z-index: 1;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          `}
        />
      ) : (
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
      )}
      {!!media && (
        <MediaWrapper large={large}>
          <Media {...media} />
        </MediaWrapper>
      )}
      {postCategories && (
        <CategoryList
          categories={postCategories}
          css={css`
            z-index: 2;
            position: relative;
          `}
        />
      )}
      {title && (
        <PostTitle className="notranslate" large={large}>
          <Html2React html={title} />
        </PostTitle>
      )}
      {excerpt && (
        <PostExcerpt className="notranslate" large={large}>
          <Html2React html={clearExcerptHellip(excerpt)} />
        </PostExcerpt>
      )}
    </CardWrapper>
  );
};

export default connect(Card);

Card.propTypes = {
  state: PropTypes.object,
  id: PropTypes.number,
  libraries: PropTypes.object,
  type: PropTypes.string,
  large: PropTypes.bool,
};
