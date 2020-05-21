import { styled, css } from 'frontity';
import theme from '../../theme';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const buttonStyles = css`
  height: 24px;
  padding: 0 12px;
  font-size: 12px;
  background-color: ${theme.colors.darkestGrey};
  margin: 0 20px 20px 0;

  &:hover {
    background-color: ${theme.colors.green};
  }
`;
