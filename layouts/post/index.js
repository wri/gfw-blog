import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/router';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

import {
  Row,
  Column,
  Desktop,
  Mobile,
  theme,
} from '@worldresources/gfw-components';

import Breadcrumbs from 'components/breadcrumbs';
import Media from 'components/media';
import Caption from 'components/caption';
import Card, { CARD_MEDIA_SIZE } from 'components/card';
import PostContent from 'components/content';

import Slider from 'components/slider';
import BackButton from 'components/back-button';
import ReadingBar from 'components/reading-bar';
import Dropdown from 'components/dropdown';
import { MetaItem } from './meta/styles';
import PostMeta from './meta';
import ShareLinks from './share-links';
import Comments from './comments';

import {
  PostContainer,
  MediaWrapper,
  PostTitle,
  LatestTitle,
  PostMetaMobile,
  PostMetaDesktop,
  CaptionWrapper,
  Search,
  BreadCrumbsWrapper,
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

const Post = ({ post, preview, relatedPosts, slugs, guestAuthors }) => {
  const router = useRouter();
  const { title, categories, featured_media: media, date } = post || {};
  const parsedDate = parse(date.substring(0, 10), 'yyyy-MM-dd', new Date());
  const formattedDate = format(parsedDate, 'MMM dd, yyyy');

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

  const breadcrumbs = [
    ...categories
      ?.filter((c) => slugs?.includes(c.slug))
      ?.map((c) => ({
        label: c.name,
        href: c.link,
      })),
    {
      label: title,
    },
  ];

  const languagesForDropdown = languages.map((item) => ({
    ...item,
    name: item.text,
  }));

  return (
    <PostContainer>
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
            min-height: 5.5rem;
            max-width: 90rem;
            position: fixed;
            padding-top: 3.125rem;
            width: 100%;
            z-index: 20;
            background: white;

            ${theme.mediaQueries.small} {
              min-height: 3.8125rem;
              padding-top: 2.5rem;
            }
          `}
        >
          <BreadCrumbsWrapper width={[5 / 6, 2 / 3]}>
            <Breadcrumbs links={breadcrumbs} />
          </BreadCrumbsWrapper>
          <Column width={[1 / 6, 1 / 3]}>
            <Desktop>
              <Search expandable showTitle />
            </Desktop>
            <Mobile>
              <Search expandable />
            </Mobile>
          </Column>
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
            display: flex;
            position: fixed;
            margin-top: 7rem;
            max-width: 90rem;
            width: 100%;
            z-index: 10;
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
            margin-top: 11rem;
            position: fixed;
            z-index: 90;

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
          margin-top: 13.125rem;

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
          <span>{formattedDate}</span>
          <span className="pipe">|</span>
          <span>{renderAuthors()}</span>
          <span className="pipe">|</span>
          <span>
            {post.yoast_head_json.twitter_misc['Est. reading time'] || ''}
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
        <Column width={[1, 1 / 4]}>
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
                    large
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
};

export default Post;
