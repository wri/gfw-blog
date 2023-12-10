import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { ActiveBarWrapper, ReadingBarWrapper } from './styles';

const ReadingBar = () => {
  const [width, setWidth] = useState(0);

  const calculateScrollHeight = () => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const scrollHeight = el.scrollHeight || document.body.scrollHeight;
    const percent = (scrollTop / (scrollHeight - el.clientHeight)) * 100;

    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollHeight);

    return () => window.removeEventListener('scroll', calculateScrollHeight);
  });

  return (
    <ReadingBarWrapper>
      <ActiveBarWrapper
        css={css`
          width: ${width}%;
        `}
      />
    </ReadingBarWrapper>
  );
};

export default ReadingBar;
