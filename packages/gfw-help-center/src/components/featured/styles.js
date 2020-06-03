import { styled } from 'frontity';
import theme from '../../app/theme';

export const Wrapper = styled.article`
  height: 400px;
  position: relative;
  overflow: hidden;

  ${theme.mediaQueries.small} {
    height: 440px;
  }

  ${theme.mediaQueries.medium} {
    height: 440px;
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
  padding: 30px 16px;
  width: 100%;
  height: 100%;

  ${theme.mediaQueries.small} {
    padding: 40px 50px;
    width: 75%;
  }

  ${theme.mediaQueries.medium} {
    padding: 50px 70px;
  }
`;

export const PostTitle = styled.h3`
  font-size: 30px;
  line-height: 37px;
  color: ${theme.colors.white};
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  ${theme.mediaQueries.small} {
    font-size: 36px;
    line-height: 45px;
  }
`;

export const PostExcerpt = styled.div`
  font-size: 14px;
  line-height: 21px;
  color: ${theme.colors.white};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  ${theme.mediaQueries.small} {
    font-size: 16px;
    line-height: 28px;
  }
`;
