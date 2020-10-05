import styled from '@emotion/styled';
import { H4, Column, theme } from 'gfw-components';

import IntroComp from 'components/intro';

export const Wrapper = styled.div`
  width: 100%;
  padding: 50px 0;

  ${theme.mediaQueries.small} {
    padding: 70px 0;
  }
`;

export const Intro = styled(IntroComp)`
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    margin-bottom: 30px;
  }
`;

export const Prompt = styled.div`
  position: absolute;
  z-index: 2;
  top: 10px;
  left: 0px;

  ${theme.mediaQueries.small} {
    top: -14px;
    left: -16px;
  }
`;

export const Tag = styled.p`
  padding: 6px 12px;
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  text-transform: uppercase;
`;

export const Arrow = styled.div`
  margin: 5px 10px;
`;

export const ToolsTitle = styled(H4)`
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    margin-bottom: 50px;
  }
`;

export const ToolCardsWrapper = styled(Column)`
  position: relative;
  margin-bottom: 30px;

  ${theme.mediaQueries.small} {
    margin-bottom: 40px;
  }
`;

export const SearchWrapper = styled(Column)`
  margin-bottom: 50px;

  ${theme.mediaQueries.small} {
    margin-bottom: 100px;
  }
`;
