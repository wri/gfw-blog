import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'frontity';

const TWITT_CREATION_URI = 'https://twitter.com/intent/tweet?text=';

export default function TwittTextTooltip({
  isTooltipVisible,
  text,
  coordsToShow,
}) {
  if (!isTooltipVisible || !coordsToShow || !text) return null;

  const Container = styled.div`
    background-color: #333333;
    width: 100px;
    height: 30px;
    position: absolute !important;
    top: ${coordsToShow.top}px;
    left: ${coordsToShow.left}px;
    z-index: 999;
  `;
  const TwittLink = styled.a`
    padding-left: 5px;
    width: auto;
    text-decoration: none;
    color: #777777;
    position: relative;
    bottom: 2px;
    z-index: 9999;
  `;
  const TwittIcon = styled.img`
    margin: 2px 0px 0px 2px;
  `;

  return (
    <Container className="tippy-box">
      <TwittLink target="_blank" href={TWITT_CREATION_URI + text}>
        <TwittIcon src="https://img.icons8.com/ios/15/000000/twitter.png" />
        <span>Twitt this</span>
      </TwittLink>
    </Container>
  );
}

TwittTextTooltip.propTypes = {
  text: PropTypes.string,
  isTooltipVisible: PropTypes.bool,
  coordsToShow: PropTypes.object,
};
