import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';

import { Carousel } from 'gfw-components';

import useScript from 'utils/scripts';
import Blockquote from 'components/blockquote';

import ContentWrapper from './styles';

const PostContent = ({ children, align }) => (
  <ContentWrapper align={align}>
    {ReactHtmlParser(children, {
      transform: (node) => {
        if (
          node.name === 'ul' &&
          node?.attribs.class === 'blocks-gallery-grid'
        ) {
          return (
            <Carousel
              settings={{
                slidesToShow: 1,
                slidesToScroll: 1,
                lazyLoad: false,
                infinite: true,
                focusOnSelect: true,
              }}
            >
              {node.children.map(convertNodeToElement)}
            </Carousel>
          );
        }

        if (node.name === 'blockquote') {
          return (
            <Blockquote>{node.children.map(convertNodeToElement)}</Blockquote>
          );
        }

        if (node?.name === 'script') {
          const src = node?.attribs?.src;
          useScript(src);
        }

        return '';
      },
    })}
  </ContentWrapper>
);

PostContent.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string,
};

export default PostContent;
