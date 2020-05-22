import { styled } from 'frontity';
import theme from '../../../../theme';

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

export const EmptyColumn = styled.div`
  width: 50px;
  height: 100%;

  ${({ isLast }) =>
    isLast &&
    `
    background-color: ${theme.colors.white};
  `}
`;
