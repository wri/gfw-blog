/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column, H3 } from 'gfw-components';

import Breadcrumbs from '../../components/breadcrumbs';
import Dropdown from '../../components/dropdown';
import theme from '../../app/theme';

import Content from '../../components/content';
import Menu from '../../components/menu';
import RelatedContent from '../../components/related-content';

import { Wrapper, ContentWrapper } from './styles';

const Page = ({ state, libraries }) => {
  const { tools } = state.source.data['all-tools/'];
  const route = state.source.get(state.router.link);

  const allParentPages = tools?.['0'];
  const currentPage = state.source[route.type][route.id];
  const siblingPages = currentPage?.parent
    ? tools[currentPage.parent]
    : tools[currentPage.id];

  // build the options for the dropdown
  const parentPageOptions = allParentPages?.map((tool) => ({
    name: tool.title.rendered,
    id: tool.id,
    link: tool.link,
  }));

  // build the options for the side bar menu
  const links = siblingPages?.map((sub, i) => ({
    label: sub.title.rendered,
    link: sub.link,
    active:
      (!currentPage.parent && i === 0) || currentPage.link === `${sub.link}/`,
  }));

  // get the current page content
  // if parent page get the first sibling
  const pageContent = currentPage.parent ? currentPage : siblingPages?.[0];

  // active parent page ID
  const currentParentPage = currentPage.parent || currentPage.id;

  // get page content
  const { title, content, acf } = pageContent || {};

  // build related content from acf
  const { related_content: relatedContent } = acf || {};

  const Html2React = libraries?.html2react?.Component;

  return (
    <Wrapper>
      <Row>
        <Column width={[3 / 4]}>
          <Breadcrumbs
            css={css`
              margin-bottom: 25px;

              ${theme.mediaQueries.small} {
                margin-bottom: 40px;
              }
            `}
          />
        </Column>
      </Row>
      <Row>
        <Column
          width={[1, 7 / 12]}
          css={css`
            margin-bottom: 90px;
          `}
        >
          <Dropdown items={parentPageOptions} selected={currentParentPage} />
        </Column>
      </Row>
      <Row>
        <Column width={[1 / 4]}>
          <Menu links={links} />
        </Column>
        <Column width={[3 / 4]}>
          {title && (
            <H3
              css={css`
                margin-bottom: 25px;
              `}
            >
              <Html2React html={title?.rendered} />
            </H3>
          )}
          {content && (
            <ContentWrapper>
              <Content>
                <Html2React html={content?.rendered} />
              </Content>
            </ContentWrapper>
          )}
          {relatedContent?.length > 0 && (
            <RelatedContent sections={relatedContent} />
          )}
        </Column>
      </Row>
    </Wrapper>
  );
};

Page.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
};

export default connect(Page);
