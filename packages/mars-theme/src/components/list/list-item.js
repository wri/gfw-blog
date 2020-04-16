import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import FeaturedMedia from "../featured-media";
import CategoryNameList from '../category/list-name';
import PostTitle from '../post-title'
import { LARGE_ENDPOINT, SMALL_ENDPOINT } from '../heplers/css-endpoints';

/**
 * Item Component
 *
 * It renders the preview of a blog post. Each blog post contains
 * - Title: clickable title of the post
 * - Author: name of author and published date
 * - FeaturedMedia: the featured image/video of the post
 */
const Item = ({ state, item, styles }) => {
  const author = state.source.author[item.author];
  const date = new Date(item.date);
  const categories = item.categories.map(id => {
    return state.source.category[id].name;
  })

  const Wrapper = styled.article`
    width: 31.82%;
    flex-wrap: wrap;
    @media screen and (max-width: ${LARGE_ENDPOINT}) {
      width: 49%;
    }
    @media screen and (max-width: ${SMALL_ENDPOINT}) {
      width: 100%;
    }
    ${styles}
  `;

  return (
    <Wrapper>
      <div>
        {/* If the post has an author, we render a clickable author text. */}
        {author && (
          <StyledLink link={author.link}>
            <AuthorName>
              By <b>{author.name}</b>
            </AuthorName>
          </StyledLink>
        )}
        <PublishDate>
          {" "}
          on <b>{date.toDateString()}</b>
        </PublishDate>
      </div>

      {/*
       * If the want to show featured media in the
       * list of featured posts, we render the media.
       */}
      {state.theme.featured.showOnList && (
        <FeaturedMedia id={item.featured_media} />
      )}

      {/* Show categories of the post */}
      <CategoryNameList categories={categories} />

      <Link link={item.link}>
        <PostTitle styles={`
          padding-top: 0;
          padding-bottom: 1rem;
        `}>
          {item.title.rendered}
        </PostTitle>
      </Link>
      

      {/* If the post has an excerpt (short summary text), we render it */}
      {item.excerpt && (
        <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
      )}
    </Wrapper>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);

const AuthorName = styled.span`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
`;

const StyledLink = styled(Link)`
  padding: 15px 0;
`;

const PublishDate = styled.span`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
`;

const Excerpt = styled.div`
  line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);
`;
