import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column } from 'gfw-components';

import Intro from '../../components/intro';
import Search from '../../components/search';

import Tools from './tools';
import UsingGFW from './using-gfw';

import { Wrapper } from './styles';

const HomePage = ({ state }) => (
  <Wrapper>
    <Row>
      <Column
        width={[1, 5 / 6, 2 / 3]}
        css={css`
          margin-bottom: 30px;
        `}
      >
        <Intro title="Help Center" description={state.frontity.description} />
      </Column>
      <Column
        css={css`
          margin-bottom: 100px;
        `}
      >
        <Search expanded />
      </Column>
      <Column
        css={css`
          margin-bottom: 50px;
        `}
      >
        <Tools />
        <UsingGFW />
      </Column>
    </Row>
  </Wrapper>
);

HomePage.propTypes = {
  state: PropTypes.object,
};

export default connect(HomePage);
