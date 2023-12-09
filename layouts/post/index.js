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
import CategoryList from 'components/category-list';
import Card, { CARD_MEDIA_SIZE } from 'components/card';
import PostContent from 'components/content';

import Slider from 'components/slider';
import BackButton from 'components/back-button';
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
  const { title, categories, tags, featured_media: media, date } = post || {};
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

  return (
    <PostContainer>
      <Row
        css={css`
          position: relative;
          min-height: 40px;
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
      <Row>
        <BackButton
          handleClick={() => router.push('/')}
          title="back to all articles"
        />
      </Row>
      <Row
        css={css`
          padding: 0 16px;

          ${theme.mediaQueries.small} {
            padding: 40px 150px;
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
      <Row>
        <Column width={[1, 1 / 4]}>
          <PostMetaDesktop>
            <PostMeta
              authors={authors}
              date={post.date}
              languages={languages}
              guestAuthors={guestAuthors}
            />
            <ShareLinks
              url={`https://blog.globalforestwatch.org${post.link}`}
              title={post.title}
              scrollToComment={() =>
                commentsRef.current.scrollIntoView({ behavior: 'smooth' })}
            />
          </PostMetaDesktop>
        </Column>
        <Column width={[1, 2 / 3]}>
          <PostMetaMobile>
            <PostMeta
              authors={authors}
              date={post.date}
              languages={languages}
              guestAuthors={guestAuthors}
            />
            <ShareLinks
              url={`https://blog.globalforestwatch.org${post.link}`}
              title={post.title}
              scrollToComment={() =>
                commentsRef.current.scrollIntoView({ behavior: 'smooth' })}
            />
          </PostMetaMobile>
          <PostContent className="notranslate">{post.content}</PostContent>
          {tags && <CategoryList categories={tags} light />}
        </Column>
      </Row>
      <MoreArticlesWrapper>
        <Row
          css={css`
            padding: 20px 0;
          `}
        >
          <Column>
            <LatestTitle
              css={css`
                color: white;
                font-size: 48px;
                font-weight: 400;
                line-height: 48px;
                letter-spacing: 0.25px;
                text-align: center;
                text-transform: capitalize;
                padding-top: 30px;
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
                  margin-bottom: 40px !important;
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
          backgroundImageUrl="../../images/prefooter-mobile.png"
        />
      </Row>
      {!preview && (
        <>
          <Row
            css={css`
              scroll-margin: 150px;
              padding: 40px 0;

              ${theme.mediaQueries.small} {
                padding: 0;
              }
            `}
          >
            <div
              ref={commentsRef}
              css={css`
                scroll-margin: 150px;
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
