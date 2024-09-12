import React, { useState } from "react";
import AsyncSelect from "react-select/async";

export default function TagSearch() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    { value: "sarc", label: "SARC" },
    { value: "mime", label: "Mime" },
    { value: "dvm", label: "DVM" },
  ];

  const loadOptions = (inputValue, callback) => {
      const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    ); 
    callback(filteredOptions);
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent', 
      border: 'none',                 
      boxShadow: 'none',              
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'transparent', 
      width: '300px',                 
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: 'white',       
      color: 'black',                 
      padding: '10px',                
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: 'white',       
        color: 'black',                 
        borderRadius: '4px',           
      }),  
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'black',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: () => ({
      display: 'none',
    }),
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions={options}
      loadOptions={loadOptions}
      onChange={handleChange}
      value={selectedOptions}
      placeholder="Search your commitment"
      styles={customStyles}
    />
  );
};
