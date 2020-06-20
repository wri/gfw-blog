import { styled } from 'frontity';
import theme from '../../app/theme';

// eslint-disable-next-line import/prefer-default-export
export const MenuItem = styled.li`
  margin-bottom: 35px;
  font-size: 16px;

  a {
    color: ${theme.colors.grey};
  }

  ${({ active }) => active && `
    a {
      color: ${theme.colors.green};
    }
  `}
`