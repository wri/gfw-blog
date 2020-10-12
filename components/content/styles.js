import styled from '@emotion/styled';
import { theme } from 'gfw-components';

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

  em,
  i,
  q,
  dfn {
    font-style: italic;
  }

  em em,
  em i,
  i em,
  i i,
  cite em,
  cite i {
    font-weight: bolder;
  }

  big {
    font-size: 1.2em;
  }

  small {
    font-size: 0.75em;
  }

  b,
  strong {
    font-weight: 700;
  }

  ins {
    text-decoration: underline;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  abbr,
  acronym {
    cursor: help;
  }

  address {
    line-height: 1.5;
    margin: 0 0 2rem 0;
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

    &:hover,
    &:focus {
      color: ${theme.colors.darkGreen};
      text-decoration: underline;
    }
  }

  h2,
  h3,
  h4 {
    line-height: 36px;
    font-weight: 500;
    padding-top: 20px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 18px;
    text-transform: uppercase;
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
  .imagecenter,
  blockquote,
  table {
    margin: 0;
    padding: 0;
    display: block;
    width: 100%;

    ${theme.mediaQueries.small} {
      width: calc(100% + (100% / 7));
      margin-left: calc(-100% / 7);

      ${({ align }) =>
        align === 'left' &&
        `
        margin-left: unset;
        margin-right: calc(-100% / 7);
      `}
    }

    iframe {
      width: 100%;
      min-height: 250px;

      ${theme.mediaQueries.small} {
        min-height: 400px;
      }
    }
  }

  .imageright,
  .imageleft {
    margin: 0;
    padding: 0 20px;
    display: block;
    margin-left: 0;
    margin-right: 0;

    figure {
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 0;
    }
  }

  aside {
    width: 100% !important;
    background-color: #f6f6f4;
    border: solid 1px #e5e5df;
    border-left-width: 1px !important;
    padding: 20px !important;
    font-size: 14px !important;
    line-height: 24px !important;
    color: ${theme.colors.darkGrey} !important;

    ${theme.mediaQueries.medium} {
      padding: 30px !important;
      width: calc(40% + (100% / 7)) !important;
      margin-right: calc(-100% / 7) !important;
    }
  }

  blockquote {
    margin-bottom: 40px;
  }

  figcaption,
  caption {
    font-size: 12px;
    line-height: 18px;
    color: ${theme.colors.darkGrey};
    padding-top: 10px;
  }

  img {
    max-width: 100%;
    object-fit: cover;
    object-position: center;
    margin-bottom: 0;
    display: block;
    height: auto;
  }

  ul,
  ol {
    margin: 0 0 3rem 3rem;
  }

  ul {
    list-style: disc;
  }

  ul ul {
    list-style: circle;
  }

  ul ul ul {
    list-style: square;
  }

  ol {
    list-style: decimal;
  }

  ol ol {
    list-style: lower-alpha;
  }

  ol ol ol {
    list-style: lower-roman;
  }

  li {
    margin: 0.5rem 0 0 2rem;
  }

  li > ul,
  li > ol {
    margin: 1rem 0 0 2rem;
  }

  dt {
    font-weight: 700;
  }

  dt + dd {
    margin-top: 0.5rem;
  }

  dd + dt {
    margin-top: 1.5rem;
  }

  ul,
  ol {
    margin-left: 16px;

    ${theme.mediaQueries.small} {
      margin-left: 20px;
    }

    > li {
      margin-bottom: 20px;
    }
  }

  table {
    border-left: 1px solid ${theme.colors.lightGrey};
    border-right: 1px solid ${theme.colors.lightGrey};
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    font-size: 16px;
    line-height: 19px;
    color: ${theme.colors.darkGrey};
    max-width: 100%;
    overflow: hidden;
    overflow-x: auto;
    width: 100%;

    ${theme.mediaQueries.small} {
      width: calc(100% + ((100% / 7) * 2));
      max-width: calc(100% + ((100% / 7) * 2));
      margin-left: calc(-100% / 7);
    }
  }

  .alignleft > table {
    margin: 0;
  }

  .alignright > table {
    margin: 0;
  }

  th,
  td {
    border: 1px solid ${theme.colors.lightGrey};
    border-right: 0;
    border-left: 0;
    margin: 0;
    overflow: visible;
    padding: 10px;
    white-space: pre-wrap;

    ${theme.mediaQueries.small} {
      padding: 20px;
    }
  }

  tr:nth-of-type(2n + 1) {
    background-color: ${theme.colors.lightestGrey};
  }

  th {
    background-color: ${theme.colors.lightGrey};
    text-transform: uppercase;
    color: #777;
    font-size: 14px;

    th,
    td {
      padding: 10px 15px;

      ${theme.mediaQueries.small} {
        padding: 10px 20px;
      }
    }
  }

  tr {
    th,
    td {
      &:first-of-type {
        padding-left: 20px;

        ${theme.mediaQueries.small} {
          padding-left: 40px;
        }
      }

      &:last-of-type {
        padding-right: 20px;

        ${theme.mediaQueries.small} {
          padding-left: 40px;
        }
      }
    }
  }

  thead {
    vertical-align: bottom;
    white-space: nowrap;
  }

  th {
    font-weight: 600;
  }

  figure,
  .imagecenter {
    padding-top: 20px;
    margin-bottom: 40px;

    .imagecentre {
      padding-top: 0;
      margin-bottom: 0;
    }
  }

  .wp-block-gallery > div {
    margin: 0;
    width: 100%;

    img {
      height: 240px;
      width: 100%;

      ${theme.mediaQueries.small} {
        height: 486px;
      }
    }

    figure {
      margin: 0 auto !important;
      width: 100% !important;
    }

    li {
      margin: 0;
    }

    .slick-prev,
    .slick-next {
      top: 120px;
      background-color: #333;
      z-index: 5;

      ${theme.mediaQueries.small} {
        top: 223px;
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
