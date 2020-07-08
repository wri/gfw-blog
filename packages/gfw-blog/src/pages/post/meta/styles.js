import { styled } from 'frontity';
import { theme } from 'gfw-components';

export const MetaWrapper = styled.div`
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    margin-bottom: 40px;
  }
`;

export const MetaItem = styled.div`
  color: ${theme.colors.mediumGrey};
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 10px;
  display: flex;

  ${theme.mediaQueries.small} {
    flex-direction: column;
    margin-bottom: 20px;
  }

  a {
    color: ${theme.colors.mediumGrey};

    &:hover {
      color: ${theme.colors.darkestGrey};
      text-decoration: underline;
    }
  }
`;
