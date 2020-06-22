import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import Content from '../content';

import plusIcon from '../../assets/icons/plus.svg';
import minusIcon from '../../assets/icons/minus.svg';

import { Card, Title, Text, Icon, Thumbnail, ContentWrapper } from './styles';

const ExpandableCard = ({ title, text, thumbnail, small }) => {
  const [open, setOpen] = useState(false);

  return (
    <Card onClick={() => setOpen(!open)}>
      {thumbnail && <Thumbnail src={thumbnail} alt={title} />}
      <ContentWrapper>
        <Title>{title}</Title>
        {open && (
          <Content>
            <Text small={small}>{text}</Text>
          </Content>
        )}
      </ContentWrapper>
      {open ? (
        <Icon src={minusIcon} alt={title} />
      ) : (
        <Icon src={plusIcon} alt={title} />
      )}
    </Card>
  );
};

ExpandableCard.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  text: PropTypes.node,
  small: PropTypes.bool,
};

export default connect(ExpandableCard);
