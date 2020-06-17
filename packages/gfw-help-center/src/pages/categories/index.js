/* eslint-disable no-plusplus */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column } from 'gfw-components';
import Breadcrumbs from '../../components/breadcrumbs';
import Dropdown from '../../components/dropdown';
import Link from '../../components/link';
import CategoryContent from '../../components/category-content';
import theme from '../../app/theme';

import { Wrapper, CategoriesWrapper, MenuCategory } from './styles';

const CategoriesPage = () => {
  const links = [
    { label: 'Overview', link: '' },
    { label: 'Step-by-step instructions', link: '' },
    { label: 'Webinars', link: '' },
    { label: 'Additional materials', link: '' },
    { label: 'FAQs', link: '' },
  ];

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
        <Column width={[1, 7 / 12]}>
          <Dropdown
            items={[
              {
                name: 'asdf',
                link: '/',
              },
              {
                name: 'ghkj',
                link: '/help',
              },
            ]}
            // selected={null}
          />
        </Column>
        <CategoriesWrapper>
          <Column width={[1 / 4]}>
            <ul>
              {links.map((l, i) => (
                <MenuCategory
                  key={l.label}
                  css={
                    i === 0 &&
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
            <CategoryContent
              title="Overview"
              text={`Most people start here! Explore hundreds of spatial datasets with the GFW Map, including near-real-time deforestation
              and fire alerts as well as high-resolution satellite imagery.`}
              cards={{
                'Who uses the Map and Dashboards?': {
                  JOURNALISM: [
                    {
                      title: 'Mongabay',
                      text: `The journalism organization Mongabay uses GFW’s map to identify areas of recent clearing and produce timely,
                      data-driven news stories on how the world’s forests are changing. `,
                      extraText: `Description dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam
                        malesuada erat ut turpis link.

                        Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam
                        erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.`,
                    },
                    {
                      title: 'Organization name',
                      text: `Description dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam
                        malesuada erat ut turpis. `,
                    },
                  ],
                },
                'First level cards here': [
                  {
                    title: 'An interesting title',
                    text: `The journalism organization Mongabay uses GFW’s map to identify areas of recent clearing and produce timely,
                    data-driven news stories on how the world’s forests are changing. `,
                    link: '/',
                  },
                  {
                    title: 'Organization name',
                    text: `Description dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam
                      malesuada erat ut turpis. `,
                  },
                ],
              }}
            />
          </Column>
        </CategoriesWrapper>
      </Row>
    </Wrapper>
  );
};

CategoriesPage.propTypes = {};

export default connect(CategoriesPage);
