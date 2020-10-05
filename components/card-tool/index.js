import React from 'react';
import PropTypes from 'prop-types';

import Media from '../media';

import { Card, ContentWrapper, Title, Text, BannerImage, Logo } from './styles';

const ToolCard = ({ title, text, bannerImage, logo, active }) => (
  <Card active={active}>
    <ContentWrapper>
      {title && <Title>{title}</Title>}
      {text && <Text>{text}</Text>}
    </ContentWrapper>
    {logo && (
      <Logo>
        <Media {...logo} />
      </Logo>
    )}
    {bannerImage && (
      <BannerImage>
        <Media {...bannerImage} />
      </BannerImage>
    )}
  </Card>
);

ToolCard.propTypes = {
  state: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.node,
  bannerImage: PropTypes.object,
  logo: PropTypes.object,
  active: PropTypes.bool,
};

export default ToolCard;
