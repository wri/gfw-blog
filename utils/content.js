export const clearExcerptHellip = (str) => {
  return str.replace(/(\[(&hellip;)\])<\/.>/, '$2');
};

export const getLessContent = (str) => {
  return str.length < 800 ? str : str.substring(0, 800);
};

export const serializeYoast = (yoast) => {
  return yoast
    .replace(
      /https:\/\/content.globalforestwatch.org\/global-forest-watch-blog/g,
      'https://www.globalforestwatch.org/blog'
    )
    .replace(
      /https:\/\/blog.globalforestwatch.org/g,
      'https://www.globalforestwatch.org/blog'
    );
};
