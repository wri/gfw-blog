import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { format } from 'date-fns';

import { Row, Column, Loader, Button } from 'gfw-components';

import PostContent from '../../components/content';
import Breadcrumbs from '../../components/breadcrumbs';
import CategoryList from '../../components/category-list';
import RelatedContent from '../../components/related-content';

import PrintIcon from '../../assets/icons/comment.svg';

import { PostContainer, Search, BreadCrumbsWrapper, PostTitle } from './styles';

const isServer = typeof window === 'undefined';

const Post = ({ state, libraries }) => {
  const Html2React = libraries.html2react.Component;
  const data = state.source.get(state.router.link);
  const pageData = state.source[data.type][data.id];

  const {
    title,
    content,
    modified,
    tags: tagIds,
    acf: { related_content },
  } = pageData || {};

  const allTags = Object.values(state.source.tag);
  const tags = allTags?.filter((tag) => tagIds.includes(tag.id));

  const relatedContent = related_content?.filter(
    (c) => c.acf_fc_layout !== 'posts'
  );
  const blogPosts = related_content?.filter((c) => c.acf_fc_layout === 'posts');

  const handlePrint = () => {
    if (!isServer) {
      window.print();
    }
  };

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
          <Row>
            <Column width={[1, 1 / 4]}>
              {`Last updated ${format(new Date(modified), 'MMMM do yyyy')}`}
              <Button light round onClick={handlePrint}>
                <img src={PrintIcon} alt="print this article" />
              </Button>
              Print this article
            </Column>
            <Column width={[1, 3 / 4]}>
              <PostTitle className="notranslate">
                <Html2React html={title.rendered} />
              </PostTitle>
              <PostContent>
                <Html2React html={content.rendered} />
              </PostContent>
              {tags && <CategoryList categories={tags} light />}
              {relatedContent && <RelatedContent sections={relatedContent} />}
            </Column>
          </Row>
          <Row>
            <Column>
              {blogPosts && <RelatedContent sections={blogPosts} />}
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
  libraries: PropTypes.object,
};

export default connect(Post);
