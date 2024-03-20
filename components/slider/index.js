import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Card, { CARD_MEDIA_SIZE } from 'components/card';
import LeftArrowIcon from 'assets/icons/left-arrow.svg';
import RightArrowIcon from 'assets/icons/right-arrow.svg';
import SliderWrapper from './styles';

/**
 * see: https://stackoverflow.com/a/52747760
 * @param {*} t current time
 * @param {*} b start value
 * @param {*} c change in value
 * @param {*} d duration
 * @returns
 */
Math.easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;

  if (t < 1) {
    return (c / 2) * t * t + b;
  }

  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

const scroll = (element, change, duration) => {
  const start = element.scrollLeft;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = () => {
    currentTime += increment;
    const value = Math.easeInOutQuad(currentTime, start, change, duration);

    element.scrollLeft = value;

    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };

  animateScroll();
};

const Slider = ({ cards, withBackground = false, title }) => {
  const sliderRef = useRef();
  const cardTextColor = withBackground ? 'white' : undefined;

  const handleScrollRight = () => {
    scroll(sliderRef.current, 300, 100);
  };

  const handleScrollLeft = () => {
    scroll(sliderRef.current, -300, 100);
  };

  return (
    <SliderWrapper withBackground={withBackground}>
      <div className="title">{title}</div>
      <div className="slider">
        <div ref={sliderRef} className="slides">
          {cards &&
            cards.map((card) => (
              <div key={card.id} className="slide">
                <Card
                  textColor={cardTextColor}
                  {...card}
                  showExcerpt={false}
                  large
                  imageSize={`
                    height: ${CARD_MEDIA_SIZE.MOBILE.height};
                `}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="buttons">
        <button className="button" onClick={handleScrollLeft}>
          <LeftArrowIcon />
        </button>
        <button className="button" onClick={handleScrollRight}>
          <RightArrowIcon />
        </button>
      </div>
    </SliderWrapper>
  );
};

Slider.propTypes = {
  cards: PropTypes.array,
  withBackground: PropTypes.bool,
  title: PropTypes.string,
};

export default Slider;
