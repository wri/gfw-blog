import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

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
} from './styles';

const Post = ({ state, libraries, actions }) => {
  const data = state.source.get(state.router.link);
  const Html2React = libraries.html2react.Component;

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

  return data.isReady ? (
    <PostContainer>
      <div className="row">
        <div
          className="column small-12"
          css={css`
            margin-bottom: 40px;
          `}
        >
          <Breadcrumbs />
        </div>
      </div>
      <MediaWrapper>
        <Media {...media} />
      </MediaWrapper>
      <CaptionWrapper className="row">
        <div className="column small-12">
          <Caption {...media} />
        </div>
      </CaptionWrapper>
      <div className="row">
        <div className="column small-12 medium-3">
          <PostMetaDesktop>
            <PostMeta author={author} date={post.date} />
            <ShareLinks
              url={`${state.frontity.url}${state.router.link}`}
              title={post.title.rendered}
            />
          </PostMetaDesktop>
        </div>
        <div className="column small-12 medium-8">
          <CategoryList categories={categories} />
          <PostTitle>
            <Html2React html={post.title.rendered} />
          </PostTitle>
          <PostMetaMobile>
            <PostMeta author={author} date={post.date} />
            <ShareLinks
              url={`${state.frontity.url}${state.router.link}`}
              title={post.title.rendered}
            />
          </PostMetaMobile>
          <PostContent>
            <Html2React html={post.content.rendered} />
          </PostContent>
          <CategoryList categories={tags} light />
        </div>
      </div>
      <Divider />
      <div className="row">
        <div className="column small-12">
          <LatestTitle>Latest articles</LatestTitle>
        </div>
        {relatedPosts &&
          relatedPosts.map((p) => (
            <div
              className="column small-12 medium-6 large-4"
              css={css`
                margin-bottom: 40px;
              `}
            >
              <Card key={p.id} {...state.source.post[p]} />
            </div>
          ))}
      </div>
      <Divider />
      <div className="row">
        <div className="column small-12 medium-10 medium-offset-1 large-8 large-offset-2">
          <Comments {...post} />
        </div>
      </div>
    </PostContainer>
  ) : null;
};

Post.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  libraries: PropTypes.object,
};

export default connect(Post);
