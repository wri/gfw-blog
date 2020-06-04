import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import { Card, Title, Text, Image, Logo } from './styles';

import md from '../../../../assets/images/mapsdashboards.png';
import md2 from '../../../../assets/images/mapsdashboards@2x.png';
import fw from '../../../../assets/images/forestwatcher.png';
import fw2 from '../../../../assets/images/forestwatcher@2x.png';

import gfw from '../../../../assets/logos/gfw.png';
import gfw2 from '../../../../assets/logos/gfw@2x.png';
import fwlogo from '../../../../assets/logos/fw.png';
import fwlogo2 from '../../../../assets/logos/fw@2x.png';

const images = {
  mapsdashboards: {
    '1x': md,
    '2x': md2,
  },
  forestwatcher: {
    '1x': fw,
    '2x': fw2,
  },
};

const logos = {
  gfw: {
    '1x': gfw,
    '2x': gfw2,
  },
  fw: {
    '1x': fwlogo,
    '2x': fwlogo2,
  },
};

const ToolCard = (props) => {
  const { title, text, image, logo } = props;
  return (
    <Card>
      <Title>{title}</Title>
      <Text>{text}</Text>
      <Image
        src={images[image]['1x']}
        srcset={`${images[image]['1x']} 1x, ${images[image]['2x']} 2x`}
        alt={image}
      />
      {logo && (
        <Logo
          src={logos[logo]['1x']}
          srcset={`${logos[logo]['1x']} 1x, ${logos[logo]['2x']} 2x`}
          alt={logo}
        />
      )}
    </Card>
  );
};

export default connect(ToolCard);

ToolCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  logo: PropTypes.string,
};
