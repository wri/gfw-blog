import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import {} from './styles';

const Card = ({ title, text }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

const CategoryContent = ({ title, text, cards }) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{text}</p>
      <video
        muted
        css={css`
          height: 408px;
          width: 730px;
          background-color: #313c3c;
        `}
      />
      {!cards.length &&
        Object.entries(cards).map(([key, value]) => (
          <>
            <h4>{key}</h4>
            {value.length
              ? value.map((card) => <Card {...card} />)
              : Object.entries(value).map(([subkey, subvalue]) => (
                <>
                  <h5>{subkey}</h5>
                  {subvalue.map((card) => (
                    <Card {...card} />
                    ))}
                </>
                ))}
          </>
        ))}
    </>
  );
};

CategoryContent.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  cards: PropTypes.oneOf(PropTypes.array, PropTypes.object),
};

export default connect(CategoryContent);
