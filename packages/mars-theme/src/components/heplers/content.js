// eslint-disable-next-line import/prefer-default-export
export const clearExcerptHellip = (str) => {
  return str.replace(/(\[(&hellip;)\])<\/.>/, '$2');
};

export const removeExcerptHellip = (str) => {
  return str.replace(/(\[(&hellip;)\])<\/.>/, '');
};
