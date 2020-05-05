/* eslint-disable no-useless-escape */
// eslint-disable-next-line import/prefer-default-export
export const clearExcerptHellip = (str) => {
  return str.replace(/(\[(&hellip;)\])<\/.>/, '$2');
};

export const removeExcerptHellip = (str) => {
  return str.replace(/(\[(&hellip;)\])<\/.>/, '');
};

export const getLessContnet = (str) => {
  if (str.length < 400) {
    return null;
  }

  const result = str.match(/^.{400,800}(\.|\!|\?|\n|\,|\;)/);
  if (result && result[0]) {
    return result[0];
  }

  return null;
};
