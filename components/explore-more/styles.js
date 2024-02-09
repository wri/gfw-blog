import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export const MoreArticlesWrapper = styled.div`
  display: none;
  min-height: 49.0625rem;
  margin: 3.125rem 0;

  ${theme.mediaQueries.small} {
    display: flex;
  }
`;

export const LatestTitle = styled.h2`
  color: ${theme.colors.darkestGrey};
  margin-bottom: 3.125rem;
  text-transform: uppercase;
  font-size: 2.125rem;
  font-weight: 400;
  line-height: 3rem;
  letter-spacing: 0.1.5625rem;
  text-align: center;
  text-transform: capitalize;
  padding-top: 1.875rem;
`;
