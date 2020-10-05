import styled from '@emotion/styled';
import { H4, theme } from 'gfw-components';

export const MenuWrapper = styled.ul`
  background-color: #f6f6f4;
  width: 100%;
  padding: 30px 0;

  ${theme.mediaQueries.small} {
    background-color: ${theme.colors.white};
    padding: 0;
  }
`;

export const MenuItem = styled.li`
  a,
  button {
    font-size: 16px;
    line-height: 24px;
    color: ${theme.colors.grey};
    padding: 10px ${theme.grid.mobileGutter};
    display: block;
    text-align: left;

    ${theme.mediaQueries.small} {
      padding: 0 0 20px;
    }
  }

  ${({ active }) =>
    active &&
    `
    a,
    button {
      color: ${theme.colors.green};
    }
  `}
`;

export const Title = styled(H4)`
  margin-left: ${theme.grid.mobileGutter};
  margin-bottom: 20px;
`;
