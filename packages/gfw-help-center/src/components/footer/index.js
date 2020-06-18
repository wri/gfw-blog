import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'frontity';
import { Row, Column, H4 } from 'gfw-components';
import SimpleCard from '../card-simple';

import supportCards from './config';

const Footer = () => {
  return (
    <Row>
      <Column>
        <H4
          css={css`
            margin-bottom: 30px;
          `}
        >
          Get support
        </H4>
      </Column>
      {supportCards.map((card) => {
        return (
          <Column width={[1, 1 / 2]} key={card.title}>
            <SimpleCard {...card} />
          </Column>
        );
      })}
    </Row>
  );
};

export default Footer;

Footer.propTypes = {
  items: PropTypes.array,
  state: PropTypes.object,
};
