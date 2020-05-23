import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'gfw-components';

import ResultsList from '../results-list';

import { Wrapper, Container, ArrowIcon, LabelContainer } from './styles';

const Dropdown = ({ selected, items }) => {
  const [open, setOpen] = useState(false);

  const selectedItem = items && items.find((i) => i.id === selected);
  const selectedLabel = selectedItem && selectedItem.name;

  return (
    <Wrapper>
      <Container>
        <LabelContainer onClick={() => setOpen(true)}>
          {selectedLabel}
        </LabelContainer>
        <Button theme="button-clear round" onClick={() => setOpen(!open)}>
          <ArrowIcon open={open} />
        </Button>
      </Container>
      {open && (
        <ResultsList
          items={items}
          selected={selected}
          onClickResult={() => setOpen(false)}
          showCount
        />
      )}
    </Wrapper>
  );
};

Dropdown.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.number,
};

export default Dropdown;
