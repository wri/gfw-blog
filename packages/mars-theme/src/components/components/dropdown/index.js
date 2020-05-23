import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { Button } from 'gfw-components';

import ResultsList from '../results-list';

import { Wrapper, Container, ArrowIcon, LabelContainer } from './styles';

const Dropdown = ({ actions, libraries, state, showTitle, ...props }) => {
  const [open, setOpen] = useState(false);

  const data = state.source.get(state.router.link);
  const { categories } = state.source.data['all-categories/'];
  const { tags } = state.source.data['top-tags/'];

  const allMeta = [...categories, ...tags];

  const tax = allMeta.find((m) => m.id === data.id);

  return (
    <Wrapper {...props} open={open}>
      <Container open={open}>
        <LabelContainer onClick={() => setOpen(true)}>
          {tax.name}
        </LabelContainer>
        <Button theme="button-clear round" onClick={() => setOpen(!open)}>
          <ArrowIcon open={open} />
        </Button>
      </Container>
      {open && (
        <ResultsList
          items={allMeta}
          selected={tax.id}
          onClickResult={() => setOpen(false)}
        />
      )}
    </Wrapper>
  );
};

Dropdown.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  showTitle: PropTypes.bool,
  libraries: PropTypes.object,
  expanded: PropTypes.bool,
};

export default connect(Dropdown);
