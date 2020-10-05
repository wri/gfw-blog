import React from 'react';
import PropTypes from 'prop-types';
import { Desktop } from 'gfw-components';

import Media from '../media';

import CategoriesList from '../category-list';

import { Card, Title, Text, BackgroundImage, Icon, ArrowIcon } from './styles';

const SimpleCard = ({
  icon,
  title,
  text,
  backgroundImage,
  large,
  arrow,
  tools,
}) => (
  <Card large={large}>
    {backgroundImage && (
      <BackgroundImage>
        <Media {...backgroundImage} />
      </BackgroundImage>
    )}
    <div>
      {icon && <Icon src={icon.url} alt={icon.title} />}
      {tools && <CategoriesList categories={tools} />}
      {title && <Title light={!!backgroundImage}>{title}</Title>}
      {text && <Text light={!!backgroundImage}>{text}</Text>}
    </div>
    {arrow && (
      <Desktop>
        <ArrowIcon />
      </Desktop>
    )}
  </Card>
);

export default SimpleCard;

SimpleCard.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.node,
  large: PropTypes.bool,
  arrow: PropTypes.bool,
  tools: PropTypes.array,
  backgroundImage: PropTypes.object,
};
