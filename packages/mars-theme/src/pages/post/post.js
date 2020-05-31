import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import { Row, Column, Loader } from 'gfw-components';

import Archive from '../archive';

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

const Post = ({ state, libraries, actions }) => {
  const data = state.source.get(state.router.link);
  const Html2React = libraries.html2react.Component;
  const commentsRef = useRef(null);

  const post = state.source[data.type][data.id];
  const media = state.source.attachment[post.featured_media];
  const categories = post.categories.map((id) => state.source.category[id]);
  const tags = post.tags.map((id) => state.source.tag[id]);
  const author = state.source.author[post.author];

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch('/');
    Archive.preload();
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
            <Column width={[1, 1 / 4]}>
              <Search open={state.theme.searchIsActive} />
            </Column>
          </Row>
          <MediaWrapper>
            <Media {...media} />
          </MediaWrapper>
          <CaptionWrapper>
            <Column>
              <Caption {...media} />
            </Column>
          </CaptionWrapper>
          <Row>
            <Column width={[1, 1 / 4]}>
              <PostMetaDesktop>
                <PostMeta author={author} date={post.date} />
                <ShareLinks
                  url={`${state.frontity.url}${state.router.link}`}
                  title={post.title.rendered}
                  scrollToComment={() =>
                    commentsRef.current.scrollIntoView({ behavior: 'smooth' })}
                />
              </PostMetaDesktop>
            </Column>
            <Column width={[1, 2 / 3]}>
              <CategoryList categories={categories} />
              <PostTitle>
                <Html2React html={post.title.rendered} />
              </PostTitle>
              <PostMetaMobile>
                <PostMeta author={author} date={post.date} />
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
              <CategoryList categories={tags} light />
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
