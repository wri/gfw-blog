import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'frontity';
import { clearExcerptHellip, removeExcerptHellip } from '../heplers/content';

const Excerpt = ({ children, styles = '', noHellip = false }) => {
  const Wrapper = styled.div`
    font-size: 14px;
    line-height: 1.75;
    color: rgba(12, 17, 43, 0.8);
    ${styles}
  `;
  const content = noHellip
    ? removeExcerptHellip(children)
    : clearExcerptHellip(children);
  return <Wrapper dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Excerpt;

Excerpt.propTypes = {
  styles: PropTypes.string,
  children: PropTypes.node,
  noHellip: PropTypes.bool,
};
