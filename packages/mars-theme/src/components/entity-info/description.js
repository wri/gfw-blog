import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled, decode } from 'frontity';

const EntityDescription = ({ state }) => {
  const data = state.source.get(state.router.link);
  const description = decode(state.source[data.taxonomy][data.id].description);
  return (
    <>
      {data.isCategory && (
        <>
          {description && <Title>{description}</Title>}
          <NumberInfo>
            {`${data.total}
            articles under the
            ${decode(state.source[data.taxonomy][data.id].name)}
            category`}
          </NumberInfo>
        </>
      )}
    </>
  );
};

export default connect(EntityDescription);

EntityDescription.propTypes = {
  state: PropTypes.object,
};

const Title = styled.div`
  font-size: 1.125rem;
  line-height: 1.875rem;
  color: var(--color-dark-grey);
  padding-top: 1.625rem;
`;

const NumberInfo = styled.div`
  font-size: 0.875rem;
  line-height: 1.3125rem;
  margin-top: 4.625rem;
  color: var(--color-medium-grey);
`;
