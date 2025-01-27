import styled from '@emotion/styled';

import { theme } from '@worldresources/gfw-components';
import Image from 'next/image';

import TreeErrorIconSrc from 'assets/icons/error.svg';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const StyledImage = styled(Image)`
  height: 12.5rem;
  margin: auto;
  margin-bottom: 0.625rem;

  ${theme.mediaQueries.small} {
    margin-bottom: 1.25rem;
  }
`;

export const TreeErrorIcon = styled(TreeErrorIconSrc)`
  height: 12.5rem;
  width: 100%;
  margin: auto;
  margin-bottom: 0.625rem;

  ${theme.mediaQueries.small} {
    margin-bottom: 1.25rem;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: ${theme.colors.darkestGrey};
  margin-bottom: 1.875rem;
  text-align: center;
  font-weight: 400;

  ${theme.mediaQueries.small} {
    font-size: 3.75rem;
    margin-bottom: 1.875rem;
  }

  ${({ small }) =>
    small &&
    `
    font-size: 2.25rem !important;
  `}
`;

export const Description = styled.div`
  font-size: 1.125rem;
  line-height: 1.875rem;
  color: ${theme.colors.darkestGrey};
  text-align: center;

  ${({ small }) =>
    small &&
    `
    font-size: 1rem;
  `}
`;
