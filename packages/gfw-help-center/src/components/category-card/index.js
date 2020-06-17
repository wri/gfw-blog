import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import { CloseIcon } from 'gfw-components';

import Link from '../link';

import { CardWrapper, CardImage, CardTitle, CardText } from './styles';

const CardContent = ({ title, text, extraText }) => (
  <>
    <CardImage src="" alt={title} />
    <div>
      <CardTitle>{title}</CardTitle>
      <CardText>{text}</CardText>
    </div>
    {extraText && (
      <CloseIcon
        css={css`
          height: 10px;
          width: 10px;
          max-height: 10px;
          max-width: 10px;
        `}
      />
    )}
  </>
);

CardContent.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  extraText: PropTypes.string,
};

const Card = (props) => {
  return props.link ? (
    <Link link={props.link}>
      <CardWrapper>
        <CardContent {...props} />
      </CardWrapper>
    </Link>
  ) : (
    <CardWrapper>
      <CardContent {...props} />
    </CardWrapper>
  );
};

Card.propTypes = {
  link: PropTypes.string,
};

export default connect(Card);
