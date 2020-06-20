import { styled } from 'frontity';
import theme from '../../app/theme';

export default styled.div`
  position: relative;
  font-size: 18px;
  line-height: 32px;
  color: ${theme.colors.darkestGrey};
  word-break: break-word;
  text-align: left;

  ${theme.mediaQueries.small} {
    font-size: 20px;
    line-height: 36px;
  }

  *::selection {
    background: ${theme.colors.green};
    color: ${theme.colors.white};
  }

  > *,
  p,
  a {
    font-size: inherit;
    line-height: inherit;
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  hr {
    display: none;
    height: 2px;
    display: block;
    width: 65px;
    border: none;
    margin: 0 0 40px 0;
    background-color: ${theme.colors.lightGrey};
  }

  a {
    color: ${theme.colors.green};

    &:hover {
      color: ${theme.colors.darkGreen};
      text-decoration: underline;
    }
  }

  h3 {
    font-weight: 600;
    padding-top: 30px;
    margin-bottom: 20px;
  }

  /* intro/outro text */
  & > .attribute {
    color: #787878;
    font-style: italic;
    padding: 0;
    font-size: inherit;
    line-height: inherit;
  }

  figure,
  iframe,
  .imagecenter {
    margin: 0;
    padding: 0;
    display: block;
    margin-bottom: 30px;
    width: 100%;

    ${theme.mediaQueries.small} {
      width: calc(100% + (100% / 7));
      margin-left: calc(-100% / 7);
    }
  }

  figcaption {
    font-size: 12px;
    line-height: 18px;
    padding-top: 10px;
    color: ${theme.colors.darkGrey};
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    margin-bottom: 0;
  }

  ol {
    list-style: decimal;
  }

  ul {
    list-style: disc;
  }

  ul,
  ol {
    margin-left: 16px;

    ${theme.mediaQueries.small} {
      margin-left: 20px;
    }
  }

  .wp-block-gallery > div {
    margin: 0;
    width: 100%;

    img {
      height: 240px;

      ${theme.mediaQueries.small} {
        height: 486px;
      }
    }

    figure {
      margin: 0 auto !important;
      width: 100% !important;
    }

    .slick-prev,
    .slick-next {
      top: 100px;
      background-color: #333;
      z-index: 5;

      ${theme.mediaQueries.small} {
        top: 220px;
      }

      &:hover {
        background-color: #97bd3d;
      }
    }

    .slick-prev {
      left: -5px;

      ${theme.mediaQueries.medium} {
        left: -10px;
      }

      ${theme.mediaQueries.large} {
        left: -150px;
      }
    }

    .slick-next {
      right: -5px;

      ${theme.mediaQueries.medium} {
        right: -10px;
      }

      ${theme.mediaQueries.large} {
        right: -150px;
      }
    }
  }
`;
