import React from 'react';
import PropTypes from 'prop-types';

import treeIcon from 'assets/images/tree-success.png';

import {
  Container,
  StyledImage,
  Title,
  Description,
  TreeErrorIcon,
} from './styles';

const Message = ({ error, title, description, small }) => (
  <Container>
    {error ? (
      <TreeErrorIcon />
    ) : (
      <StyledImage src={treeIcon} alt="success tree" />
    )}
    <Title small={small}>{title}</Title>
    <Description small={small}>{description}</Description>
  </Container>
);

Message.propTypes = {
  error: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  small: PropTypes.bool,
};

export default Message;
