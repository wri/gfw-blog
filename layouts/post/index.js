import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';

import { Row, Column, Desktop, Mobile } from 'gfw-components';

import Breadcrumbs from 'components/breadcrumbs';
import Media from 'components/media';
import Caption from 'components/caption';
import CategoryList from 'components/category-list';
import Card from 'components/card';
import PostContent from 'components/content';

import PostMeta from './meta';
import ShareLinks from './share-links';
import Comments from './comments';

import {
  PostContainer,
  MediaWrapper,
  PostTitle,
  Divider,
  LatestTitle,
  PostMetaMobile,
  PostMetaDesktop,
  CaptionWrapper,
  Search,
  BreadCrumbsWrapper,
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
  const { title, categories, tags, featured_media: media } = post || {};

  const commentsRef = useRef(null);
  const authors =
    guestAuthors?.length &&
    guestAuthors?.map((author) => ({
      name: author.post_title,
      link: author?.acf?.profile_link,
    }));

  const languages = post?.translations_posts
    ?.filter((lang) => lang?.locale && lang?.locale !== post?.locale)
    ?.map((lang) => ({
      ...lang,
      text: localeStrings[lang.locale],
    }));

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
          {categories && <CategoryList categories={categories} />}
          <PostTitle className="notranslate">
            {ReactHtmlParser(post.title)}
          </PostTitle>
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
      <Divider />
      <Row>
        <Column>
          <LatestTitle>Latest articles</LatestTitle>
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
              <Card {...p} />
            </Column>
          ))}
      </Row>
      {!preview && (
        <>
          <Divider />
          <Row
            css={css`
              scroll-margin: 150px;
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
