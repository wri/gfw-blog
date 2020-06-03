import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'frontity';
import Card from './components/card';

import { Wrapper, Container, Title } from './styles';

const Tools = ({ ...props }) => {
  const cards = [
    {
      title: 'Map and Dashboards',
      text: `Explore hundreds of spatial datasets with the GFW Map, including near-real-time deforestation and fire alerts as well as
    high-resolution satellite imagery.`,
      image: '',
    },
    {
      title: 'Forest Watcher',
      text:
        'For those who are actively monitoring and managing forests. Forest Watcher helps you take GFW data offline and into the field.',
      image: '',
    },
  ];
  return (
    <Wrapper {...props}>
      <Title>Getting started on the GFW tools.</Title>
      <Container>
        {cards.map((card) => (
          <Card {...card} />
        ))}
      </Container>
    </Wrapper>
  );
};

export default connect(Tools);

Tools.propTypes = {};
