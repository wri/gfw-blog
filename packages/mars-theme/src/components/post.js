import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, styled, css } from 'frontity';
import { Button, TwitterIcon, FacebookIcon } from 'gfw-components';
import Link from './link';
import List from './list';
import FeaturedMedia from './featured-media';
import Breadcrumbs from './breadcrumbs';
import Search from './search';
import SearchExpanded from './search/expanded';
import { SMALL_ENDPOINT, MEDIUM_ENDPOINT } from './heplers/css-endpoints';
import NewsletterIcon from '../assets/icons/social/envelope.svg';
import ChatIcon from '../assets/icons/social/comment.svg';
import CategoryNameList from './category/list-name';
import Item from './list/list-item';

const PostInfo = ({ data, author, dateStr, styles }) => (
  <div css={styles}>
    {data.isPost && (
      <InfoContainer>
        {author && (
          <StyledLink link={author.link}>
            <Author>
              By 
              {' '}
              <b>{author.name}</b>
            </Author>
          </StyledLink>
        )}
        <Fecha>
          {' '}
          Posted on 
          {' '}
          <b>{dateStr}</b>
        </Fecha>
      </InfoContainer>
    )}
    <ButtonsContainer>
      <a
        href="https://twitter.com/globalforests"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="twitter"
      >
        <Button
          css={css`
            border-color: #f0f0f0;
            svg {
              width: 20px;
              height: 20px;
            }
          `}
          theme="button-light round big"
        >
          <TwitterIcon />
        </Button>
      </a>
      <a
        href="https://www.facebook.com/globalforests/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="facebook"
      >
        <Button
          css={css`
            border-color: #f0f0f0;
            svg {
              width: 20px;
              height: 20px;
            }
          `}
          theme="button-light round big"
        >
          <FacebookIcon />
        </Button>
      </a>
      <a href="#">
        <Button
          css={css`
            border-color: #f0f0f0;
          `}
          theme="button-light round big"
        >
          <img src={ChatIcon} alt="" />
        </Button>
      </a>
      <a href="#">
        <Button theme="round big">
          <img src={NewsletterIcon} alt="" />
        </Button>
      </a>
      <Label>
        Subscribe to the
        <br />
        GFW newsletter
      </Label>
    </ButtonsContainer>
  </div>
);

const Post = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];

  const [feauturedImgDescription, setFeauturedImgDescription] = useState('');
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Get the data of the author.
  const author = state.source.author[post.author];
  // Get a human readable date.

  const date = new Date(post.date);
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const dateStr = `${month} ${date.getDate()}, ${date.getFullYear()}`;

  const categories = post.categories.map((id) => {
    return state.source.category[id];
  });

  const tags = post.tags.map((id) => {
    return state.source.tag[id];
  });

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch('/');
    List.preload();
  }, []);

  useEffect(() => {
    const { api } = libraries.source;
    const result = api.get({
      endpoint: 'media',
      params: { _embed: true, include: post.featured_media },
    });
    result.then((response) => {
      libraries.source.populate({ response, state, force: true }).then(() => {
        const description = state.source.attachment[
          post.featured_media
        ].description.rendered.replace(
          /<p\s+class="attachment">.+<\/p>/gim,
          ''
        );
        setFeauturedImgDescription(description);
      });
    });
  }, []);

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

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container id="post-content">
      <div className="row">
        <div className="column small-12">
          <BreadcrumbsContainer>
            <Breadcrumbs />
            <Search mobile title="" />
            <Search />
          </BreadcrumbsContainer>
          <SearchExpanded />
        </div>
      </div>
      {/* Look at the settings to see if we should include the featured image */}
      {state.theme.featured.showOnPost && (
        <FeaturedMedia
          id={post.featured_media}
          styles={`
          max-width: 1080px;
          margin: 0 auto;
          height: 240px;
          @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
            height: 500px
          }
      `}
        />
      )}
      {state.theme.featured.showOnPost && (
        <div className="row">
          <div className="column small-12">
            <MediaDescriptionWrapper>
              <Html2React html={feauturedImgDescription} />
            </MediaDescriptionWrapper>
          </div>
        </div>
      )}
      <div className="row">
        <div className="column small-12 medium-2">
          <PostInfo
            author={author}
            data={data}
            dateStr={dateStr}
            styles={css`
              display: none;

              @media screen and (min-width: ${SMALL_ENDPOINT}) {
                display: block;
              }
            `}
          />
        </div>

        <div className="column small-12 medium-7 medium-offset-1">
          <CategoryNameList
            categories={categories}
            itemStyles={`
              margin-top: 0;
            `}
          />
          <Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

          <PostInfo
            author={author}
            data={data}
            dateStr={dateStr}
            styles={css`
              display: block;

              @media screen and (min-width: ${SMALL_ENDPOINT}) {
                display: none;
              }
            `}
          />

          {/* Render the content using the Html2React component so the HTML is processed
          by the processors we included in the libraries.html2react.processors array. */}
          <Content>
            <Html2React html={post.content.rendered} />
            <CategoryNameList
              categories={tags}
              styles={`
                  margin-top: 0;
                  margin-bottom: 0;
                  line-height: 1.25rem !important;
              `}
              itemStyles={`
                margin-bottom: 1.25rem;
                margin-top: 0;
                background-color: #E5E5DF;
                color: #333 !important;
                a {
                  color: #333 !important;
                  font-weight: normal;
                }
                a:visited {
                  color: #333 !important;
                }
            `}
            />
          </Content>
        </div>
      </div>
      {relatedPosts && (
        <>
          <Divider />
          <div className="row">
            <div className="column small-12">
              <RelatedPostsTitle>Related articles</RelatedPostsTitle>
            </div>
            {relatedPosts.map((id) => {
              const item = state.source.post[id];
              return (
                <div
                  key={item.id + item.date + item.name}
                  className="column small-12 medium-6 large-4"
                >
                  <Item item={item} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </Container>
  ) : null;
};

Post.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  libraries: PropTypes.object,
};

PostInfo.propTypes = {
  data: PropTypes.object,
  author: PropTypes.object,
  dateStr: PropTypes.string,
  styles: PropTypes.object,
};

export default connect(Post);

const RelatedPostsTitle = styled.h3`
  text-transform: uppercase;
  line-height: 1.3333;
  font-weight: 500;
  margin-bottom: 2.5rem;
  font-size: 14px;

  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    margin-bottom: 3.5rem;
    font-size: 18px;
  }
`;

const MediaDescriptionWrapper = styled.div`
  color: #555;
  font-size: 0.75rem;
  line-height: 1.75;
  padding-top: 0.75rem;
  margin-bottom: 30px;

  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    margin-bottom: 60px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;

  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    flex-direction: column;
  }

  a {
    margin: 0 20px 20px 0;
  }
`;

const Label = styled.span`
  font-size: 1rem;
  line-height: 1.5;
  color: #777;
  display: none;

  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    display: block;
  }
`;

const InfoContainer = styled.div`
  margin-bottom: 30px;
`;

const Container = styled.div`
  margin: 0;
  padding: 0;
  padding-top: 3.125rem;
  width: 100%;
  overflow: hidden;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
  font-size: 1.875rem;
  line-height: 1.25;
  font-weight: 200;

  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    font-size: 3rem;
    line-height: 3.75rem;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  margin-bottom: 10px;
`;

const Author = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline-block;
`;

const Fecha = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const Divider = styled.div`
  border-top: 1px solid #e5e5df;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;

  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
`;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
const Content = styled.div`
  position: relative;
  font-size: 1.25rem;
  line-height: 2.25rem;
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;
  user-select: text;

  iframe,
  .wp-block-pullquote,
  .wp-block-gallery {
    margin: 0;
    margin-bottom: 20px;
    width: 100%;

    @media screen and (min-width: ${SMALL_ENDPOINT}) {
      width: calc(100% + (100% / 7));
      margin-left: calc(-100% / 7);
    }
  }

  blockquote {
    background-color: #fff;
    border: 0;
    font-size: 1.875rem;
    line-height: 1.5;

    @media screen and (max-width: ${SMALL_ENDPOINT}) {
      font-size: 1.5rem;
    }
  }

  .wp-block-gallery {
    img {
      height: 240px;

      @media screen and (min-width: ${SMALL_ENDPOINT}) {
        height: 480px;
      }
    }
  }

  iframe {
    display: block;
  }

  p {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  & > .attribute {
    color: #787878;
    font-style: italic;
    font-size: 1.25rem;
    line-height: 2.25rem;
    padding-top: 1.375rem;
    padding-bottom: 1.375rem;

    a {
      color: #97bd3d;
      &:hover {
        text-decoration: underline;
        color: #658022;
      }
    }

    @media screen and (max-width: ${SMALL_ENDPOINT}) {
      font-size: 1.125rem;
    }

    &::after {
      height: 2px;
      display: block;
      width: 65px;
      background-color: #e5e5df;
      content: '';
      margin-top: 2.625rem;
    }

    &::before {
      height: 2px;
      display: block;
      width: 65px;
      background-color: #e5e5df;
      content: '';
      margin-bottom: 2.625rem;
    }
  }

  & > hr {
    display: none;
  }

  & > * {
    font-size: 1.125rem;

    @media screen and (min-width: ${SMALL_ENDPOINT}) {
      font-size: 1.25rem;
    }
  }

  .c-carousel {
    margin: 30px 0;
    width: 100%;

    figure {
      margin: 0 auto !important;
      width: 100% !important;
    }

    .slick-prev,
    .slick-next {
      top: 100px;
      background-color: #333;
      z-index: 5;

      @media screen and (min-width: ${SMALL_ENDPOINT}) {
        top: 220px;
      }

      &:hover {
        background-color: #97bd3d;
      }
    }

    .slick-prev {
      left: -5px;

      @media screen and (min-width: ${SMALL_ENDPOINT}) {
        left: -150px;
      }
    }

    .slick-next {
      right: -5px;

      @media screen and (min-width: ${SMALL_ENDPOINT}) {
        right: -150px;
      }
    }
  }

  .c-carousel .slick-slide {
    @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
      opacity: 0;
      &.slick-current {
        opacity: 1;
      }
    }
  }

  p {
    line-height: 1.6em;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;

    @media screen and (min-width: ${SMALL_ENDPOINT}) {
      width: calc(100% + (100% / 7));
      margin-left: calc(-100% / 7);
    }
  }

  figcaption {
    font-size: 0.75rem;
    line-height: 1.75;
    padding-top: 0.75rem;
  }

  a {
    color: #97bd3d;
    text-decoration: none;
    font-weight: 600;
  }

  h3 {
    font-size: 1.25rem;
    line-height: 1.8;
    font-weight: 800;
  }

  /* Input fields styles */

  input[type='text'],
  input[type='email'],
  input[type='url'],
  input[type='tel'],
  input[type='number'],
  input[type='date'],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type='submit'] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
  }

  /* WordPress Core Align Classes */

  img {
    &.alignright,
    &.aligncenter,
    &.alignleft,
    &.imageright,
    &.imagecenter,
    &.imageleft {
      width: auto;
      margin: 0;

      @media screen and (min-width: ${SMALL_ENDPOINT}) {
        width: calc(100% + (100% / 7));
      }
    }
  }

  .alignright,
  .aligncenter,
  .alignleft,
  .imageright,
  .imagecenter,
  .imageleft {
    width: auto;
    margin: 0 0 30px 0;

    @media screen and (min-width: ${SMALL_ENDPOINT}) {
      width: calc(100% + (100% / 7));
      margin-left: calc(-100% / 7);
    }
  }
`;

Post.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  libraries: PropTypes.object,
};

const BreadcrumbsContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 30px;

  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    justify-content: space-between;
  }
`;
