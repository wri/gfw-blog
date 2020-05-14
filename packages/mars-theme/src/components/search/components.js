import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from '@frontity/components/image';
import { styled, connect } from 'frontity';
import path from './Search.png';
import { MEDIUM_ENDPOINT } from '../heplers/css-endpoints';

export const SearchInputWrapper = (props) => {
  const Element = styled.div`
    position: relative;
    max-width: 1110px;
    width: 100%;
    z-index: 25;
    border-bottom: 1px solid #777;
    background: #fff;
    align-items: flex-end;
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
      margin: 0 1rem;
    }
  `;
  return <Element {...props} />;
};

export const OverlayWrapper = ({ children }) => {
  const [height, setHeight] = useState('100%');
  useLayoutEffect(() => {
    if (document) {
      const { body } = document;
      const html = document.documentElement;
      // eslint-disable-next-line no-shadow
      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      setHeight(`${height}px;`);
    }
  }, []);
  const Wrapper = styled.div`
    width: 100%;
    position: absolute;
    height: ${height};
    background: rgba(255, 255, 255, 0.75);
    z-index: 15;
    display: flex;
    justify-content: center;
  `;

  return <Wrapper>{children}</Wrapper>;
};

OverlayWrapper.propTypes = {
  children: PropTypes.object,
};

export const KeyWordsList = connect(
  ({ libraries, keywords, search, query, input }) => {
    const clickHandler = (e, str) => {
      e.stopPropagation();
      search(str);
    };
    const Html2React = libraries.html2react.Component;

    if (!query) {
      return null;
    }

    return (
      <KeyWordsListWrapper>
        {keywords.map((word) => {
          return (
            <KeyWordsItem
              key={word.initial}
              onClick={(e) => clickHandler(e, word.initial)}
            >
              <Html2React html={word.rendered} />
            </KeyWordsItem>
          );
        })}
        {input && (
          <KeyWordsItem>
            <b>{input}</b>
          </KeyWordsItem>
        )}
      </KeyWordsListWrapper>
    );
  }
);

KeyWordsList.propTypes = {
  libraries: PropTypes.object,
  keywords: PropTypes.array,
  search: PropTypes.func,
};

const KeyWordsListWrapper = styled.ul`
  position: abolute;
  top: 100%;
  background-color: #fff;
  border: 1px solid #aaa;
  padding: 1.75rem 2.5rem;
  width: 100%;
  max-height: 43rem;
  overflow-y: auto;
`;

const KeyWordsItem = styled.li`
  padding: 0.75rem 0;
  color: #777;
  font-size: 1.375rem;
  cursor: pointer;
  b {
    color: #333;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 24px;
  cursor: pointer;
`;

export const SearchIcon = React.memo(() => (
  <IconWrapper>
    <Image src={path} />
  </IconWrapper>
));
