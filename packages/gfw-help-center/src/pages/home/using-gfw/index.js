import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column } from 'gfw-components';
import SimpleCard from '../../../components/card-simple';

import {
  H4Wrapper,
  Banner,
  BannerBackground,
  BannerTitle,
  BannerText,
} from './styles';

import useBg from '../../../assets/images/how_people_use_bg.jpg';
import useBg2 from '../../../assets/images/how_people_use_bg@2x.jpg';
import mapIcon from '../../../assets/icons/map.svg';

import usingGfwCards from './cards';

const UsingGFW = () => {
  return (
    <div
      css={css`
        margin-bottom: 80px;
      `}
    >
      <H4Wrapper>USING GLOBAL FOREST WATCH</H4Wrapper>
      <Row>
        <Banner>
          <div
            css={css`
              position: relative;
              z-index: 2;
            `}
          >
            <img src={mapIcon} alt="map-icon" />
            <BannerTitle>See how people use GFW</BannerTitle>
            <BannerText>
              Learn how other groups like yours use GFW and how to apply it to
              your work.
            </BannerText>
          </div>
          <BannerBackground
            src={useBg}
            srcSet={`${useBg2} 2x, ${useBg} 1x`}
            alt="bg"
          />
        </Banner>
      </Row>
      <Row nested>
        {usingGfwCards.map((card) => {
          return (
            <Column width={[1, 1 / 3]} key={card.title}>
              <SimpleCard {...card} />
            </Column>
          );
        })}
      </Row>
    </div>
  );
};

export default connect(UsingGFW);

UsingGFW.propTypes = {
  items: PropTypes.array,
  state: PropTypes.object,
};
