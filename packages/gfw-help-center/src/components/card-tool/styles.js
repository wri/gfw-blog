import { styled } from 'frontity';

import theme from '../../app/theme';

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px 40px;
  background-color: #f6f6f4;
  border: 1px solid ${theme.colors.lightGrey};
  margin-bottom: 32px;
  height: 100%;
  width: 100%;
  min-height: 480px;

  ${({ active }) =>
    active &&
    `
    background-color: ${theme.colors.lightGrey};
    border: 1px solid #cacabe;
  `}
`;

export const ContentWrapper = styled.div`
  z-index: 1;
`;

export const Title = styled.h4`
  color: ${theme.colors.darkestGrey};
  font-size: 30px;
  font-weight: 300;
  line-height: 40px;
  z-index: 1;
`;

export const Text = styled.div`
  margin: 20px 0;
  color: ${theme.colors.darkGrey};
  font-size: 18px;
  line-height: 30px;
  z-index: 1;
`;

export const BannerImage = styled.div`
  position: absolute;
  max-width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  z-index: 0;
`;

export const Logo = styled.div`
  width: 100px;
  height: 100px;
  z-index: 1;
`;
