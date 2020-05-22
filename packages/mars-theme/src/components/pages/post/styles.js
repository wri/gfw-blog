import { styled } from 'frontity';
import theme from '../../theme';

export const PostContainer = styled.div`
  padding-top: 1.525rem;
  width: 100%;

  ${theme.mediaQueries.small} {
    padding-top: 40px;
  }
`;

export const MediaWrapper = styled.div`
  margin: 0 auto;
  height: 240px;
  margin-bottom: 10px;

  ${theme.mediaQueries.small} {
    height: 400px;
    padding: 0 20px;
    max-width: 1120px;
  }
`;

export const PostTitle = styled.h1`
  font-size: 30px;
  line-height: 38px;
  color: ${theme.colors.darkestGrey};
  font-weight: 300;
  margin-bottom: 15px;

  ${theme.mediaQueries.small} {
    font-size: 48px;
    line-height: 60px;
    margin-bottom: 20px;
  }
`;

export const LatestTitle = styled.h2`
  font-size: 18px;
  color: ${theme.colors.darkestGrey};
  margin-bottom: 50px;
  text-transform: uppercase;
  font-weight: 500;
`;

export const Divider = styled.div`
  border-top: 1px solid ${theme.colors.lightGrey};
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;

  ${theme.mediaQueries.small} {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
`;
