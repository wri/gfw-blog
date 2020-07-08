import { styled } from 'frontity';
import { ArrowIcon as ArrowIconComponent, theme } from 'gfw-components';

export const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  cursor: pointer;
  position: relative;
  z-index: 3;

  ${theme.mediaQueries.small} {
    height: 80px;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  border-bottom: solid 1px ${theme.colors.grey};
  font-size: 30px;
  line-height: 38px;
  font-weight: 300;
  color: ${theme.colors.darkestGrey};

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${theme.mediaQueries.small} {
    height: 80px;
    font-size: 48px;
    line-height: 60px;
  }
`;

export const ArrowIcon = styled(ArrowIconComponent)`
  min-width: 15px;
  min-height: 15px;
  height: 15px;
  transition: all 0.2s ease-in-out;
  margin-left: 10px;

  ${({ open }) =>
    open &&
    `
    transform: rotate(180deg);
  `}
`;
