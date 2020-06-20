import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';

import { CloseIcon } from 'gfw-components';

import Link from '../link';

import { CardWrapper, CardImage, CardTitle, CardText } from './styles';

const CardContent = ({ title, text, image, extraText }) => (
  <>
    {image && <CardImage src={image} alt={title} />}
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
  image: PropTypes.string,
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
      <CardContent {...props}>
        {props.children}
      </CardContent>
    </CardWrapper>
  );
};

Card.propTypes = {
  link: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node),PropTypes.node])
};

export default connect(Card);
