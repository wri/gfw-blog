import styled from '@emotion/styled';
import { theme, Row, Column, Button } from '@worldresources/gfw-components';

import Search from 'components/search';

export const Wrapper = styled.div`
  width: 100%;
  padding: 50px 0;
  ${theme.mediaQueries.small} {
    padding-top: 40px;
  }
`;

export const SearchMobile = styled(Search)`
  display: block;
  margin-top: -20px;
  ${theme.mediaQueries.small} {
    display: none;
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
    }
  `}
`;

export const SearchDesktop = styled(Search)`
  ${({ isSearch }) =>
    !isSearch &&
    `
    display: none;
    ${theme.mediaQueries.small} {
      display: block;
    }
  `}
  ${({ open }) =>
    open &&
    `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    max-width: 1120px;
    padding: 0 16px;
    margin: 0 auto;
    ${theme.mediaQueries.small} {
      padding: 0 20px;
    }
  `}
`;

export const MoreArticlesWrapper = styled.div`
  display: none;
  min-height: 785px;
  margin: 50px 0;

  ${theme.mediaQueries.small} {
    display: flex;
  }
`;

export const LatestTitle = styled.h2`
  color: ${theme.colors.darkestGrey};
  margin-bottom: 50px;
  text-transform: uppercase;
  font-size: 3rem;
  font-weight: 400;
  line-height: 3rem;
  letter-spacing: 0.25px;
  text-align: center;
  text-transform: capitalize;
  padding-top: 30px;
`;

export const CategoryDescription = styled.p`
  margin-top: 15px;
  font-size: 18px;
  line-height: 30px;
  color: ${theme.colors.darkGrey};
`;

export const ResultsStatement = styled.p`
  font-size: 14px;
  line-height: 21px;
  color: ${theme.colors.mediumGrey};
`;

export const MenuWrapper = styled.div`
  margin-top: 40px;
`;

export const LoadMoreWrapper = styled(Column)`
  margin: 20px 0 50px !important;
  display: flex;
  justify-content: center;
  width: 100%;

  ${theme.mediaQueries.small} {
    margin-top: 60px !important;
  }
`;

export const ResultsTitle = styled.h1`
  font-family: Fira Sans;
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.75rem;
  letter-spacing: 0.01563rem;

  ${theme.mediaQueries.small} {
    font-size: 3.75rem;
  }
`;

export const NotFindWhatYoureLookingForWrapper = styled(Row)`
  background-size: cover;
  background-image: url('images/hero-bg-mobile.png');
  max-width: 100%;
  width: 100%;
  height: 15.625rem;

  ${theme.mediaQueries.small} {
    background-image: url('images/hero-bg-desktop.png');
    height: 20.5625rem;
  }
`;

export const NotFindWhatYoureLookingForColumn = styled(Column)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-image: url('../../images/no-results-bg.png');
`;

export const NotFindWhatYoureLookingForTitle = styled.h2`
  color: rgb(255, 255, 255);
  font-size: 1.25rem;
  margin-bottom: 2.25rem;
  font-family: Fira Sans;
  font-style: normal;
  font-weight: 400;
  line-height: 3rem;
  letter-spacing: 0.01563rem;
  text-align: center;

  ${theme.mediaQueries.small} {
    font-size: 2.5rem;
  }
`;

export const FilterByWrapper = styled(Row)`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  margin: 2rem auto;
  height: 6.25rem;

  ${theme.mediaQueries.small} {
    margin: 3.875rem auto;
    flex-flow: row;
    height: 1.25rem;
    justify-content: space-between;
  }
`;

export const FilterByColumn = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: start;
`;

export const FilterByCategory = styled.div`
  font-size: 14px;
  line-height: 21px;
  color: #777;
  text-align: right;
  margin-right: 0.3125rem;
`;

export const FilterByTopic = styled.div`
  font-size: 14px;
  line-height: 21px;
  color: #777;
  margin-right: 0.3125rem;

  ${theme.mediaQueries.small} {
    text-align: right;
  }
`;

export const ContactUs = styled(Button)`
  color: rgb(151, 190, 50);
  font-size: 0.875rem;

  ${theme.mediaQueries.small} {
    font-size: 1rem;
  }
`;
