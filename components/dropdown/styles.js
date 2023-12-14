import styled from '@emotion/styled';
import {
  ArrowIcon as ArrowIconComponent,
  theme,
} from '@worldresources/gfw-components';

export const Wrapper = styled.div`
  height: 3.75rem;
  width: 100%;
  cursor: pointer;
  position: relative;
  z-index: 3;

  ${theme.mediaQueries.small} {
    height: 5rem;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.75rem;
  border-bottom: solid 0.0625rem ${theme.colors.grey};
  font-size: 1.875rem;
  line-height: 2.375rem;
  font-weight: 300;
  color: ${theme.colors.darkestGrey};

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${theme.mediaQueries.small} {
    height: 5rem;
    font-size: 3rem;
    line-height: 3.75rem;
  }
`;

export const ArrowIcon = styled(ArrowIconComponent)`
  min-width: 0.9375rem;
  min-height: 0.9375rem;
  height: 0.9375rem;
  transition: all 0.2s ease-in-out;
  margin-left: 0.625rem;

  ${({ open }) =>
    open &&
    `
    transform: rotate(180deg);
  `}
`;
