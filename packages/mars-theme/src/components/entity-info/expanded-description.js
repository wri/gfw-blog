import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'frontity';

const ExpendedDescription = ({ less, full }) => {
  const [expended, setExpended] = useState(false);

  // eslint-disable-next-line no-shadow
  const expendToggler = () => setExpended((expended) => !expended);

  if (!less) {
    return full;
  }

  return (
    <>
      <Wrapper>
        {expended ? full : less}
        {expended && <Toggler onClick={expendToggler}>Collapse bio</Toggler>}
        {!expended && <ShadowLayer />}
      </Wrapper>
      {!expended && <Toggler onClick={expendToggler}>Expend bio</Toggler>}
    </>
  );
};

ExpendedDescription.propTypes = {
  less: PropTypes.string,
  full: PropTypes.string,
};

export default ExpendedDescription;

const Wrapper = styled.div`
  position: relative;
`;

const ShadowLayer = styled.div`
  width: 100%;
  height: 4rem;
  position: absolute;
  bottom: 0;
  background: linear-gradient(0, #fff, transparent);
`;

const Toggler = styled.div`
  color: var(--color-primary);
  cursor: pointer;
  padding-top: 1rem;
`;
