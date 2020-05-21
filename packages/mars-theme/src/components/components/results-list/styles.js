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
  margin-bottom: 20px;

  a {
    color: ${theme.colors.grey};
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
