import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled } from 'frontity';
import { Row, Column, H4 } from 'gfw-components';
import Card from './components/card';

const H4Wrapper = styled(H4)`
  margin: 100px 0 50px;
`;

const Tools = () => {
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
    <>
      <H4Wrapper>Getting started on the GFW tools.</H4Wrapper>
      <Row nested>
        {cards.map((card) => {
          // const card = state.source.get(item.link);
          return (
            <Column width={[1, 1 / 2]} key={card.title}>
              <Card {...card} />
            </Column>
          );
        })}
      </Row>
    </>
  );
};

export default connect(Tools);

Tools.propTypes = {
  items: PropTypes.array,
  state: PropTypes.object,
};
