import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export default styled.blockquote`
  p {
    font-size: 1.875rem;
    line-height: 2.8125rem;
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
    font-size: 0.75rem;
    color: ${theme.colors.grey};
  }
`;
