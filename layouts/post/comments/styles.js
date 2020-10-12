import styled from '@emotion/styled';
import { theme } from 'gfw-components';

export const CommentsContainer = styled.div`
  width: 100%;
  min-height: 300px;
  margin-bottom: 80px;
  position: relative;
`;

export const CommentTitle = styled.h5`
  font-size: 18px;
  line-height: 24px;
  color: ${theme.colors.darkesGrey};
  text-transform: uppercase;
  margin-bottom: 30px;
`;
