import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { format } from 'date-fns';
import ReactToPrint from 'react-to-print';
import ReactHtmlParser from 'react-html-parser';
import Sticky from 'react-stickynode';

import { Row, Column, Desktop, Mobile } from 'gfw-components';

import PostContent from 'components/content';
import Breadcrumbs from 'components/breadcrumbs';
import CategoryList from 'components/category-list';
import RelatedContent from 'components/related-content';

import PrintIconSrc from 'assets/icons/print.svg';

import PrintArticle from './print';

import {
  PostContainer,
  BreadCrumbsWrapper,
  Search,
  PostTitle,
  TagsWrapper,
  Divider,
  StyledButton,
  MetaItem,
  PostContentWrapper,
} from './styles';

const Article = ({ article, isGuide }) => {
  const { title, content, modified, tags, acf, tools } = article || {};
  const { related_content } = acf || {};
  const relatedContent =
    related_content?.length &&
    related_content?.filter((c) => c.acf_fc_layout !== 'posts');
  const blogPosts =
    related_content?.length &&
    related_content?.filter((c) => c.acf_fc_layout === 'posts');

  const contentEl = useRef(null);

  const pageLabel = isGuide
    ? 'Step by step instructions'
    : 'Additional materials';
  const pageSlug = isGuide ? 'guides' : 'additional-materials';

  const breadCrumbs = article?.tools?.length
    ? [
        {
          label: article?.tools?.[0]?.name,
          href: article?.tools?.[0]?.link,
        },
        {
          label: pageLabel,
          href: `/${article?.tools?.[0]?.slug}/${pageSlug}/`,
        },
        {
          label: article?.title,
        },
      ]
    : [
        {
          label: pageLabel,
        },
        {
          label: article?.title,
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
          <Breadcrumbs links={breadCrumbs} />
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
      <div className="sticky-boundary" style={{ position: 'relative' }}>
        <Row>
          <Column width={[1, 1 / 4]}>
            <Desktop>
              <Sticky top={120} bottomBoundary=".sticky-boundary">
                <MetaItem>
                  {`Last updated ${format(new Date(modified), 'MMMM do yyyy')}`}
                </MetaItem>
                <ReactToPrint
                  documentTitle="Global Forest Watch Help Center"
                  trigger={() => (
                    <StyledButton light round>
                      <PrintIconSrc />
                    </StyledButton>
                  )}
                  content={() => contentEl.current}
                />
                <div
                  css={css`
                    display: none;
                  `}
                >
                  <PrintArticle ref={contentEl} article={article} />
                </div>
                <MetaItem>Print this article</MetaItem>
              </Sticky>
            </Desktop>
            <Mobile>
              <MetaItem>
                {`Last updated ${format(new Date(modified), 'MMMM do yyyy')}`}
              </MetaItem>
              <ReactToPrint
                documentTitle="Global Forest Watch Help Center"
                trigger={() => (
                  <StyledButton light round>
                    <PrintIconSrc />
                  </StyledButton>
                )}
                content={() => contentEl.current}
              />
              <div
                css={css`
                  display: none;
                `}
              >
                <PrintArticle ref={contentEl} article={article} />
              </div>
              <MetaItem>Print this article</MetaItem>
            </Mobile>
          </Column>
          <Column width={[1, 7 / 12]}>
            {!!tools?.length && (
              <CategoryList
                categories={tools}
                css={css`
                  margin-bottom: 20px;
                `}
              />
            )}
            <PostTitle className="notranslate">
              {ReactHtmlParser(title)}
            </PostTitle>
            <PostContentWrapper>
              <PostContent align="left">
                {ReactHtmlParser(content.rendered)}
              </PostContent>
              {tags && (
                <TagsWrapper>
                  <CategoryList categories={tags} light />
                </TagsWrapper>
              )}
            </PostContentWrapper>
            {relatedContent && (
              <>
                <Divider />
                <RelatedContent sections={relatedContent} />
              </>
            )}
          </Column>
        </Row>
      </div>
      {!!blogPosts?.length && (
        <>
          <Divider />
          <Row>
            <Column>
              <RelatedContent sections={blogPosts} maxCols={3} />
            </Column>
          </Row>
          <Divider />
        </>
      )}
    </PostContainer>
  );
};

Article.propTypes = {
  article: PropTypes.object,
  isGuide: PropTypes.bool,
};

export default Article;
