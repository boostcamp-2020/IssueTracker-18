import React, { createContext, useState } from 'react';

const FilterStateContext = createContext('?isOpen=true');
const FilterAddFilterParamContext = createContext();

const Filter = ({ children }) => {
  const [filter, setFilter] = useState('?isOpen=true');

  const addFilterParam = param => {
    const newFilter = filter + param;
    setFilter(newFilter);
  };

  console.log(filter, addFilterParam);
  return (
    <FilterStateContext.Provider value={filter}>
      <FilterAddFilterParamContext.Provider value={addFilterParam}>
        {children}
      </FilterAddFilterParamContext.Provider>
    </FilterStateContext.Provider>
  );
};

export { Filter as default, FilterStateContext, FilterAddFilterParamContext };
