import styled from '@emotion/styled';
import { Row, Column, theme } from '@worldresources/gfw-components';
import SearchComponent from 'components/search';

export const PostContainer = styled.div`
  padding-top: 50px;
  width: 100%;
  overflow: hidden;
  min-height: 500px;

  ${theme.mediaQueries.small} {
    padding-top: 40px;
  }

  .subtitle {
    align-items: baseline;
    display: flex;
    gap: 5px;

    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.25px;
    line-height: 14px;
    text-align: left;
    text-transform: uppercase;

    ${theme.mediaQueries.small} {
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.25px;
      line-height: 14px;
    }

    .pipe {
      color: #97bd3d;
    }
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
  color: ${theme.colors.darkestGrey};
  margin-bottom: 15px;
  font-size: 26px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0.25px;
  text-align: left;

  ${theme.mediaQueries.small} {
    margin-bottom: 20px;
    font-size: 60px;
    font-weight: 500;
    line-height: 60px;
    letter-spacing: 0.25px;
    text-align: left;
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

export const MoreArticlesWrapper = styled.div`
  background-image: url('../../images/prefooter-desktop.png');
  background-size: cover;
  display: none;
  min-height: 785px;
  margin: 50px 0;

  ${theme.mediaQueries.small} {
    display: flex;
  }
`;

export const CaptionWrapper = styled(Row)`
  margin-bottom: 20px !important;

  ${theme.mediaQueries.small} {
    margin-bottom: 40px !important;
  }
`;
