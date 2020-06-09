/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column } from 'gfw-components';
import Breadcrumbs from '../../components/breadcrumbs';
import Dropdown from '../../components/dropdown';
import Link from '../../components/link';
import theme from '../../app/theme';

import { Wrapper } from './styles';

const HomePage = ({ state }) => {
  // const data = state.source.get(state.router.link);
  const links = [
    {label: 'Overview', link: ''},
    {label: 'Step-by-step instructions', link: ''},
    {label: 'Webinars', link: ''},
    {label: 'Additional materials', link: ''},
    {label: 'FAQs', link: ''}
  ]

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
        <Column width={[1]}>
          <Dropdown
            items={[{
              name: 'asdf',
              link: '/'
            },{
              name: 'ghkj',
              link: '/help'
            }]}
            // selected={null}
          />
        </Column>
        <Column width={[1/4]}>
          <ul>
            {links.map(l => (
              <li key={l.label}>
                <Link link={l.link} onClick={() => {}}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Column>
      </Row>
    </Wrapper>
  );
};

HomePage.propTypes = {
  state: PropTypes.object,
};

export default connect(HomePage);
