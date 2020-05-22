import { styled } from 'frontity';
import theme from '../../theme';

export default styled.div`
  width: 100%;
  font-size: 12px;
  line-height: 21px;

  a {
    color: ${theme.colors.green};

    &:hover {
      color: ${theme.colors.darkGreen};
      text-decoration: underline;
    }
  }
`;
