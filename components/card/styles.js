import styled from '@emotion/styled';
import { rgba } from 'emotion-rgba';
import { theme } from 'gfw-components';

import PlayIconSrc from 'assets/icons/play.svg';

export const CardWrapper = styled.article`
  position: relative;

  img,
  h3 {
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    h3 {
      color: ${theme.colors.darkGreen};
      text-decoration: underline;
    }

    img {
      transition: all 0.2s ease-in-out;
      transform: scale(1.05);
    }
  }
`;

export const MediaWrapper = styled.div`
  height: 200px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
  display: flex;

  ${theme.mediaQueries.small} {
    ${({ large }) =>
      large &&
      `
        height: 300px;
    `}
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${rgba(theme.colors.darkestGrey, 0.4)};
`;

export const PlayIcon = styled(PlayIconSrc)`
  width: 10px;
  height: 10px;
`;

export const PostTitle = styled.h3`
  font-size: 22px;
  line-height: 28px;
  color: ${theme.colors.darkestGrey};
  width: 100%;
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    ${({ large }) =>
      large &&
      `
        font-size: 30px;
        line-height: 38px;
    `}
  }
`;

export const PostExcerpt = styled.div`
  font-size: 14px;
  line-height: 21px;
  color: ${theme.colors.mediumGrey};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  ${theme.mediaQueries.small} {
    ${({ large }) =>
      large &&
      `
        font-size: 16px;
        line-height: 28px;
    `}
  }
`;
