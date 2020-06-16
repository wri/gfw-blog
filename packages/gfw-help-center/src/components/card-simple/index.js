import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import { Card, Title, Text } from './styles';
import icons from './icons';

const SimpleCard = ({ icon, title, text }) => {
  return (
    <Card>
      <img src={icons[icon]} alt={`${title}-icon`} />
      <Title>{title}</Title>
      <Text>{text}</Text>
    </Card>
  );
};

export default connect(SimpleCard);

SimpleCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};
