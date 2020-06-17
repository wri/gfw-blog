import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import Media from '../media';
import Link from '../link';

import { Card, Title, Text, Image, Logo } from './styles';

const ToolCard = ({ title, text, image, logo, link, active }) => (
  <Link link={link}>
    <Card active={active}>
      <div>
        <Title>{title}</Title>
        <Text>{text}</Text>
      </div>
      {logo && (
        <Logo>
          <Media {...logo} />
        </Logo>
      )}
      {image && (
        <Image>
          <Media {...image} />
        </Image>
      )}
    </Card>
  </Link>
);

export default connect(ToolCard);

ToolCard.propTypes = {
  state: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  logo: PropTypes.string,
  link: PropTypes.string,
  active: PropTypes.bool,
};
