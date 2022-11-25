export const clearExcerptHellip = (str) => {
  return str.replace(/(\[(&hellip;)\])<\/.>/, '$2');
};

export const getLessContent = (str) => {
  return str.length < 800 ? str : str.substring(0, 800);
};

export const ensureTrailingSlash = (str) => {
  if (str.endsWith('/')) return str;
  return `${str}/`;
};

export const serializeYoast = (yoast) => {
  return yoast
    .replace(/<link rel="canonical" .* \/>/, '') // we render this ourselves
    .replace(
      /https:\/\/www.globalforestwatch.org\/(blog\/?)?/g, // /blog/ might not be present, and has to be added if thats the case.
      'https://www.globalforestwatch.org/blog/'
    )
    .replace(
      /https:\/\/content.globalforestwatch.org\/global-forest-watch-blog/g,
      'https://www.globalforestwatch.org/blog'
    )
    .replace(
      /https:\/\/blog.globalforestwatch.org/g,
      'https://www.globalforestwatch.org/blog'
    );
};

/**
 * Returns the canonical link to be used in the page.
 * If one is set in Yoast, we use it. If not, we'll use either the post or tax link.
 * If no links are available, we can assume we're on the /blog page.
 */
export const getCanonicalLink = ({ metaTags }) => {
  const blogLink = 'https://www.globalforestwatch.org/blog';

  const yoastCanonicalLink = (metaTags?.match(
    /<link rel="canonical" href="(.*)" \/>/
  ) || [])[1];

  return ensureTrailingSlash(serializeYoast(yoastCanonicalLink || blogLink)); // blogLink is just a failsafe
};
