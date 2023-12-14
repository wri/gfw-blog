import styled from '@emotion/styled';
import { BasicInput, theme } from '@worldresources/gfw-components';
import { rgba } from 'emotion-rgba';

export const Wrapper = styled.div`
  height: 3.75rem;
  width: 100%;
  cursor: pointer;
  z-index: 20;
  position: relative;

  ${({ open, expandable }) =>
    open &&
    expandable &&
    `
    position: absolute;
    left: 0;
    right: 0;
    max-width: 111.25rem;
    padding: 0 1rem;
    margin: 0 auto;
  `}

  ${theme.mediaQueries.small} {
    height: 5rem;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 3.75rem;
  border-bottom: solid 0.0625rem transparent;
  ${theme.mediaQueries.small} {
    height: 5rem;
  }
  ${({ open, expanded }) =>
    (open || expanded) &&
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
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 400;
  margin-right: 0.625rem;
`;

export const Input = styled(BasicInput)`
  appearance: none;
  width: 100%;
  height: 100%;
  background: ${theme.colors.white};
  border: none !important;
  border-radius: 0;
  font-size: 1.375rem;
  color: ${theme.colors.darkestGrey};
  padding: 0 0.625rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:focus {
    outline: none;
  }

  ${theme.mediaQueries.small} {
    padding: 0 1.25rem;
  }

  ${({ value, expanded }) =>
    value &&
    expanded &&
    `
    padding: 0 !important;
  `}

  ${({ expanded }) =>
    expanded &&
    `
    padding-left: 0 !important;
  `}
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${rgba(theme.colors.white, 0.8)};
  cursor: pointer;
  z-index: 10;
`;
