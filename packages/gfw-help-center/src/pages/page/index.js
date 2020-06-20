/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column, H3, H4 } from 'gfw-components';
import axios from 'axios';

import Breadcrumbs from '../../components/breadcrumbs';
import Dropdown from '../../components/dropdown';
import Link from '../../components/link';
import theme from '../../app/theme';

import Content from '../../components/content';
import SimpleCard from '../../components/card-simple';

import { Wrapper, MenuCategory } from './styles';

const Page = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  // get current page data
  const page = state.source[data.type][data.id];

  // get sibling page data for menu
  const { tools } = state.source.data['all-tools/'];
  // if we are at the parent page then parent will be undefined
  // we can get sibling from the id of the page itself
  const siblingData = page.parent ? tools[page.parent] : tools[page.id];

  // for the dropdown menu we need all parents
  const parentTools = tools?.['0'];

  // build the parent page options for the dropdown
  const parentPageOptions = parentTools?.map((tool) => ({
    name: tool.title.rendered,
    id: tool.id,
    link: tool.link,
  }));

  // build the sibling page options for the side bar menu
  const links = siblingData?.map((sub, i) => ({
    label: sub.title.rendered,
    link: sub.link,
    active: (!page.parent && i === 0) || page.link === `${sub.link}/`,
  }));

  const pageContent = page.parent ? page : siblingData?.[0];

  const currentParentPage = page.parent || page.id;

  const { title, content, acf } = pageContent || {};

  const { related_content: relatedContent } = acf || {};

  const { acf_fc_layout, content: relatedPosts } = relatedContent?.[0] || {};

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (acf_fc_layout) {
      axios
        .get(
          `${
            state.source.api
          }/wp/v2/${acf_fc_layout}?includes=${relatedPosts?.join(',')}`
        )
        .then((response) => {
          setArticles(response.data);
        });
    }
  }, []);

  const Html2React = libraries?.html2react?.Component;
  // console.log(data, page, state.source);

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
          <ul>
            {links?.map((l) => (
              <MenuCategory
                key={l.label}
                css={
                  l.active &&
                  css`
                    a {
                      color: #97bd3d;
                    }
                  `
                }
              >
                <Link link={l.link} onClick={() => {}}>
                  {l.label}
                </Link>
              </MenuCategory>
            ))}
          </ul>
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
            <Content>
              <Html2React html={content?.rendered} />
            </Content>
          )}
          {relatedContent?.map((section) => (
            <div key={section.title}>
              <H4
                css={css`
                  margin-bottom: 30px;
                `}
              >
                {section.title}
              </H4>
              {articles?.map((post) => (
                <SimpleCard
                  key={post}
                  title={post.title.rendered}
                  text={<Html2React html={post.content.rendered} />}
                  link={post.link}
                  arrow
                />
              ))}
            </div>
          ))}
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
