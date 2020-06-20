import { styled } from 'frontity';
import { Row } from 'gfw-components';

import theme from '../../app/theme';
import Search from '../../components/search';

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0 50px;

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

export const CategoryDescription = styled.div`
  p {
    margin: 20px 0 30px;
    font-size: 18px;
    line-height: 30px;
    color: ${theme.colors.darkGrey};
  }
`;

export const ResultsStatement = styled.p`
  font-size: 14px;
  line-height: 21px;
  color: ${theme.colors.mediumGrey};
  margin-top: 60px;

  ${theme.mediaQueries.small} {
    margin-top: 75px;
  }
`;

export const LoadMoreWrapper = styled(Row)`
  margin: 20px 0 50px !important;

  ${theme.mediaQueries.small} {
    margin-top: 60px !important;
  }
`;

export const FaqCard = styled.div`
  padding: 30px 40px 30px 55px;
  margin-top: 24px;
  box-sizing: border-box;
  border: 1px solid #e5e5df;
  cursor: pointer;
  outline: none;

  p {
    margin: 33px 0 55px;
    line-height: 36px;
  }
`;
