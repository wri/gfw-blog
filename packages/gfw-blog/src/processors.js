import { Carousel } from 'gfw-components';

import Blockquote from './components/blockquote';

export const gutenbergGallery = {
  test: ({ component, props }) =>
    component === 'ul' && props.className === 'blocks-gallery-grid',
  processor: () => {
    return {
      component: Carousel,
      props: {
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          lazyLoad: false,
          infinite: true,
          focusOnSelect: true,
        },
      },
    };
  },
};

export const blockquote = {
  test: ({ component }) => component === 'blockquote',
  processor: () => {
    return {
      component: Blockquote,
    };
  },
};
