import styled from '@emotion/styled';
import { rgba } from 'emotion-rgba';
import { theme } from '@worldresources/gfw-components';

import PlayIconSrc from 'assets/icons/play.svg';

export const CardWrapper = styled.div`
  position: relative;

  ${({ isFeaturedSubPost }) =>
    isFeaturedSubPost &&
    `
      margin-bottom: 10px;
    `}

  > a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  img,
  h3 {
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    h3 {
      text-decoration: underline;
    }

    img {
      transition: all 0.2s ease-in-out;
      transform: scale(1.05);
    }
  }
`;

export const InfoWrapper = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.25px;
  padding: 10px 0;
  text-align: left;

  > span {
    padding: 0 2px;
  }

  .bold {
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    letter-spacing: 0.25px;
    text-align: left;
    text-transform: uppercase;
  }

  .separator {
    color: #97bd3d;
  }

  .reading-time {
    text-transform: uppercase;
  }
`;

export const MediaWrapper = styled.div`
  height: 200px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
  display: flex;
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
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: ${theme.colors.darkestGrey};
  width: 100%;
  margin-bottom: 1.25rem;

  ${theme.mediaQueries.small} {
    ${({ large }) =>
      large &&
      `
        font-size: 1.5rem;
        line-height: 2.375rem;
    `}
  }
`;

export const PostExcerpt = styled.div`
  color: ${theme.colors.mediumGrey};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  line-height: 21px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

  ${theme.mediaQueries.small} {
    ${({ large }) =>
      large &&
      `
        font-size: 16px;
        line-height: 28px;
    `}
  }
`;
