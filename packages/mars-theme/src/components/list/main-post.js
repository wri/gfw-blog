import React from "react";
import { connect, styled } from "frontity";
import FeaturedMedia from "../featured-media";
import { LARGE_ENDPOINT, MEDIUM_ENDPOINT, SMALL_ENDPOINT } from '../heplers/css-endpoints';
import CategoryNameList from '../category/list-name';
import PostTitle from '../post-title';

const MainPost = ({ item, state }) => {
  const categories = item.categories.map(id => {
      return state.source.category[id].name;
  });

  const styles = `
    width: 100%;
    flex-wrap: wrap;
    position: relative;
    @media screen and (max-width: ${LARGE_ENDPOINT}) {
        width: 100%;
    }
    @media screen and (max-width: ${SMALL_ENDPOINT}) {
        width: 100%;
    }`;

  const mediaStyles = `
    height: 400px;
    @media screen and (max-width: ${LARGE_ENDPOINT}) {
        height: 300px;
    }
    @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
      height: 500px;
    }`;

    const Wrapper = styled.article`
      ${styles}
  `;

  const ContentWrapper = styled.div`
    height: 100%;
    position: absolute;
    display: flex;
    align-items: flex-end;
    flex-flow: wrap;
    top: 0;
    padding: 0 4rem;
    @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
      width: 50%;
      align-items: center;
    }
  `

  return (
    <Wrapper>
      <FeaturedMedia id={item.featured_media} styles={mediaStyles} />
      <ContentWrapper>
        <div>
          <CategoryNameList categories={categories} />
          <PostTitle styles={`
            padding-top: 0;
            padding-bottom: 1rem;
            color: #fff
          `}>
            {item.title.rendered}
          </PostTitle>
        </div>
        
      </ContentWrapper>
    </Wrapper>
  )
}

export default connect(MainPost);