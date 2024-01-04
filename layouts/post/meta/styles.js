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
  flex-direction: column;
  width: 100%;

  ${theme.mediaQueries.small} {
    margin-bottom: 1.25rem;
  }

  a {
    color: ${theme.colors.mediumGrey};

    &:hover {
      color: ${theme.colors.darkestGrey};
      text-decoration: underline;
    }
  }

  ul > li {
    text-align: center;

    ${theme.mediaQueries.small} {
      text-align: left;
    }
  }

  .title {
    color: #333333;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.125rem;
    letter-spacing: 0.016rem;
    text-align: center;
    text-transform: uppercase;

    ${theme.mediaQueries.small} {
      text-align: left;
    }
  }

  .link {
    color: #97bd3d;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 0.875rem;
    letter-spacing: 0.016rem;
    text-transform: uppercase;
    cursor: pointer;

    ${theme.mediaQueries.small} {
      text-align: left;
    }
  }

  .content {
    margin-top: 0.75rem;
  }
`;
