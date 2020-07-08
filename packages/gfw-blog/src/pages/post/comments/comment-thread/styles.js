import { styled } from 'frontity';
import { Row, theme } from 'gfw-components';

export const CommentThreadWrapper = styled(Row)`
  position: relative;

  > div {
    z-index: 2;
  }
`;

export const Divider = styled.div`
  width: 100%;
  border-top: solid 1px ${theme.colors.lightGrey};
  padding-bottom: 45px;
  background-color: ${theme.colors.white};
`;

export const Timeline = styled.div`
  position: absolute;
  left: 9%;
  height: 100%;
  border-left: solid 1px ${theme.colors.lightGrey};
`;

export const EmptyColumn = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.white};
`;
