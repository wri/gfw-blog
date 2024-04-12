import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';

import { Button, theme } from '@worldresources/gfw-components';
import { Row, Column } from 'components/grid';

import { LangConsumer } from 'utils/lang';

import Media from 'components/media';

import useLocalizeDatetime from 'hooks/use-localize-datetime';

import {
  CardWrapper,
  MediaWrapper,
  Overlay,
  PlayIcon,
  PostTitle,
  PostExcerpt,
  InfoWrapper,
} from './styles';

export const CARD_MEDIA_SIZE = Object.freeze({
  LARGE: {
    height: '28.875rem',
    width: '37.6875rem',
  },
  MEDIUM: {
    height: '14.5rem',
    width: '18.9375rem',
  },
  SMALL: {
    height: '11.625rem',
    width: '15.1875rem',
  },
  MOBILE: {
    height: '15.75rem',
    width: '20.5625rem',
  },
});

const Card = ({
  featured_media,
  translations_posts,
  categories,
  large,
  isFeaturedSubPost = false,
  video,
  date,
  modified,
  imageSize = '',
  textColor = '#333',
  showExcerpt = true,
  isVerticalList,
  fontSize,
  ...rawCardData
}) => {
  const formattedDate = useLocalizeDatetime(date);

  const renderMedia = () => {
    return (
      !!featured_media && (
        <MediaWrapper
          css={css`
            ${imageSize}
          `}
        >
          <Media {...featured_media} isExternalLink={!!rawCardData.extLink} />
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
      )
    );
  };

  const renderInfo = () => {
    return (
      <InfoWrapper
        css={css`
          color: ${textColor};
        `}
      >
        <span className="notranslate">{formattedDate}</span>
        {categories && (
          <>
            <span className="separator">|</span>
            <span
              className="bold"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: categories[0].name }}
            />
          </>
        )}
        <span className="separator">|</span>
        <span className="reading-time">
          {rawCardData.yoast_head_json?.twitter_misc['Est. reading time'] || ''}
        </span>
      </InfoWrapper>
    );
  };

  const renderCard = ({ title, excerpt }) => {
    if (isVerticalList) {
      return (
        <Column width={[1]}>
          {renderMedia()}
          {renderInfo()}
          {title && (
            <PostTitle
              css={css`
                color: ${textColor};
              `}
              fontSize={fontSize}
              className="notranslate"
              large={large}
            >
              {title}
            </PostTitle>
          )}
          {excerpt && showExcerpt && (
            <PostExcerpt
              css={css`
                color: ${textColor};
              `}
              className="notranslate"
              large={large}
            >
              {ReactHtmlParser(excerpt)}
            </PostExcerpt>
          )}
        </Column>
      );
    }

    const widthValues = isFeaturedSubPost
      ? [
          [1, 2 / 5],
          [1, 3 / 5],
        ]
      : [
          [1, 1 / 3],
          [1, 2 / 3],
        ];

    return (
      <>
        <Column
          css={css`
            padding: 0;

            ${theme.mediaQueries.small} {
              max-width: 18.9375rem;
              padding-left: 0;
            }
          `}
          width={widthValues[0]}
        >
          {renderMedia()}
        </Column>
        <Column
          width={widthValues[1]}
          css={css`
            padding-left: 0 !important;
          `}
        >
          {renderInfo()}
          {title && (
            <PostTitle
              css={css`
                color: ${textColor};
              `}
              className="notranslate"
              large={large}
            >
              {title}
            </PostTitle>
          )}
          {excerpt && showExcerpt && (
            <PostExcerpt
              css={css`
                color: ${textColor};
              `}
              className="notranslate"
              large={large}
            >
              {ReactHtmlParser(excerpt)}
            </PostExcerpt>
          )}
        </Column>
      </>
    );
  };

  return (
    <LangConsumer>
      {(lang) => {
        const translatedData = translations_posts?.find(
          (c) => c.locale === lang
        );
        const cardData = translatedData || rawCardData;
        const { title, excerpt, link, extLink } = cardData || {};

        return (
          <CardWrapper isFeaturedSubPost={isFeaturedSubPost}>
            {extLink && (
              // eslint-disable-next-line jsx-a11y/anchor-has-content
              <a
                style={{ cursor: 'pointer' }}
                href={extLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="external link"
              />
            )}
            {!extLink && link && (
              <Link href={link}>
                <a> </a>
              </Link>
            )}
            <Row
              css={css`
                padding: 0;
              `}
            >
              {renderCard({ title, excerpt })}
            </Row>
          </CardWrapper>
        );
      }}
    </LangConsumer>
  );
};

Card.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.string,
  media: PropTypes.object,
  categories: PropTypes.array,
  large: PropTypes.bool,
  isVerticalList: PropTypes.bool,
  isFeaturedSubPost: PropTypes.bool,
  video: PropTypes.bool,
  featured_media: PropTypes.object,
  translations_posts: PropTypes.array,
  date: PropTypes.string,
  modified: PropTypes.string,
  textColor: PropTypes.string,
  imageSize: PropTypes.string,
  showExcerpt: PropTypes.bool,
  fontSize: PropTypes.string,
};

export default Card;
