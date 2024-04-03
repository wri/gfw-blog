import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export default styled.div`
  position: relative;
  font-size: 1.125rem;
  line-height: 2rem;
  color: ${theme.colors.darkestGrey};
  word-break: break-word;
  text-align: left;

  ${theme.mediaQueries.small} {
    font-size: 1.25rem;
    line-height: 2.25rem;
    padding-right: 12rem;
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
    margin-bottom: 2.5rem;

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
    height: 0.125rem;
    display: block;
    width: 4.0625rem;
    border: none;
    margin: 0 0 2.5rem 0;
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
    line-height: 2.25rem;
    font-weight: 500;
    padding-top: 1.25rem;
    margin-bottom: 1.25rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.125rem;
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
    padding-left: 0;
    display: block;
    width: 100%;

    ${theme.mediaQueries.small} {
      padding-left: 6rem;
      width: calc(100% + (100% / 7)) !important;
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
      min-height: 15.625rem;

      ${theme.mediaQueries.small} {
        min-height: 25rem;
      }
    }
  }

  .imageright,
  .imageleft {
    margin: 0;
    padding: 0 1.25rem;
    display: block;
    margin-left: 0;
    margin-right: 0;

    figure {
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 0;
    }
  }

  #textbox {
    width: 100% !important;
    float: right;

    ${theme.mediaQueries.small} {
      float: none;
    }
  }

  aside {
    width: 100% !important;
    background-color: #f6f6f4;
    border: solid 0.0625rem #e5e5df;
    border-left-width: 0.0625rem !important;
    padding: 1.25rem !important;
    font-size: 0.875rem !important;
    line-height: 1.5rem !important;
    color: ${theme.colors.darkGrey} !important;

    ${theme.mediaQueries.medium} {
      padding: 1.875rem !important;
      width: calc(40% + (100% / 7)) !important;
      margin-right: calc(-100% / 7) !important;
    }
  }

  blockquote {
    margin-bottom: 2.5rem;
  }

  figcaption,
  caption {
    font-size: 0.75rem;
    line-height: 1.125rem;
    color: ${theme.colors.darkGrey};
    padding-top: 0.625rem;
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
    margin-left: 1rem;

    ${theme.mediaQueries.small} {
      margin-left: 1.25rem;
    }

    > li {
      margin-bottom: 1.25rem;
    }
  }

  table {
    border-left: 0.0625rem solid ${theme.colors.lightGrey};
    border-right: 0.0625rem solid ${theme.colors.lightGrey};
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    font-size: 1rem;
    line-height: 1.1875rem;
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
    border: 0.0625rem solid ${theme.colors.lightGrey};
    border-right: 0;
    border-left: 0;
    margin: 0;
    overflow: visible;
    padding: 0.625rem;
    white-space: pre-wrap;

    ${theme.mediaQueries.small} {
      padding: 1.25rem;
    }
  }

  tr:nth-of-type(2n + 1) {
    background-color: ${theme.colors.lightestGrey};
  }

  th {
    background-color: ${theme.colors.lightGrey};
    text-transform: uppercase;
    color: #777;
    font-size: 0.875rem;

    th,
    td {
      padding: 0.625rem 0.9375rem;

      ${theme.mediaQueries.small} {
        padding: 0.625rem 1.25rem;
      }
    }
  }

  tr {
    th,
    td {
      &:first-of-type {
        padding-left: 1.25rem;

        ${theme.mediaQueries.small} {
          padding-left: 2.5rem;
        }
      }

      &:last-of-type {
        padding-right: 1.25rem;

        ${theme.mediaQueries.small} {
          padding-left: 2.5rem;
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
    padding-top: 1.25rem;
    margin-bottom: 2.5rem;

    .imagecentre {
      padding-top: 0;
      margin-bottom: 0;
    }
  }

  .wp-element-caption {
    text-transform: uppercase;
    color: #aaaaaa;
  }

  .wp-block-gallery > div {
    margin: 0;
    width: 100%;

    img {
      height: 15rem;
      width: 100%;

      ${theme.mediaQueries.small} {
        height: 30.375rem;
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
      top: 11.25rem;
      background-color: #333;
      z-index: 5;

      ${theme.mediaQueries.small} {
        top: 13.9375rem;
      }

      &:hover {
        background-color: #97bd3d;
      }
    }

    .slick-prev {
      left: -0.3125rem;

      ${theme.mediaQueries.medium} {
        left: -0.625rem;
      }

      ${theme.mediaQueries.large} {
        left: -9.375rem;
      }
    }

    .slick-next {
      right: -0.3125rem;

      ${theme.mediaQueries.medium} {
        right: -0.625rem;
      }

      ${theme.mediaQueries.large} {
        right: -9.375rem;
      }
    }
  }
`;
