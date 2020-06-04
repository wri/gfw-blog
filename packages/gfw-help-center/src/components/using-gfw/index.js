import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { Row, Column } from 'gfw-components';
import SimpleCard from '../card-simple';

import { H4Wrapper, Banner, BannerTitle, BannerText } from './styles';

const UsingGFW = () => {
  const cards = [
    {
      title: 'FAQs',
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.',
      icon: 'question',
    },
    {
      title: 'Account management',
      text:
        'Learn how to set up a MyGFW account and manage your subscriptions.',
      icon: 'settings',
    },
    {
      title: 'Developer docs',
      text:
        'A complete API reference of the Global Forest Watch and Resource Watch tools.',
      icon: 'dev',
    },
  ];

  return (
    <>
      <H4Wrapper>USING GLOBAL FOREST WATCH</H4Wrapper>
      <Row>
        <Banner>
          <img src="" alt="map-icon" />
          <BannerTitle>See how people use GFW</BannerTitle>
          <BannerText>
            Learn how other groups like yours use GFW and how to apply it to
            your work.
          </BannerText>
        </Banner>
      </Row>
      <Row nested>
        {cards.map((card) => {
          // const card = state.source.get(item.link);
          return (
            <Column width={[1, 1 / 3]} key={card.title}>
              <SimpleCard {...card} />
            </Column>
          );
        })}
      </Row>
    </>
  );
};

export default connect(UsingGFW);

UsingGFW.propTypes = {
  items: PropTypes.array,
  state: PropTypes.object,
};
