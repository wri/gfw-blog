import { styled } from 'frontity';
import theme from '../../theme';

export default styled.span`
  p {
    color: #555;
    font-size: 12px;
    line-height: 21px;
    margin-bottom: 30px;
    display: inline-block;

    ${theme.mediaQueries.small} {
      margin-bottom: 40px;
    }
  }
`;
