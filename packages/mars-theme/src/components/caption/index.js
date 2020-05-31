import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import CaptionWrapper from './styles';

const Media = ({ libraries, caption, media_details: mediaDetails }) => {
  const Html2React = libraries.html2react.Component;
  const captionText = caption?.rendered;
  const { credit } = mediaDetails?.image_meta || {};

  const imageDescription = `${captionText}${
    captionText && credit ? ' - ' : ''
  }${credit ? `<p>${credit}</p>` : ''}`;

  return (
    caption && (
      <CaptionWrapper>
        <Html2React html={imageDescription} />
      </CaptionWrapper>
    )
  );
};

Media.propTypes = {
  media_details: PropTypes.object,
  libraries: PropTypes.object,
  caption: PropTypes.object,
};

export default connect(Media);
