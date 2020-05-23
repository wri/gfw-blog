import { styled } from 'frontity';
import { ArrowIcon as ArrowIconComponent } from 'gfw-components';
import theme from '../../theme';

export const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  cursor: pointer;
  position: relative;

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
  font-size: 48px;
  font-weight: 300;
  color: ${theme.colors.darkestGrey};

  ${theme.mediaQueries.small} {
    height: 80px;
  }
`;

export const ArrowIcon = styled(ArrowIconComponent)`
  min-width: 15px;
  min-height: 15px;
  height: 15px;
  transition: all 0.2s ease-in-out;
  margin-left: 15px;

  ${({ open }) =>
    open &&
    `
    transform: rotate(180deg);
  `}
`;
