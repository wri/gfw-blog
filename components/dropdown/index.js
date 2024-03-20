import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import ResultsList from '../results-list';

import { Wrapper, Container, ArrowIcon } from './styles';

const Dropdown = ({
  selected,
  items,
  placeholder = '',
  withDivider = true,
}) => {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  const selectedItem =
    items && !!items.length && items.find((i) => i && i.id === selected);
  const selectedLabel = selectedItem && selectedItem.name;

  const handleClickOutside = (e) => {
    if (wrapperRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <Container withDivider={withDivider} onClick={() => setOpen(!open)}>
        {selectedLabel && <span className="title">{selectedLabel}</span>}
        {!selectedLabel && <span className="title">{placeholder}</span>}
        <ArrowIcon open={open} />
      </Container>
      {open && (
        <ResultsList
          items={items}
          selected={selected}
          onClickResult={() => setOpen(false)}
          showCount={items?.some((i) => !!i.count)}
        />
      )}
    </Wrapper>
  );
};

Dropdown.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.number,
  placeholder: PropTypes.string,
  withDivider: PropTypes.bool,
};

export default Dropdown;
