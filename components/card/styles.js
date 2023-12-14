import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'
import { theme } from '@worldresources/gfw-components'

import PlayIconSrc from 'assets/icons/play.svg'

export const CardWrapper = styled.div`
  position: relative;

  ${({ isFeaturedSubPost }) =>
    isFeaturedSubPost &&
    `
        padding: 0.625rem 0;
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
`

export const InfoWrapper = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 0.875rem;
  letter-spacing: 0.1.5625rem;
  padding: 0 0 0.625rem;
  text-align: left;

  > span {
    padding: 0 0.125rem;
  }

  .bold {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 0.875;
    letter-spacing: 0.015625rem;
    text-align: left;
    text-transform: uppercase;
  }

  .separator {
    color: #97bd3d;
  }

  .reading-time {
    text-transform: uppercase;
  }
`

export const MediaWrapper = styled.div`
  height: 12.5rem;
  overflow: hidden;
  margin-bottom: 1.25rem;
  position: relative;
  display: flex;
`

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
`

export const PlayIcon = styled(PlayIconSrc)`
  width: 0.625rem;
  height: 0.625rem;
`

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
`

export const PostExcerpt = styled.div`
  color: ${theme.colors.mediumGrey};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 0.875rem;
  line-height: 1.3125rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

  ${theme.mediaQueries.small} {
    ${({ large }) =>
      large &&
      `
        font-size: 1rem;
        line-height: 1.75rem;
    `}
  }
`
