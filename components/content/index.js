import React from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from './styles';

const PostContent = ({ children, align }) => (
  <ContentWrapper align={align}>{children}</ContentWrapper>
);

PostContent.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string,
};

export default PostContent;
