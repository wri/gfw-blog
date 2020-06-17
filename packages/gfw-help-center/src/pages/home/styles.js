import { styled } from 'frontity';

import theme from '../../app/theme';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  width: 100%;

  ${theme.mediaQueries.small} {
    padding: 50px 0;
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

export const Arrow = styled.img`
  margin: 5px 10px;
`;
