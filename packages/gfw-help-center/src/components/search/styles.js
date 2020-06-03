import { styled } from 'frontity';
import { BasicInput } from 'gfw-components';

import theme from '../../app/theme';

export const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  cursor: pointer;
  z-index: 20;
  position: relative;

  ${theme.mediaQueries.small} {
    height: 80px;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  border-bottom: solid 1px ${theme.colors.grey};

  ${theme.mediaQueries.small} {
    height: 80px;
  }
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

export const Input = styled(BasicInput)`
  appearance: none;
  width: 100%;
  height: 100%;
  background: ${theme.colors.white};
  border: none;
  border-radius: 0;
  font-size: 22px;
  color: ${theme.colors.darkestGrey};
  padding: 0 10px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:focus {
    outline: none;
  }

  ${theme.mediaQueries.small} {
    padding: 0 20px;
  }

  ${({ value, expanded }) =>
    value && expanded &&
    `
    padding: 0 !important;
  `}

  ${({ expanded }) =>
    expanded &&
    `
    padding-left: 0 !important;
  `}
`;
