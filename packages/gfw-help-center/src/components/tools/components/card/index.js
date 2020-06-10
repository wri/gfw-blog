import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import { Card, Title, Text, Image, Logo } from './styles';
import Media from '../../../media';

const ToolCard = (props) => {
  const { title, text, image, logo, state } = props;
  const media = state?.source?.attachment[image.id];
  console.log({ title, text, image, logo, media });
  return (
    <Card>
      <Title>{title}</Title>
      <Text>{text}</Text>
      {/* <Image
        src={images[image]['1x']}
        srcset={`${images[image]['1x']} 1x, ${images[image]['2x']} 2x`}
        alt={image}
      /> */}
      <Media {...image} />
      {/* logo && (
        <Logo
          src={logos[logo]['1x']}
          srcset={`${logos[logo]['1x']} 1x, ${logos[logo]['2x']} 2x`}
          alt={logo}
        />
      ) */}
    </Card>
  );
};

export default connect(ToolCard);

ToolCard.propTypes = {
  state: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  logo: PropTypes.string,
};
