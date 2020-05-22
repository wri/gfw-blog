import { styled } from 'frontity';
import theme from '../../../theme';

export default styled.div`
  position: relative;
  font-size: 1.25rem;
  line-height: 2.25rem;
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;
  user-select: text;

  .wp-block-gallery {
    ${theme.mediaQueries.medium} {
      width: 769px !important;
    }
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;

    ${theme.mediaQueries.small} {
      width: calc(100% + (100% / 7));
      margin-left: calc(-100% / 7);
    }
  }

  iframe,
  .wp-block-pullquote,
  .wp-block-gallery {
    margin: 0;
    margin-bottom: 20px;
    width: 100%;

    ${theme.mediaQueries.small} {
      width: calc(100% + (100% / 7));
      margin-left: calc(-100% / 7);
    }

    img {
      width: 100%;
      margin-left: 0;
    }
  }

  blockquote {
    background-color: #fff;
    border: 0;
    font-size: 1.875rem;
    line-height: 1.5;
    p {
      font-size: 1.875rem;
      line-height: 1.5;
      ${theme.mediaQueries.small} {
        font-size: 1.5rem;
      }
    }

    ${theme.mediaQueries.small} {
      font-size: 1.5rem;
    }
  }

  .wp-block-gallery {
    img {
      height: 240px;

      ${theme.mediaQueries.small} {
        height: 486px;
      }
    }
  }

  iframe {
    display: block;
  }

  p {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;

    font-size: 18px;

    ${theme.mediaQueries.small} {
      font-size: 20px;
    }
  }

  a {
    font-size: 18px;

    ${theme.mediaQueries.small} {
      font-size: 20px;
    }
  }

  .button-light {
    border-color: #e5e5df;
  }

  & > .attribute {
    color: #787878;
    font-style: italic;
    font-size: 1.25rem;
    line-height: 2.25rem;
    padding-top: 1.375rem;
    padding-bottom: 1.375rem;

    a {
      color: #97bd3d;
      &:hover {
        text-decoration: underline;
        color: #658022;
      }
    }

    ${theme.mediaQueries.small} {
      font-size: 1.125rem;
    }

    &::after {
      height: 2px;
      display: block;
      width: 65px;
      background-color: #e5e5df;
      content: '';
      margin-top: 2.625rem;
    }

    &::before {
      height: 2px;
      display: block;
      width: 65px;
      background-color: #e5e5df;
      content: '';
      margin-bottom: 2.625rem;
    }
  }

  & > hr {
    display: none;
  }

  & > * {
    font-size: 1.125rem;

    ${theme.mediaQueries.small} {
      font-size: 1.25rem;
    }
  }

  .c-carousel {
    margin: 30px 0;
    ${theme.mediaQueries.small} {
      margin-left: -2rem;
    }
    width: 100%;

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

      ${theme.mediaQueries.large} {
        left: -150px;
      }

      ${theme.mediaQueries.medium} {
        left: -10px;
      }
    }

    .slick-next {
      right: -5px;

      ${theme.mediaQueries.large} {
        right: -150px;
      }

      ${theme.mediaQueries.medium} {
        right: -10px;
      }
    }

    .slick-slide {
      &:not(.slick-active) {
        cursor: pointer;
        ${theme.mediaQueries.small} {
          opacity: 0;
        }
      }
    }
  }

  p {
    line-height: 1.75;
  }

  figcaption {
    font-size: 0.75rem;
    line-height: 1.75;
    padding-top: 0.75rem;
  }

  a {
    color: #97bd3d;
    text-decoration: none;
    font-weight: 600;
  }

  h3 {
    font-size: 1.25rem;
    line-height: 1.8;
    font-weight: 800;
    padding-top: 1.25rem;

    ${theme.mediaQueries.small} {
      padding-top: 2.25rem;
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
