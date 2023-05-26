import styled from '@emotion/styled';

import { theme } from '@worldresources/gfw-components';

import CloseIconSrc from 'assets/icons/close.svg';

export const Wrapper = styled.div`
  background-color: ${theme.colors.darkGrey};
`;

export const Container = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  color: ${theme.colors.white};
  font-size: 12px;

  a {
    color: inherit;
  }
`;

export const CloseIcon = styled(CloseIconSrc)`
  width: 10px;
  height: 10px;
  fill: ${theme.colors.white};
  margin-left: 10px;
`;
