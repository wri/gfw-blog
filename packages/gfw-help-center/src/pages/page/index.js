import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column, H3 } from 'gfw-components';
import Breadcrumbs from '../../components/breadcrumbs';
import Dropdown from '../../components/dropdown';
import Link from '../../components/link';
import theme from '../../app/theme';

import Content from '../../components/content';

import { Wrapper, MenuCategory } from './styles';

const Page = ({ state, libraries }) => {
  const Html2React = libraries?.html2react?.Component;

  const links = [
    { label: 'Overview', link: '' },
    { label: 'Step-by-step instructions', link: '' },
    { label: 'Webinars', link: '' },
    { label: 'Additional materials', link: '' },
    { label: 'FAQs', link: '' },
  ];

  const data = state.source.get(state.router.link);
  const pageData = state.source[data.type][data.id];
  const { title, content } = pageData || {};

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
        <Column width={[1, 7 / 12]}>
          <Dropdown />
        </Column>
      </Row>
      <Row>
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
          <H3>
            <Html2React html={title?.rendered} />
          </H3>
          <Content>
            <Html2React html={content?.rendered} />
          </Content>
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
