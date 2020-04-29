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
    if (selectionText.length > 0) {
      const range = selection.getRangeAt(0);
      const rects = range.getBoundingClientRect();

      const coordsToShowRects = rects
        ? {
            top: window.pageYOffset + rects.bottom,
            left: window.pageXOffset + (rects.left + rects.right) / 2,
          }
        : {};
      setText(selectionText);
      setIsTooltipVisible(true);
      setPosition(coordsToShowRects);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', showTwitterTooltip);
    // for devices with touchscreens
    window.addEventListener('touchend', showTwitterTooltip);

    // window.addEventListener('popstate', () => showTwitterTooltip(false));
  }, []);

  if (!isTooltipVisible) return null;

  return (
    <Container position={position} className="tippy-box">
      <TwittLink target="_blank" href={TWITT_CREATION_URI + text}>
        <TwittIcon size={21} color="#ffffff" />
        <TwittSpan>Twitt this</TwittSpan>
      </TwittLink>
      <Arrow />
    </Container>
  );
}

const Container = styled.div`
  background-color: #333333;
  width: 110px;
  height: 30px;
  position: absolute !important;
  top: ${(props) => props.position.top}px;
  left: ${(props) => props.position.left}px;
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
