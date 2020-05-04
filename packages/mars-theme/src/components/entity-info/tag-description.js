import React from 'react';
import PropTypes from 'prop-types';
import { connect, decode } from 'frontity';
import { NumberInfo, Title } from './components';

const TagDescription = ({ state }) => {
  const data = state.source.get(state.router.link);

  const description = decode(state.source[data.taxonomy][data.id].description);
  return (
    <>
      {description && <Title>{description}</Title>}
      <NumberInfo>
        {`${data.total}
        article${data.total > 1 && `s`} tagged
        ${decode(state.source[data.taxonomy][data.id].name)}`}
      </NumberInfo>
    </>
  );
};

export default connect(TagDescription);

TagDescription.propTypes = {
  state: PropTypes.object,
};
