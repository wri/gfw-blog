import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import { H3, H4, H5, P } from './styles';

const Card = ({ title, text }) => {
  return (
    <div key={title}>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

const getRecursiveCards = (key, values, level) => {
  const titles = {
    3: H3,
    4: H4,
    5: H5,
  };
  const TitleComponent = titles[level];
  if (!titles[level]) return null;
  return (
    <>
      <TitleComponent>{key}</TitleComponent>
      {values.length
        ? values.map((card) => <Card {...card} />)
        : Object.entries(values).map(([subkey, subvalue]) =>
            getRecursiveCards(subkey, subvalue, level + 1)
          )}
    </>
  );
};

const CategoryContent = ({ title, text, cards }) => {
  return (
    <>
      <H3>{title}</H3>
      <P>{text}</P>
      <video
        muted
        css={css`
          height: 408px;
          width: 730px;
          background-color: #313c3c;
        `}
      />
      {!cards.length &&
        Object.entries(cards).map(([key, value]) =>
          getRecursiveCards(key, value, 4)
        )}
    </>
  );
};

CategoryContent.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  cards: PropTypes.oneOf(PropTypes.array, PropTypes.object),
};

export default connect(CategoryContent);
