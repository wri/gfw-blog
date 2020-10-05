// eslint-disable-next-line import/prefer-default-export
export const getACFImageSizes = (imageSizes) =>
  imageSizes && {
    thumbnail: {
      source_url: imageSizes.thumbnail,
      width: imageSizes['thumbnail-width'],
    },
    medium: {
      source_url: imageSizes.medium,
      width: imageSizes['medium-width'],
    },
    large: {
      source_url: imageSizes.large,
      width: imageSizes['large-width'],
    },
    '1536x1536': {
      source_url: imageSizes['1536x1536'],
      width: imageSizes['1536x1536-width'],
    },
    '2048x2048': {
      source_url: imageSizes['2048x2048'],
      width: imageSizes['2048x2048-width'],
    },
  };
