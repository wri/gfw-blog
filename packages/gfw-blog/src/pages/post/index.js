import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import { Row, Column, Loader } from 'gfw-components';

import Breadcrumbs from '../../components/breadcrumbs';
import Media from '../../components/media';
import Caption from '../../components/caption';
import CategoryList from '../../components/category-list';
import Card from '../../components/card';

import PostContent from './content';
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

const Post = ({ state, libraries, actions }) => {
  const data = state.source.get(state.router.link);
  const Html2React = libraries.html2react.Component;
  const commentsRef = useRef(null);

  const post = state.source[data.type][data.id];
  const media = state.source.attachment[post.featured_media];
  const categories = post.categories.map((id) => state.source.category[id]);
  const tags = post.tags.map((id) => state.source.tag[id]);
  // eslint-disable-next-line camelcase
  const guestAuthors = post?.acf?.guest_authors;
  const authors =
    guestAuthors &&
    guestAuthors.map((author) => ({
      name: author.post_title,
      // eslint-disable-next-line camelcase
      link: author?.acf?.profile_link,
    }));

  const languages =
    post.translations &&
    post.translations
      .filter((lang) => lang.locale !== post.current_lang)
      .map((lang) => {
        const url = lang.link && new URL(lang.link);

        return {
          ...lang,
          link: url.pathname,
          text: localeStrings[lang.locale],
        };
      });

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch('/');
  }, []);

  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const { api } = libraries.source;
    const result = api.get({
      endpoint: 'posts',
      params: {
        _embed: true,
        orderby: 'date',
        exclude: post.id,
        categories: post.categories.join(),
        per_page: 3,
      },
    });
    result.then((response) => {
      libraries.source
        .populate({ response, state, force: true })
        .then((posts) => {
          setRelatedPosts(posts.map((p) => p.id));
        });
    });
  }, []);

  return (
    <PostContainer>
      {data.isReady ? (
        <>
          <Row
            css={css`
              position: relative;
              min-height: 40px;
            `}
          >
            <BreadCrumbsWrapper width={[5 / 6, 3 / 4]}>
              <Breadcrumbs />
            </BreadCrumbsWrapper>
            <Column width={[1 / 6, 1 / 4]}>
              <Search open={state.theme.searchIsActive} />
            </Column>
          </Row>
          {media && (
            <MediaWrapper>
              <Media {...media} />
            </MediaWrapper>
          )}
          <CaptionWrapper>
            <Column>
              <Caption {...media} />
            </Column>
          </CaptionWrapper>
          <Row>
            <Column width={[1, 1 / 4]}>
              <PostMetaDesktop>
                <PostMeta
                  authors={authors}
                  date={post.date}
                  languages={languages}
                />
                <ShareLinks
                  url={`${state.frontity.url}${state.router.link}`}
                  title={post.title.rendered}
                  scrollToComment={() =>
                    commentsRef.current.scrollIntoView({ behavior: 'smooth' })}
                />
              </PostMetaDesktop>
            </Column>
            <Column width={[1, 2 / 3]}>
              {categories && <CategoryList categories={categories} />}
              <PostTitle>
                <Html2React html={post.title.rendered} />
              </PostTitle>
              <PostMetaMobile>
                <PostMeta
                  authors={authors}
                  date={post.date}
                  languages={languages}
                />
                <ShareLinks
                  url={`${state.frontity.url}${state.router.link}`}
                  title={post.title.rendered}
                  scrollToComment={() =>
                    commentsRef.current.scrollIntoView({ behavior: 'smooth' })}
                />
              </PostMetaMobile>
              <PostContent>
                <Html2React html={post.content.rendered} />
              </PostContent>
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
                  key={p}
                >
                  <Card {...state.source.post[p]} />
                </Column>
              ))}
          </Row>
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
      ) : (
        <Loader />
      )}
    </PostContainer>
  );
};

Post.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  libraries: PropTypes.object,
};

export default connect(Post);
