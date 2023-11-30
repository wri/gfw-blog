import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

import { Button, Row, Column } from '@worldresources/gfw-components';

import { LangConsumer } from 'utils/lang';

import Media from 'components/media';

import {
  CardWrapper,
  MediaWrapper,
  Overlay,
  PlayIcon,
  PostTitle,
  PostExcerpt,
  InfoWrapper,
} from './styles';

const Card = ({
  featured_media,
  translations_posts,
  categories,
  large,
  isFeaturedSubPost = false,
  video,
  date,
  modified,
  textColor = '#333',
  ...rawCardData
}) => {
  const parsedDate = parse(date.substring(0, 10), 'yyyy-MM-dd', new Date());
  const formattedDate = format(parsedDate, 'MMM dd, yyyy');

  const renderMedia = () => {
    return (
      !!featured_media && (
        <MediaWrapper large={large}>
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
        <span>{formattedDate}</span>
        {categories && (
          <>
            <span className="separator">|</span>
            <span className="bold">{categories[0].name}</span>
          </>
        )}
        <span className="separator">|</span>
        <span>20 min</span>
      </InfoWrapper>
    );
  };

  const renderCard = ({ title, excerpt }) => {
    if (large) {
      return (
        <Column width={[1]}>
          {renderMedia()}
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
          {excerpt && (
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
        <Column width={widthValues[0]}>{renderMedia()}</Column>
        <Column width={widthValues[1]}>
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
          {excerpt && (
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
                padding: 0px;
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
  isFeaturedSubPost: PropTypes.bool,
  video: PropTypes.bool,
  featured_media: PropTypes.object,
  translations_posts: PropTypes.array,
  date: PropTypes.string,
  modified: PropTypes.string,
  textColor: PropTypes.string,
};

export default Card;
