import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import CaptionWrapper from './styles';

const Caption = ({ caption, media_details: mediaDetails }) => {
  const captionText = caption?.rendered;
  const { credit } = mediaDetails?.image_meta || {};

  const imageDescription = `${captionText}${
    captionText && credit ? ' - ' : ''
  }${credit ? `<p>${credit}</p>` : ''}`;

  return (
    caption && (
      <CaptionWrapper>{ReactHtmlParser(imageDescription)}</CaptionWrapper>
    )
  );
};

Caption.propTypes = {
  media_details: PropTypes.object,
  caption: PropTypes.object,
};

export default Caption;
