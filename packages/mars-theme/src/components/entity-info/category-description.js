import React from 'react';
import PropTypes from 'prop-types';
import { connect, decode } from 'frontity';
import { NumberInfo, Title } from './components';

const CategoryDescription = ({ state }) => {
  const data = state.source.get(state.router.link);

  const description = decode(state.source[data.taxonomy][data.id].description);
  return (
    <>
      {description && <Title>{description}</Title>}
      <NumberInfo>
        {`${data.total}
        article${data.total > 1 && `s`} under the
        ${decode(state.source[data.taxonomy][data.id].name)}
        category`}
      </NumberInfo>
    </>
  );
};

export default connect(CategoryDescription);

CategoryDescription.propTypes = {
  state: PropTypes.object,
};
