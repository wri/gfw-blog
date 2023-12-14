import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export const MetaWrapper = styled.div`
  margin-bottom: 1.25rem;

  ${theme.mediaQueries.small} {
    margin-bottom: 2.5rem;
  }
`;

export const MetaItem = styled.div`
  color: ${theme.colors.mediumGrey};
  font-size: 0.875rem;
  line-height: 1.3125rem;
  margin-bottom: 0.625rem;
  display: flex;

  ${theme.mediaQueries.small} {
    flex-direction: column;
    margin-bottom: 1.25rem;
  }

  a {
    color: ${theme.colors.mediumGrey};

    &:hover {
      color: ${theme.colors.darkestGrey};
      text-decoration: underline;
    }
  }
`;
