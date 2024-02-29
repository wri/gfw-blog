import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export const Wrapper = styled.div`
  height: 25rem;
  position: relative;
  overflow: hidden;

  ${theme.mediaQueries.small} {
    height: 27.5rem;
  }

  ${theme.mediaQueries.medium} {
    height: 27.5rem;
  }

  > a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  img {
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    img {
      transition: all 0.2s ease-in-out;
      transform: scale(1.05);
    }

    h3 {
      text-decoration: underline;
    }
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
`;

export const ContentWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  top: 0;
  padding: 1.875rem 1rem;
  width: 100%;
  height: 100%;

  ${theme.mediaQueries.small} {
    padding: 2.5rem 3.125rem;
    width: 75%;
  }

  ${theme.mediaQueries.medium} {
    padding: 3.125rem 4.375rem;
  }
`;

export const PostTitle = styled.h3`
  font-size: 3rem;
  line-height: 3rem;
  color: ${theme.colors.white};
  width: 100%;
  margin-bottom: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  ${theme.mediaQueries.small} {
    font-size: 2.25rem;
    line-height: 2.8125rem;
  }
`;

export const PostExcerpt = styled.div`
  font-size: 0.875rem;
  line-height: 1.3125rem;
  color: ${theme.colors.white};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  ${theme.mediaQueries.small} {
    font-size: 1rem;
    line-height: 1.75rem;
  }
`;
