import { styled } from 'frontity';
import theme from '../../../theme';

export default styled.div`
  position: relative;
  font-size: 18px;
  line-height: 32px;
  color: ${theme.colors.darkestGrey};
  word-break: break-word;

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
  }

  hr {
    display: none;
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
    font-size: inherit;
    line-height: inherit;

    &::before,
    &::after {
      height: 2px;
      display: block;
      width: 65px;
      background-color: ${theme.colors.lightGrey};
      content: '';
    }

    &::before {
      margin-bottom: 30px;
    }

    &::after {
      margin-top: 30px;
    }
  }

  figure,
  iframe {
    margin: 0;
    padding: 0;
    display: block;
    margin-bottom: 30px;

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

  .c-carousel {
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

  /* Input fields styles */

  input[type='text'],
  input[type='email'],
  input[type='url'],
  input[type='tel'],
  input[type='number'],
  input[type='date'],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type='submit'] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
  }

  /* WordPress Core Align Classes */

  img {
    &.alignright,
    &.aligncenter,
    &.alignleft,
    &.imageright,
    &.imagecenter,
    &.imageleft {
      width: auto;
      margin: 0;

      ${theme.mediaQueries.small} {
        width: calc(100% + (100% / 7));
      }
    }
  }

  .alignright,
  .aligncenter,
  .alignleft,
  .imageright,
  .imagecenter,
  .imageleft {
    width: auto;
    margin: 0 0 30px 0;

    ${theme.mediaQueries.small} {
      width: calc(100% + (100% / 7));
      margin-left: calc(-100% / 7);
    }
  }
`;
