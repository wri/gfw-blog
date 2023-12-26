import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export default styled.div`
  width: 100%;
  font-size: 0.75rem;
  line-height: 1.3125rem;
  color: ${theme.colors.mediumGrey};

  a {
    color: ${theme.colors.green};

    &:hover {
      color: ${theme.colors.darkGreen};
      text-decoration: underline;
    }
  }
`;
