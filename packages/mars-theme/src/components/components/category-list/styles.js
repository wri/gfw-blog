import { styled } from 'frontity';
import { Button } from 'gfw-components';
import theme from '../../theme';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const H5 = styled.h5`
  color: ${theme.colors.mediumGrey};
  height: 24px;
  display: flex;
  align-items: center;
  margin: 0 20px 20px 0;
  font-size: 12px;
  width: 100%;

  ${theme.mediaQueries.small} {
    width: auto;
  }
`;

export const CategoryPill = styled(Button)`
  height: 24px;
  padding: 0 12px;
  font-size: 12px;
  background-color: ${theme.colors.darkestGrey};
  margin: 0 20px 20px 0;
  border-radius: 0;

  &:hover {
    background-color: ${theme.colors.green};
  }

  ${({ light }) => light && `
    background-color: ${theme.colors.lightGrey};
    color: ${theme.colors.darkestGrey};

    &:hover {
      background-color: ${theme.colors.darkGrey};
      color: ${theme.colors.white};
    }
  `}
`;
