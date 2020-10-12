import React from 'react';
import PropTypes from 'prop-types';

import { Title, Description } from './styles';

const Intro = ({ title, description }) => {
  return (
    <div>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </div>
  );
};

export default Intro;

Intro.propTypes = {
  title: PropTypes.string,
  description: PropTypes.node,
};
