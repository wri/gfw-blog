import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import { Title, Description } from './styles';

const Intro = ({ state }) => {
  return (
    <>
      <Title>Global Forest Watch Blog</Title>
      <Description>
        <b>{state.frontity.description}</b>
      </Description>
    </>
  );
};

export default connect(Intro);

Intro.propTypes = {
  state: PropTypes.object,
};
