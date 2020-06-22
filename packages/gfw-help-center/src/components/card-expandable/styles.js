import { styled } from 'frontity';

import theme from '../../app/theme';

export const Card = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid #e5e5df;
  padding: 30px 54px;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

export const Icon = styled.img`
  width: 12px;
  height: 12px;
  margin: 9px 0;
  z-index: 1;
  position: relative;
`;

export const ContentWrapper = styled.div`
  width: 100%;
`;

export const Title = styled.h4`
  color: #333333;
  font-size: 22px;
  line-height: 28px;
  z-index: 1;
  position: relative;
  text-align: left;
`;

export const Text = styled.div`
  z-index: 1;
  position: relative;
  margin-top: 20px;

  ${({ small }) =>
    small &&
    `
    font-size: 14px;
    line-height: 21px;
    color: ${theme.colors.grey};

    p {
      margin-bottom: 20px;
    }

    ${theme.mediaQueries.small} {
      font-size: 14px;
    }
  `}
`;

export const Thumbnail = styled.img`
  width: 100px;
  min-width: 100px;
  height: 100px;
  min-height: 100px;
  border-radius: 50px;
  overflow: hidden;
  margin-right: 30px;
`;
