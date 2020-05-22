import React from 'react';
import PropTypes from 'prop-types';

import TwittTextTooltip from '../../../components/twitter-tooltip';

import ContentWrapper from './styles';

const PostContent = ({ children }) => (
  <ContentWrapper>
    {children}
    <TwittTextTooltip />
  </ContentWrapper>
);

PostContent.propTypes = {
  children: PropTypes.node,
};

export default PostContent;
