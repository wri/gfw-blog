import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TopEntitiesContext = React.createContext();

const EntitiesProvider = ({ children }) => {
  const dataInitial = {
    authors: false,
    categories: false,
    tags: false,
  };

  const [data, setData] = useState(dataInitial);

  const setEntity = (name) => {
    const newData = { ...data };
    newData[name] = true;
    setData(newData);
  };

  const searchInitial = {
    active: false,
    tags: [],
    categories: [],
    elementRects: null,
    query: ''
  }

  const [active, setActive] = useState(searchInitial.active)
  const [tags, setTags] = useState(searchInitial.tags)
  const [categories, setCategories] = useState(searchInitial.categories)
  const [query, setQuery] = useState(searchInitial.query)
  const [elementRects, setElementRects] = useState(searchInitial.elementRects)

  const toggleSearch = () => setActive(val => !val);

  return (
    <TopEntitiesContext.Provider
      value={{
        data,
        setEntity,
        search: {
          active,
          query,
          setQuery,
          tags,
          setTags,
          categories,
          setCategories,
          toggleSearch,
          elementRects,
          setElementRects
        },
        
      }}
    >
      {children}
    </TopEntitiesContext.Provider>
  );
};

export default TopEntitiesContext;

export { EntitiesProvider };

EntitiesProvider.propTypes = {
  children: PropTypes.node,
};
