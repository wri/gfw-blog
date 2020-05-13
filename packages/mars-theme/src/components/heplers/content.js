/* eslint-disable no-useless-escape */
// eslint-disable-next-line import/prefer-default-export
export const clearExcerptHellip = (str) => {
  return str.replace(/(\[(&hellip;)\])<\/.>/, '$2');
};

export const removeExcerptHellip = (str) => {
  return str.replace(/(\[(&hellip;)\])<\/.>/, '');
};

export const getLessContent = (str) => {
  return str.length < 800 ? str : str.substring(0, 800);
};
