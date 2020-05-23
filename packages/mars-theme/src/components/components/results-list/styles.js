import { styled } from 'frontity';
import theme from '../../theme';

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 360px;
  border: solid 1px ${theme.colors.grey};
  border-top: none;
  padding: 40px;
  background-color: ${theme.colors.white};
  overflow-y: scroll;
`;

export const ListItem = styled.li`
  font-size: 22px;
  width: 100%;

  a {
    color: ${theme.colors.grey};
    padding-bottom: 20px;
    width: 100%;
    display: block;

    ${({ selected }) =>
      selected &&
      `
      color: ${theme.colors.darkestGrey};
    `}
  }

  b {
    color: ${theme.colors.darkestGrey};
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    a {
      color: ${theme.colors.darkGrey};
    }
  }
`;
