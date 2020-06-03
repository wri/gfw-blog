import { styled } from 'frontity';

import theme from '../../app/theme';

export const Wrapper = styled.div`
  margin-top: 100px;
  width: 100%;
  z-index: 20;
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 50px;
  margin-left: -${theme.grid.desktopGutter /* https://stackoverflow.com/a/27563449 */};

  ${theme.mediaQueries.small} {
    margin-left: -${theme.grid.mobileGutter};
  }
`;

export const Title = styled.h1`
  color: #333333;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  text-transform: uppercase;
`;
