import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'frontity';

const PostTitle = ({ children, styles = '' }) => {
  const Wrapper = styled.h1`
    font-size: 1.375rem;
    color: rgba(12, 17, 43, 1);
    margin: 0;
    box-sizing: border-box;
    ${styles}
  `;

  return <Wrapper dangerouslySetInnerHTML={{ __html: children }} />;
};

export default PostTitle;

PostTitle.propTypes = {
  styles: PropTypes.string,
  children: PropTypes.node,
};
