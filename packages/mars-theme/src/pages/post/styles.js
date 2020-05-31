import { styled } from 'frontity';
import { Row, Column } from 'gfw-components';
import theme from '../../app/theme';
import SearchComponent from '../../components/search';

export const PostContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  overflow: hidden;
  min-height: 500px;

  ${theme.mediaQueries.small} {
    padding-top: 40px;
  }
`;

export const BreadCrumbsWrapper = styled(Column)`
  margin-bottom: 25px !important;

  ${theme.mediaQueries.small} {
    margin-bottom: 40px !important;
  }
`;

export const Search = styled(SearchComponent)`
  margin-top: -20px;

  ${theme.mediaQueries.small} {
    margin-top: -30px;
  }

  ${({ open }) =>
    open &&
    `
    position: absolute;
    left: 0;
    right: 0;
    top: -20px;
    max-width: 1120px;
    padding: 0 16px;
    margin: 0 auto;

    ${theme.mediaQueries.small} {
      padding: 0 20px;
      top: 0;
    }
  `}
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

export const PostMetaMobile = styled.div`
  ${theme.mediaQueries.small} {
    display: none;
  }
`;

export const PostMetaDesktop = styled.div`
  display: none;

  ${theme.mediaQueries.small} {
    display: block;
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

export const CaptionWrapper = styled(Row)`
  margin-bottom: 20px !important;

  ${theme.mediaQueries.small} {
    margin-bottom: 40px !important;
  }
`;
