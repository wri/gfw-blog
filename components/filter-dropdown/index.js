import React from 'react';
import PropTypes from 'prop-types';
import { FilterDropDownWrapper, FilterDropDownContainer } from './styles';

const Option = ({ item, selectedItems, handleChange }) => {
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
        <span className="checkmark" />
      </label>
    </>
  );
};

Option.propTypes = {
  item: PropTypes.object,
  handleChange: PropTypes.func,
  selectedItems: PropTypes.array,
};

const FilterDropDown = ({
  items,
  handleSelectItem,
  selectedItems = [],
  // eslint-disable-next-line no-unused-vars
  margin = '0',
}) => {
  const selectItem = (item) => {
    handleSelectItem(item.slug);
  };

  return (
    <FilterDropDownWrapper margin={margin}>
      <FilterDropDownContainer>
        {items.map((item) => (
          <Option
            key={item.slug}
            item={item}
            selectedItems={selectedItems}
            handleChange={selectItem}
          />
        ))}
      </FilterDropDownContainer>
    </FilterDropDownWrapper>
  );
};

FilterDropDown.propTypes = {
  items: PropTypes.array,
  handleSelectItem: PropTypes.func,
  selectedItems: PropTypes.array,
  margin: PropTypes.string,
};

export default FilterDropDown;
