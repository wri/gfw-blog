import { styled } from 'frontity';
import theme from '../../app/theme';

export const Card = styled.div`
  height: 100%;
  border: 1px solid #e5e5df;
  padding: 50px 45px;
  position: relative;
  display: flex;
  justify-content: space-between;

  ${({ large }) =>
    large &&
    `
    padding: 50px 80px;
  `}
`;

export const Icon = styled.img`
  width: 32px;
  height: 32px;
  z-index: 1;
  position: relative;
  margin-bottom: 10px;
`;

export const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
  z-index: 1;
  position: relative;
  fill: ${theme.colors.green};
  transform: rotate(-90deg);
  align-self: center;
  margin-left: 20px;
`;

export const Title = styled.h4`
  margin-bottom: 10px;
  color: #333333;
  font-size: 22px;
  line-height: 28px;
  z-index: 1;
  position: relative;

  ${({ light }) =>
    light &&
    `
    color: ${theme.colors.white};
  `}
`;

export const Text = styled.div`
  color: #777777;
  font-size: 14px;
  line-height: 21px;
  z-index: 1;
  position: relative;

  ${({ light }) =>
    light &&
    `
    color: ${theme.colors.white};
  `}
`;

export const BackgroundImage = styled.div`
  position: absolute;
  max-width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  z-index: 0;
`;
