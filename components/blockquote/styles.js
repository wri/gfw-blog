import styled from '@emotion/styled';
import { theme } from 'gfw-components';

export default styled.blockquote`
  p {
    font-size: 30px;
    line-height: 45px;
    text-decoration: underline;
    font-style: italic;
    color: ${theme.colors.darkestGrey};
    margin-bottom: 0;
    font-weight: 300;
  }

  a {
    text-decoration: underline;
  }

  cite {
    font-weight: 400;
    font-size: 12px;
    color: ${theme.colors.grey};
  }
`;
