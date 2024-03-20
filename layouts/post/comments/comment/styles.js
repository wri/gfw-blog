import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  padding: 1.25rem 0;
`;

export const AuthorName = styled.h6`
  font-size: 1rem;
  color: ${theme.colors.darkestGrey};
  font-weight: 500;
  margin-bottom: 0.625rem;
`;

export const DateWrapper = styled.span`
  display: block;
  font-size: 0.75rem;
  color: ${theme.colors.darkGrey};
`;

export const Body = styled.div`
  font-size: 1rem;
  line-height: 1.75rem;
  color: ${theme.colors.darkGrey};
  margin-bottom: 3.75rem;
`;
