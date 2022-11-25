const BLOG_LINK = 'https://www.globalforestwatch.org/blog';

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
      `${BLOG_LINK}/`
    )
    .replace(
      /https:\/\/content.globalforestwatch.org\/global-forest-watch-blog/g,
      BLOG_LINK
    )
    .replace(/https:\/\/blog.globalforestwatch.org/g, BLOG_LINK);
};

/**
 * Returns the canonical link to be used in the page.
 * If one is set in Yoast, we use it. If not, we'll use either the post or tax link.
 * If no links are available, we can assume we're on the /blog page.
 */
export const getCanonicalLink = ({ metaTags }) => {
  const yoastCanonicalLink = (metaTags?.match(
    /<link rel="canonical" href="(.*)" \/>/
  ) || [])[1];

  return ensureTrailingSlash(serializeYoast(yoastCanonicalLink || BLOG_LINK)); // BLOG_LINK is just a failsafe
};
