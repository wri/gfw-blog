import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column } from 'gfw-components';
import Card from '../category-card';

import { H3, H4, H5, P } from './styles';

const getRecursiveCards = (key, values, level) => {
  const titles = {
    3: H3,
    4: H4,
    5: H5,
  };
  const TitleComponent = titles[level];
  if (!titles[level]) return null;
  return (
    <div key={key}>
      <TitleComponent>{key}</TitleComponent>
      {values.length
        ? values.map((card) => <Card key={card.title} {...card} />)
        : Object.entries(values).map(([subkey, subvalue]) =>
            getRecursiveCards(subkey, subvalue, level + 1)
          )}
    </div>
  );
};

const CategoryContent = ({ title, text, cards }) => {
  return (
    <Row nested>
      <Column width={[1, 8 / 9]}>
        <H3>{title}</H3>
        <P>{text}</P>
        <video
          muted
          css={css`
            height: 400px;
            width: 100%;
            background-color: #313c3c;
          `}
        />
        {!cards.length &&
          Object.entries(cards).map(([key, value]) =>
            getRecursiveCards(key, value, 4)
          )}
      </Column>
    </Row>
  );
};

CategoryContent.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  cards: PropTypes.object,
};

export default connect(CategoryContent);
