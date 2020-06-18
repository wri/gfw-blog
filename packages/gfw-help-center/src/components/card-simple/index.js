import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import Media from '../media';
import Link from '../link';

import { Card, Title, Text, BackgroundImage, Icon } from './styles';

const SimpleCard = ({ link, icon, title, text, backgroundImage, large }) => {
  return (
    <Link link={link}>
      <Card large={large}>
        {backgroundImage && (
          <BackgroundImage>
            <Media {...backgroundImage} />
          </BackgroundImage>
        )}
        {icon && <Icon src={icon.url} alt={icon.title} />}
        <Title light={!!backgroundImage}>{title}</Title>
        <Text light={!!backgroundImage}>{text}</Text>
      </Card>
    </Link>
  );
};

export default connect(SimpleCard);

SimpleCard.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.string,
  large: PropTypes.bool,
  backgroundImage: PropTypes.object,
};
