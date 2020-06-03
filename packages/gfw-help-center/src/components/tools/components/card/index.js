import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import { Card, Title, Text, Image } from './styles';

const ToolCard = (props) => {
  const { title, text, image } = props;
  return (
    <Card>
      <Title>{title}</Title>
      <Text>{text}</Text>
      <Image src={image} alt={title} />
    </Card>
  );
};

export default connect(ToolCard);

ToolCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
};
