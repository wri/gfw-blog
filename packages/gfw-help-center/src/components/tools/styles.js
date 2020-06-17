import { styled } from 'frontity';
import { H4 } from 'gfw-components';

import theme from '../../app/theme';

export const H4Wrapper = styled(H4)`
  margin: 100px 0 50px;
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
  background-color: #97bd3d;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  text-transform: uppercase;
`;

export const Arrow = styled.img`
  margin: 5px 10px;
`;
