import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import Media from '../media';
import Link from '../link';

import CategoriesList from '../category-list';

import arrowIconSrc from '../../assets/icons/chevron-down.svg';

import { Card, Title, Text, BackgroundImage, Icon, ArrowIcon } from './styles';

const SimpleCard = ({
  link,
  icon,
  title,
  text,
  backgroundImage,
  large,
  arrow,
  categories,
}) => (
  <Link link={link}>
    <Card large={large}>
      {backgroundImage && (
        <BackgroundImage>
          <Media {...backgroundImage} />
        </BackgroundImage>
      )}
      <div>
        {icon && <Icon src={icon.url} alt={icon.title} />}
        {categories && <CategoriesList categories={categories} />}
        <Title light={!!backgroundImage}>{title}</Title>
        <Text light={!!backgroundImage}>{text}</Text>
      </div>
      {arrow && <ArrowIcon src={arrowIconSrc} alt={title} />}
    </Card>
  </Link>
);

export default connect(SimpleCard);

SimpleCard.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.node,
  large: PropTypes.bool,
  arrow: PropTypes.bool,
  categories: PropTypes.array,
  backgroundImage: PropTypes.object,
};
