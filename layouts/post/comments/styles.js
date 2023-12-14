import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export const CommentsContainer = styled.div`
  width: 100%;
  min-height: 18.75rem;
  margin-bottom: 5rem;
  position: relative;
`;

export const CommentTitle = styled.h5`
  font-size: 1.125rem;
  line-height: 1.5rem;
  color: ${theme.colors.darkesGrey};
  text-transform: uppercase;
  margin-bottom: 1.875rem;
`;
