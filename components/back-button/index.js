import React from 'react';
import PropTypes from 'prop-types';
import { BackButtonWrapper } from './styles';

const BackButton = ({ handleClick, title }) => {
  return (
    <BackButtonWrapper>
      <button onClick={handleClick}>
        {/* <GreenLeftArrowIcon /> */}
        <span className="title">{title}</span>
      </button>
    </BackButtonWrapper>
  );
};

BackButton.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
};

export default BackButton;
