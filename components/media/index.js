import React from 'react';
import PropTypes from 'prop-types';

import { Container, StyledImage } from './styles';

const Media = ({
  styles,
  media_details,
  sizes,
  title,
  url,
  source_url,
  alt_text: altText,
}) => {
  const sourceUrl = url || source_url;
  const imageSizes = sizes || media_details.sizes;

  if (!sourceUrl) return null;

  const srcset =
    Object.values(imageSizes)
      // Get the url and width of each size.
      .map((item) => [item.source_url, item.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(' ')}w${index !== array.length - 1 ? ', ' : ''}`
          ),
        ''
      ) || null;

  return (
    <Container css={styles}>
      <StyledImage
        alt={altText || title.rendered || title}
        src={sourceUrl}
        srcSet={srcset}
      />
    </Container>
  );
};

Media.propTypes = {
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  url: PropTypes.string,
  source_url: PropTypes.string,
  sizes: PropTypes.object,
  media_details: PropTypes.object,
  styles: PropTypes.string,
  alt_text: PropTypes.string,
};

export default Media;
