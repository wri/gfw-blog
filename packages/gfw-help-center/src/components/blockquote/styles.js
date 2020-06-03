import { styled } from 'frontity';
import theme from '../../app/theme';

export default styled.blockquote`
  p {
    font-size: 30px;
    line-height: 45px;
    text-decoration: underline;
    color: ${theme.colors.darkestGrey};
    margin-bottom: 25px;
  }
`;
