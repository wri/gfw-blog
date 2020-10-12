import styled from '@emotion/styled';

import { theme } from 'gfw-components';

import TreeErrorIconSrc from 'assets/icons/error.svg';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Image = styled.img`
  height: 200px;
  margin: auto;
  margin-bottom: 10px;

  ${theme.mediaQueries.small} {
    margin-bottom: 20px;
  }
`;

export const TreeErrorIcon = styled(TreeErrorIconSrc)`
  height: 200px;
  width: 100%;
  margin: auto;
  margin-bottom: 10px;

  ${theme.mediaQueries.small} {
    margin-bottom: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: ${theme.colors.darkestGrey};
  margin-bottom: 30px;
  text-align: center;
  font-weight: 400;

  ${theme.mediaQueries.small} {
    font-size: 60px;
    margin-bottom: 30px;
  }

  ${({ small }) =>
    small &&
    `
    font-size: 36px !important;
  `}
`;

export const Description = styled.div`
  font-size: 18px;
  line-height: 30px;
  color: ${theme.colors.darkestGrey};
  text-align: center;

  ${({ small }) =>
    small &&
    `
    font-size: 16px;
  `}
`;
