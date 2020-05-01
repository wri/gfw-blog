import React, { useEffect, useCallback, useState } from 'react';
import { styled } from 'frontity';

import TwittIcon from './twitt-icon';

const TWITT_CREATION_URI = 'https://twitter.com/intent/tweet?text=';

export default function TwittTextTooltip() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [text, setText] = useState('');
  const [position, setPosition] = useState({});

  const showTwitterTooltip = useCallback(() => {
    const selection = window.getSelection();
    const selectionText = selection.toString().trim();
    if (selectionText.length !== 0) {
      const range = selection.getRangeAt(0);
      const rects = range.getBoundingClientRect();

      const coordsToShowRects = rects
        ? {
            top: window.pageYOffset + rects.top - 47,
            left:
              selectionText.length > 25
                ? window.pageXOffset + rects.left + 75
                : window.pageXOffset + rects.left + 15,
          }
        : {};
      setText(selectionText);
      setIsTooltipVisible(true);
      setPosition(coordsToShowRects);
    } else {
      setIsTooltipVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', showTwitterTooltip);
    // for devices with touchscreens
    window.addEventListener('touchend', showTwitterTooltip);

    window.addEventListener('popstate', showTwitterTooltip(false));
  }, []);

  if (!isTooltipVisible) return null;

  function getTwittContent() {
    return `${TWITT_CREATION_URI}+"${text}" - from ${window.location.href}`;
  }

  return (
    <Container position={position} className="tippy-box">
      <TwittLink target="_blank" href={getTwittContent()}>
        <TwittIcon size={25} color="#ffffff" />
        <TwittSpan>Tweet this</TwittSpan>
      </TwittLink>
      <Arrow />
    </Container>
  );
}

const Container = styled.div`
  background-color: #333333;
  width: 130px;
  height: 40px;
  position: absolute !important;
  top: ${(props) => props.position.top}px;
  left: ${(props) => props.position.left}px;
  padding: 4px;
  z-index: 9997;
`;

const TwittLink = styled.a`
  padding: 3px 0px 0px 10px;
  position: relative;
  width: auto;
  display: inline-block;
  text-decoration: none;
  color: #777777;
  z-index: 9998;
`;

const TwittSpan = styled.span`
  position: relative;
  bottom: 7px;
  right: -11px;
  z-index: 9999;
  font-size: 95%;
`;

const Arrow = styled.span`
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  display: block;
  position: relative;
  top: -5px;
  left: 54px;
  background: #333333;
`;
