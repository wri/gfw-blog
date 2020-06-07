import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';

import CaptionWrapper from './styles';

const Media = ({ libraries, caption }) => {
  const Html2React = libraries.html2react.Component;
  const captionText = caption?.rendered;

  return (
    caption && (
      <CaptionWrapper>
        <Html2React html={captionText} />
      </CaptionWrapper>
    )
  );
};

Media.propTypes = {
  libraries: PropTypes.object,
  caption: PropTypes.object,
};

export default connect(Media);
