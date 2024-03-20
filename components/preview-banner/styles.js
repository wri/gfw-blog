import styled from '@emotion/styled';

import { theme } from '@worldresources/gfw-components';

import CloseIconSrc from 'assets/icons/close.svg';

export const Wrapper = styled.div`
  background-color: ${theme.colors.darkGrey};
`;

export const Container = styled.div`
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  color: ${theme.colors.white};
  font-size: 0.75rem;

  a {
    color: inherit;
  }
`;

export const CloseIcon = styled(CloseIconSrc)`
  width: 0.625rem;
  height: 0.625rem;
  fill: ${theme.colors.white};
  margin-left: 0.625rem;
`;
