import styled from '@emotion/styled';
import { theme } from 'gfw-components';

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  padding: 20px 0;
`;

export const AuthorName = styled.h6`
  font-size: 16px;
  color: ${theme.colors.darkestGrey};
  font-weight: 500;
`;

export const DateWrapper = styled.span`
  display: block;
  font-size: 12px;
  color: ${theme.colors.darkGrey};
`;

export const Body = styled.div`
  font-size: 16px;
  line-height: 28px;
  color: ${theme.colors.darkGrey};
  margin-bottom: 60px;
`;
