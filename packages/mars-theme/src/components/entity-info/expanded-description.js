import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'frontity';

const ExpandedDescription = ({ less, full }) => {
  const [expanded, setExpanded] = useState(false);

  // eslint-disable-next-line no-shadow
  const expandToggler = () => setExpanded((expanded) => !expanded);

  if (!less) {
    return full;
  }

  return (
    <>
      <Wrapper>
        <div
          style={{ whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{ __html: expanded ? full : less }}
        />
        {expanded && <Toggler onClick={expandToggler}>Collapse bio</Toggler>}
        {!expanded && <ShadowLayer />}
      </Wrapper>
      {!expanded && <Toggler onClick={expandToggler}>Expand bio</Toggler>}
    </>
  );
};

ExpandedDescription.propTypes = {
  less: PropTypes.string,
  full: PropTypes.string,
};

export default ExpandedDescription;

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
