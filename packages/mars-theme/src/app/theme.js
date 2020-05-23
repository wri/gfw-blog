// breakpoints for grid
export const SCREEN_S = 768;
export const SCREEN_M = 860;
export const SCREEN_L = 1024;
export const SCREEN_XL = 1080;

export const breakpoints = {
  small: SCREEN_S,
  medium: SCREEN_M,
  large: SCREEN_L,
  xlarge: SCREEN_XL,
};

const mediaQueries = Object.entries(breakpoints).reduce(
  (obj, [size, value]) => ({
    ...obj,
    [size]: `@media (min-width: ${value}px)`,
  }),
  {}
);

export default {
  fontFamily: "'Fira Sans', Arial, sans-serif",
  mediaQueries,
  breakpoints: Object.values(breakpoints).map((br) => `${br}px`),
  colors: {
    green: '#97be32',
    darkGreen: '#658022',
    darkestGrey: '#333',
    darkGrey: '#555',
    mediumGrey: '#777',
    grey: '#aaa',
    lightGrey: '#e5e5df',
    lightestGrey: '#f7f7f7',
    white: '#fff',
    lightYellow: '#fffee2',
    error: '#ed1846',
  },
  grid: {
    mobileGutter: '16px',
    desktopGutter: '20px',
  },
};
