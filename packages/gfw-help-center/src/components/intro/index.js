import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import { Title, Description } from './styles';

const Intro = ({ title, description }) => {
  return (
    <>
      <Title>{title}</Title>
      <Description>
        <b>{description}</b>
      </Description>
    </>
  );
};

export default connect(Intro);

Intro.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
