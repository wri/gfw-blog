import { styled } from 'frontity';
import theme from '../../theme';

export const Wrapper = styled.div`
  height: 60px;
  width: 100%;

  ${theme.mediaQueries.small} {
    height: 80px;
  }

  ${({ open }) =>
    open &&
    `
    position: absolute;
    left: 0;
    right: 0;
    max-width: 1120px;
    padding: 0 16px;
    margin: 0 auto;

    ${theme.mediaQueries.small} {
      padding: 0 20px;
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  border-bottom: solid 1px transparent;

  ${theme.mediaQueries.small} {
    height: 80px;
  }

  ${({ open }) =>
    open &&
    `
    border-bottom-color: ${theme.colors.grey};
  `}
`;

export const SearchClosed = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchOpen = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const OpenMessage = styled.span`
  color: ${theme.colors.mediumGrey};
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 400;
  margin-right: 10px;
`;

export const Input = styled.input`
  appearance: none;
  width: 100%;
  height: 100%;
  background: ${theme.colors.white};
  border: none;
  border-radius: 0;
  font-size: 22px;
  color: ${theme.colors.darkestGrey};
  padding: 0 10px 0 0;

  ${theme.mediaQueries.small} {
    padding: 0 20px;
  }
`;
