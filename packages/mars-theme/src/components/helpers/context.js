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

  return (
    <TopEntitiesContext.Provider
      value={{
        data,
        setEntity,
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
