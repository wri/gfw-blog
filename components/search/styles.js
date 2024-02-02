import styled from '@emotion/styled';
import { BasicInput, theme } from '@worldresources/gfw-components';
import { rgba } from 'emotion-rgba';

export const Wrapper = styled.div`
  height: 3.75rem;
  width: 100%;
  z-index: 20;
  position: relative;

  ${theme.mediaQueries.small} {
    height: 5.625rem;
  }

  .hidden-content {
    background: #333333;
    color: #ffffff;
    height: 19.563rem;
    max-height: 19.563rem;
    padding: 2rem 1.5rem;

    ${theme.mediaQueries.small} {
      padding: 2rem 4rem;
      max-height: 14.5rem;
      height: 14.5rem;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 3.75rem;
  border-bottom: solid 0.0625rem transparent;
  background-color: #333333;
  max-height: 2.625rem;
  height: 2.625rem;
  -webkit-border-radius: 1.25rem;
  -moz-border-radius: 1.25rem;
  border-radius: 1.25rem;
  ${theme.mediaQueries.small} {
    height: 5rem;
    margin-top: 1.4rem;
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
