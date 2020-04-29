import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'frontity';

const TWITT_CREATION_URI = 'https://twitter.com/intent/tweet?text=';

const TwittIcon = ({ size, color }) => {
  const styles = {
    svg: {
      fill: '#000000',
    },
    g: {
      mixBlendNode: 'normal',
    },
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={size}
      height={size}
      viewBox="0 0 172 172"
      style={styles.svg}
    >
      <g
        fill="none"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={styles.g}
      >
        <path d="M0,172v-172h172v172z" fill="#333333" />
        <g fill={color}>
          <path d="M172.215,35.905c-6.35594,2.82188 -13.16875,4.71656 -20.33094,5.57656c7.31,-4.38063 12.92687,-11.31438 15.56062,-19.565c-6.82625,4.04469 -14.41844,6.9875 -22.4675,8.57312c-6.45,-6.88 -15.64125,-11.16656 -25.81344,-11.16656c-19.53812,0 -35.38094,15.82937 -35.38094,35.3675c0,2.76812 0.3225,5.46906 0.92719,8.0625c-29.40125,-1.47813 -55.45656,-15.56063 -72.91187,-36.96656c-3.05031,5.24062 -4.78375,11.31437 -4.78375,17.79125c0,12.26844 6.235,23.09906 15.73531,29.455c-5.805,-0.18813 -11.26062,-1.78719 -16.03094,-4.43438c0,0.14781 0,0.29563 0,0.44344c0,17.14625 12.20125,31.43031 28.36656,34.69562c-2.95625,0.80625 -6.08719,1.23625 -9.31219,1.23625c-2.28438,0 -4.50156,-0.215 -6.665,-0.645c4.515,14.04219 17.57625,24.295 33.04281,24.57719c-12.09375,9.48688 -27.34531,15.13063 -43.92719,15.13063c-2.86219,0 -5.67062,-0.16125 -8.42531,-0.49719c15.64125,10.05125 34.23875,15.89656 54.22031,15.89656c65.06438,0 100.64688,-53.89781 100.64688,-100.63344c0,-1.53187 -0.04031,-3.07719 -0.09406,-4.58219c6.90687,-4.98531 12.9,-11.22031 17.64344,-18.31531z" />
        </g>
      </g>
    </svg>
  );
};

export default function TwittTextTooltip({
  isTooltipVisible,
  text,
  coordsToShow,
}) {
  if (!isTooltipVisible || !coordsToShow || !text) return null;

  const Container = styled.div`
    background-color: #333333;
    width: 110px;
    height: 30px;
    position: absolute !important;
    top: ${coordsToShow.top}px;
    left: ${coordsToShow.left}px;
    padding: 4px;
    z-index: 9997;
  `;
  const TwittLink = styled.a`
    padding-left: 5px;
    position: relative;
    width: auto;
    display: inline-block;
    text-decoration: none;
    pointer-events: auto !important;
    color: #777777;
    z-index: 9998;
  `;
  const TwittSpan = styled.span`
    position: relative;
    bottom: 5px;
    right: -5px;
    z-index: 9999;
  `;
  const Arrow = styled.span`
    width: 13px;
    height: 13px;
    transform: rotate(45deg);
    display: block;
    position: relative;
    top: -36px;
    left: 9px;
    background: #333333;
  `;

  return (
    <Container className="tippy-box">
      <TwittLink target="_blank" href={TWITT_CREATION_URI + text}>
        <TwittIcon size={21} color="#ffffff" />
        <TwittSpan>Twitt this</TwittSpan>
      </TwittLink>
      <Arrow />
    </Container>
  );
}

TwittTextTooltip.propTypes = {
  text: PropTypes.string,
  isTooltipVisible: PropTypes.bool,
  coordsToShow: PropTypes.object,
};

TwittIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};
