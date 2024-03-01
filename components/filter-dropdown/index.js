import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FilterDropDownWrapper, FilterDropDownContainer } from './styles';

const Option = ({ item, selectedItems, handleChange, isRadio }) => {
  const isChecked = selectedItems.includes(item.slug);

  return (
    <>
      <span className="title">{item.name}</span>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="container">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleChange(item)}
        />
        <span
          className={classNames('checkmark', {
            radio: isRadio,
          })}
        />
      </label>
    </>
  );
};

Option.propTypes = {
  item: PropTypes.object,
  handleChange: PropTypes.func,
  selectedItems: PropTypes.array,
  isRadio: PropTypes.bool,
};

const FilterDropDown = ({
  items,
  handleSelectItem,
  selectedItems = [],
  // eslint-disable-next-line no-unused-vars
  margin = '0',
  onBlur,
  isRadio = false,
}) => {
  const selectItem = (item) => {
    handleSelectItem(item.slug);
  };

  const dropDownWrapperReference = useRef(null);

  useEffect(() => {
    dropDownWrapperReference.current.focus();
  }, []);

  return (
    <FilterDropDownWrapper
      tabIndex="0"
      ref={dropDownWrapperReference}
      margin={margin}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          onBlur();
        }
      }}
    >
      <FilterDropDownContainer>
        {items.map((item) => (
          <Option
            key={item.slug}
            item={item}
            selectedItems={selectedItems}
            handleChange={selectItem}
            isRadio={isRadio}
          />
        ))}
      </FilterDropDownContainer>
    </FilterDropDownWrapper>
  );
};

FilterDropDown.propTypes = {
  onBlur: PropTypes.func,
  items: PropTypes.array,
  handleSelectItem: PropTypes.func,
  selectedItems: PropTypes.array,
  margin: PropTypes.string,
  isRadio: PropTypes.bool,
};

export default FilterDropDown;
