import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import Media from '../media';
import Link from '../link';

import { Card, ContentWrapper, Title, Text, BannerImage, Logo } from './styles';

const ToolCard = ({ title, text, bannerImage, logo, link, active }) => (
  <Link link={link}>
    <Card active={active}>
      <ContentWrapper>
        <Title>{title}</Title>
        <Text>{text}</Text>
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
  </Link>
);

ToolCard.propTypes = {
  state: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.node,
  bannerImage: PropTypes.object,
  logo: PropTypes.object,
  link: PropTypes.string,
  active: PropTypes.bool,
};

export default connect(ToolCard);
