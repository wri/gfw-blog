import styled from '@emotion/styled';
import { Row, Column, theme } from '@worldresources/gfw-components';
import SearchComponent from 'components/search';

export const PostContainer = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 31.25rem;

  .subtitle {
    align-items: baseline;
    display: flex;
    gap: 0.3125rem;

    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.1.5625rem;
    line-height: 0.875rem;
    text-align: left;
    text-transform: uppercase;

    ${theme.mediaQueries.small} {
      font-size: 0.875rem;
      font-weight: 400;
      letter-spacing: 0.1.5625rem;
      line-height: 0.875rem;
    }

    .pipe {
      color: #97bd3d;
    }
  }
`;

export const LanguageSelectorWrapper = styled.div`
  display: block;
  padding: 0 1rem;

  ${theme.mediaQueries.small} {
    display: none;
  }
`;

export const BreadCrumbsWrapper = styled(Column)`
  margin-bottom: 1.5625rem !important;

  ${theme.mediaQueries.small} {
    margin-bottom: 2.5rem !important;
  }
`;

export const Search = styled(SearchComponent)`
  margin-top: -1.25rem;

  ${theme.mediaQueries.small} {
    margin-top: -1.875rem;
  }

  ${({ open }) =>
    open &&
    `
    position: absolute;
    left: 0;
    right: 0;
    top: -1.25rem;
    max-width: 111.25rem;
    padding: 0 1rem;
    margin: 0 auto;

    ${theme.mediaQueries.small} {
      padding: 0 1.25rem;
      top: 0;
    }
  `}
`;

export const MediaWrapper = styled.div`
  margin: 0 auto;
  height: 15rem;
  margin-bottom: 0.625rem;
  padding: 0 1rem;

  ${theme.mediaQueries.small} {
    min-height: 28rem;
    padding: 0 5.25rem;
    max-width: 85rem;
  }
`;

export const PostTitle = styled.h1`
  color: ${theme.colors.darkestGrey};
  margin-bottom: 0.9375rem;
  font-size: 1.625rem;
  font-weight: 500;
  line-height: 1.875rem;
  letter-spacing: 0.1.5625rem;
  text-align: left;

  ${theme.mediaQueries.small} {
    margin-bottom: 1.25rem;
    font-size: 3rem;
    font-weight: 500;
    line-height: 3.75rem;
    letter-spacing: 0.1.5625rem;
    text-align: left;
  }
`;

export const PostMetaMobile = styled.div`
  padding: 0 5rem;

  ${theme.mediaQueries.small} {
    display: none;
  }
`;

export const PostMetaDesktop = styled.div`
  display: none;

  ${theme.mediaQueries.small} {
    display: block;
    max-width: 13rem;
    padding-left: 2rem;
  }
`;

export const LatestTitle = styled.h2`
  font-size: 1.125rem;
  color: ${theme.colors.darkestGrey};
  margin-bottom: 3.125rem;
  text-transform: uppercase;
  font-weight: 500;
`;

export const Divider = styled.div`
  border-top: 0.0625rem solid ${theme.colors.lightGrey};
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;

  ${theme.mediaQueries.small} {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
`;

export const MoreArticlesWrapper = styled.div`
  background-color: #333333;
  display: none;
  min-height: 49.0625rem;
  margin: 3.125rem 0;
  width: 100%;

  ${theme.mediaQueries.small} {
    display: flex;
  }
`;

export const CaptionWrapper = styled(Row)`
  margin-bottom: 1.25rem !important;

  ${theme.mediaQueries.small} {
    margin-bottom: 2.5rem !important;
    max-width: 77rem;
  }
`;
