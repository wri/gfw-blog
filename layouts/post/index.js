import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/router';

import { Row, Column, theme } from '@worldresources/gfw-components';

import Media from 'components/media';
import Caption from 'components/caption';
import Card, { CARD_MEDIA_SIZE } from 'components/card';
import PostContent from 'components/content';

import Slider from 'components/slider';
import BackButton from 'components/back-button';
import ReadingBar from 'components/reading-bar';
import Dropdown from 'components/dropdown';
import useLocalizeDatetime from 'hooks/use-localize-datetime';
import useTranslateYoastReadingTime from 'hooks/use-translate-yoast-reading-time';
import { MetaItem } from './meta/styles';
import PostMeta from './meta';
import ShareLinks from './share-links';
import Comments from './comments';

import { SearchDesktop, SearchMobile } from '../home/styles';

import {
  PostContainer,
  MediaWrapper,
  PostTitle,
  LatestTitle,
  PostMetaMobile,
  PostMetaDesktop,
  CaptionWrapper,
  MoreArticlesWrapper,
  LanguageSelectorWrapper,
} from './styles';

const localeStrings = {
  en_US: 'Read in english',
  es_MX: 'Leerlo en español',
  pt_BR: 'Leia em portugues',
  zh_CN: '用中文閱讀',
  fr_FR: 'Lire en français',
  id_ID: 'Baca dalam bahasa indonesia',
};

const Post = ({
  post,
  preview,
  relatedPosts,
  guestAuthors,
  categories,
  topics,
}) => {
  const { featured_media: media, date } = post || {};
  
  const router = useRouter();
  const formattedDate = useLocalizeDatetime(date);
  const estReadingTime = useTranslateYoastReadingTime(post.yoast_head_json);
  const commentsRef = useRef(null);

  const ownGuestAuthors =
    post?.acf?.guest_authors?.length > 0 &&
    post?.acf?.guest_authors?.map((author) => ({
      name: author.post_title,
      link: author?.acf?.profile_link,
    }));

  const originalGuestAuthors =
    guestAuthors &&
    guestAuthors?.map((author) => ({
      name: author.post_title,
      link: author?.acf?.profile_link,
    }));

  let authors = [];
  if (ownGuestAuthors.length > 0) {
    authors = ownGuestAuthors;
  }
  if (originalGuestAuthors.length > 0) {
    authors = originalGuestAuthors;
  }

  const languages = post?.translations_posts
    ?.filter((lang) => lang?.locale && lang?.locale !== post?.locale)
    ?.map((lang) => ({
      ...lang,
      text: localeStrings[lang.locale],
    }));

  const renderAuthors = () => {
    return (
      authors?.length > 0 && (
        <MetaItem>
          <div>
            {authors.map((author, i) => {
              const isLast = i === authors.length - 1;
              const hasMany = authors.length > 2;
              const isSecondToLast = i === authors.length - 2;

              return (
                <span key={author.name}>
                  {author.link ? (
                    <a
                      href={author.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {author.name}
                    </a>
                  ) : (
                    <span>{author.name}</span>
                  )}
                  {!isLast && (
                    <>
                      {!hasMany || (hasMany && isSecondToLast) ? (
                        <span> and </span>
                      ) : (
                        <span>, </span>
                      )}
                    </>
                  )}
                </span>
              );
            })}
          </div>
        </MetaItem>
      )
    );
  };

  const languagesForDropdown = languages.map((item) => ({
    ...item,
    name: item.text,
  }));

  return (
    <PostContainer>
      <Row
        css={css`
          width: 100%;
          max-width: 90rem !important;
          position: fixed;
          z-index: 10;

          ${theme.mediaQueries.small} {
            margin-top: 3.1rem;
          }
        `}
      >
        <Column
          css={css`
            display: block;
            height: 12rem;
            background-color: #f7f7f7;
            padding: 2rem 0;
            ${theme.mediaQueries.small} {
              display: none;
            }
          `}
        >
          <SearchMobile categories={categories} topics={topics} />
        </Column>
        <Column
          css={css`
            margin-top: -1.35rem;
            padding: 0 !important;
            position: fixed;
          `}
        >
          <Row
            css={css`
              max-width: 90rem;
            `}
          >
            <SearchDesktop categories={categories} topics={topics} />
          </Row>
        </Column>
      </Row>
      <Row
        css={css`
          ${theme.mediaQueries.small} {
            max-width: 90rem;
          }
        `}
      >
        <Row
          css={css`
            display: flex;
            position: fixed;
            margin-top: 12rem;
            max-width: 90rem;
            width: 100%;
            z-index: 4;
            background: white;

            ${theme.mediaQueries.small} {
              margin-top: 5.625rem;
            }
          `}
        >
          <BackButton
            handleClick={() => router.push('/')}
            title="back to all articles"
          />
        </Row>
      </Row>
      <Row
        css={css`
          ${theme.mediaQueries.small} {
            max-width: 90rem;
          }
        `}
      >
        <Row
          css={css`
            width: 100%;
            max-width: 90rem;
            margin-top: 16rem;
            position: fixed;
            z-index: 4;

            ${theme.mediaQueries.small} {
              margin-top: 10.75rem;
            }
          `}
        >
          <ReadingBar />
        </Row>
      </Row>
      <Row
        css={css`
          padding: 0 1rem;
          margin-top: 17.125rem;

          ${theme.mediaQueries.small} {
            margin-top: 12.125rem;
            padding: 2.5rem 9.375rem;
          }
        `}
      >
        <PostTitle className="notranslate">
          {ReactHtmlParser(post.title)}
        </PostTitle>
        <div className="subtitle">
          <span className="notranslate">{formattedDate}</span>
          <span className="pipe">|</span>
          <span>{renderAuthors()}</span>
          <span className="pipe">|</span>
          <span className="notranslate">
            {estReadingTime}
          </span>
        </div>
      </Row>
      {languagesForDropdown.length !== 0 && (
        <Row>
          <LanguageSelectorWrapper>
            <Dropdown
              items={languagesForDropdown}
              placeholder="Languages"
              withDivider={false}
            />
          </LanguageSelectorWrapper>
        </Row>
      )}
      {!!media && (
        <>
          <MediaWrapper>
            <Media {...media} />
          </MediaWrapper>
          <CaptionWrapper>
            <Column>
              <Caption {...media} />
            </Column>
          </CaptionWrapper>
        </>
      )}
      <Row
        css={css`
          max-width: 90rem;
        `}
      >
        <Column width={[1, 1 / 5]}>
          <PostMetaDesktop>
            <PostMeta categories={post.categories} tags={post.tags}>
              {languagesForDropdown.length !== 0 && (
                <Dropdown
                  items={languagesForDropdown}
                  placeholder="Languages"
                  withDivider={false}
                />
              )}
            </PostMeta>
            <ShareLinks
              url={`https://blog.globalforestwatch.org${post.link}`}
              title={post.title}
              scrollToComment={() =>
                commentsRef.current.scrollIntoView({ behavior: 'smooth' })}
            />
          </PostMetaDesktop>
        </Column>
        <Column width={[1, 3 / 4]}>
          <PostContent className="notranslate">{post.content}</PostContent>
          <PostMetaMobile>
            <PostMeta categories={post.categories} tags={post.tags} />
            <ShareLinks
              url={`https://blog.globalforestwatch.org${post.link}`}
              title={post.title}
              scrollToComment={() =>
                commentsRef.current.scrollIntoView({ behavior: 'smooth' })}
            />
          </PostMetaMobile>
        </Column>
      </Row>
      <Row
        css={css`
          max-width: 90rem;
        `}
      >
        <MoreArticlesWrapper>
          <Row
            css={css`
              padding: 1.25rem 0;
            `}
          >
            <Column>
              <LatestTitle
                css={css`
                  color: white;
                  font-size: 3rem;
                  font-weight: 400;
                  line-height: 3rem;
                  letter-spacing: 0.1.5625rem;
                  text-align: center;
                  text-transform: capitalize;
                  padding-top: 1.875rem;
                `}
              >
                Explore More Articles
              </LatestTitle>
            </Column>
            {relatedPosts &&
              relatedPosts.map((p) => (
                <Column
                  width={[1, 1 / 2, 1 / 3]}
                  css={css`
                    margin-bottom: 2.5rem !important;
                  `}
                  key={p?.id}
                >
                  <Card
                    {...p}
                    isVerticalList
                    fontSize="1.6rem"
                    textColor="white"
                    imageSize={`
                        height: ${CARD_MEDIA_SIZE.MEDIUM.height};
                      }
                    `}
                  />
                </Column>
              ))}
          </Row>
        </MoreArticlesWrapper>
      </Row>
      <Row
        css={css`
          ${theme.mediaQueries.small} {
            display: none;
          }
        `}
      >
        <Slider
          cards={relatedPosts}
          title="Explore More Articles"
          withBackground
        />
      </Row>
      {!preview && (
        <>
          <Row
            css={css`
              scroll-margin: 9.375rem;
              padding: 2.5rem 0;

              ${theme.mediaQueries.small} {
                padding: 0;
              }
            `}
          >
            <div
              ref={commentsRef}
              css={css`
                scroll-margin: 9.375rem;
              `}
            />
            <Column width={[0, 1 / 12, 1 / 6]} />
            <Column width={[1, 5 / 6, 2 / 3]}>
              <Comments {...post} />
            </Column>
          </Row>
        </>
      )}
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  preview: PropTypes.bool,
  relatedPosts: PropTypes.array,
  slugs: PropTypes.array,
  guestAuthors: PropTypes.array,
  categories: PropTypes.array,
  topics: PropTypes.array,
};

export default Post;
