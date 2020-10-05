import styled from '@emotion/styled';
import { H4, H5, theme } from 'gfw-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.lightGrey};
  margin-bottom: 65px;
`;

export const Title = styled(H4)`
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    margin-bottom: 30px;
  }
`;

export const Subtitle = styled(H5)`
  margin-bottom: 10px;
  color: ${theme.colors.mediumGrey};

  ${theme.mediaQueries.small} {
    margin-bottom: 20px;
  }
`;
