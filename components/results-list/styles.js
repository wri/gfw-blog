import styled from '@emotion/styled';
import { theme } from 'gfw-components';

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 360px;
  border: solid 1px ${theme.colors.grey};
  border-top: none;
  padding: 15px 30px;
  background-color: ${theme.colors.white};
  overflow-y: scroll;

  ${theme.mediaQueries.small} {
    padding: 25px 40px;
  }
`;

export const ListItem = styled.li`
  width: 100%;

  button {
    color: ${theme.colors.grey};
    padding: 20px 0;
    width: 100%;
    display: block;
    font-size: 22px;
    text-align: left;

    &:hover {
      color: ${theme.colors.darkGrey};
    }

    ${({ selected }) =>
      selected &&
      `
      color: ${theme.colors.darkestGrey};
    `}
  }

  b {
    color: ${theme.colors.darkestGrey};
  }
`;

export const Divider = styled.div`
  width: 65px;
  height: 2px;
  background-color: ${theme.colors.lightGrey};
  margin: 15px 0;
`;
