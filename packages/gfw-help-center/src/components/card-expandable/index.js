import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import plusIcon from '../../assets/icons/plus.svg';
import minusIcon from '../../assets/icons/minus.svg';

import { Card, Title, Text, Icon } from './styles';

const ExpandableCard = ({
  title,
  text,
  thumbnail
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Card onClick={() => setOpen(!open)}>
      {thumbnail && <img src={thumbnail} alt={title} />}
      <div>
        <Title>{title}</Title>
        {open && (
          <Text>{text}</Text>
        )}
      </div>
      {open ? <Icon src={minusIcon} alt={title} /> : <Icon src={plusIcon} alt={title} />}
    </Card>
  );
};

export default connect(ExpandableCard);

ExpandableCard.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  text: PropTypes.node,
};
