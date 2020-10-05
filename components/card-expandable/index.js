import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Content from 'components/content';

import {
  Card,
  Title,
  Text,
  MinusIcon,
  PlusIcon,
  Thumbnail,
  ContentWrapper,
} from './styles';

const ExpandableCard = ({ title, text, excerpt, thumbnail, small }) => {
  const [open, setOpen] = useState(false);

  return (
    <Card onClick={() => setOpen(!open)}>
      {thumbnail && <Thumbnail src={thumbnail} alt={title} />}
      <ContentWrapper>
        <Title>{title}</Title>
        {open && text && (
          <Content>
            <Text small={small}>{text}</Text>
          </Content>
        )}
        {!open && excerpt && (
          <Content>
            <Text small={small}>{excerpt}</Text>
          </Content>
        )}
      </ContentWrapper>
      {open ? <MinusIcon /> : <PlusIcon />}
    </Card>
  );
};

ExpandableCard.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  text: PropTypes.node,
  excerpt: PropTypes.node,
  small: PropTypes.bool,
};

export default ExpandableCard;
