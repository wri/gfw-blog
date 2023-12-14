import styled from '@emotion/styled';
import { Row, theme } from '@worldresources/gfw-components';

export const CommentThreadWrapper = styled(Row)`
  position: relative;

  > div {
    z-index: 2;
  }
`;

export const Divider = styled.div`
  width: 100%;
  border-top: solid 0.0625rem ${theme.colors.lightGrey};
  padding-bottom: 2.8125rem;
  background-color: ${theme.colors.white};
`;

export const Timeline = styled.div`
  position: absolute;
  left: 9%;
  height: 100%;
  border-left: solid 0.0625rem ${theme.colors.lightGrey};
`;

export const EmptyColumn = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.white};
`;
