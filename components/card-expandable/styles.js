import styled from '@emotion/styled';

import { theme } from 'gfw-components';

import PlusIconSvg from 'assets/icons/plus.svg';
import MinusIconSvg from 'assets/icons/minus.svg';

export const Card = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid #e5e5df;
  padding: 30px 30px;
  position: relative;
  display: flex;
  justify-content: space-between;

  ${theme.mediaQueries.small} {
    font-size: 14px;
    padding: 30px 50px;
  }
`;

export const MinusIcon = styled(MinusIconSvg)`
  width: 12px;
  min-width: 12px;
  height: 12px;
  margin: 9px 0;
  z-index: 1;
  position: relative;
`;

export const PlusIcon = styled(PlusIconSvg)`
  width: 12px;
  min-width: 12px;
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
  line-height: 30px;
  z-index: 1;
  position: relative;
  text-align: left;
  padding-right: 20px;
`;

export const Text = styled.div`
  z-index: 1;
  position: relative;
  margin-top: 20px;
  font-size: 18px;
  line-break: 36px;

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
  width: 50px;
  min-width: 50px;
  height: 50px;
  min-height: 50px;
  border-radius: 50px;
  overflow: hidden;
  margin-right: 30px;
  object-fit: cover;

  ${theme.mediaQueries.small} {
    width: 100px;
    min-width: 100px;
    height: 100px;
    min-height: 100px;
  }
`;
