import React from "react";
import PropTypes from "prop-types";
import { styled } from "frontity";

const Excerpt = ({ children, styles='' }) => {
  const Wrapper = styled.div`
    font-size: 14px;
    line-height: 1.75;
    color: rgba(12, 17, 43, 0.8);
    ${styles}
  `;
  return <Wrapper dangerouslySetInnerHTML={{ __html: children}} />
}

export default Excerpt

Excerpt.propTypes = {
  styles: PropTypes.string,
  children: PropTypes.node
}
