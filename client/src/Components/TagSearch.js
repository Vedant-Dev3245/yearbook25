import React, { useState } from "react";
import AsyncSelect from "react-select/async";

export default function TagSearch() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Local options stored in an array
  const options = [
    { value: "sarc", label: "SARC" },
    { value: "mime", label: "Mime" },
    { value: "dvm", label: "DVM" },
  ];

  // Function to load options asynchronously
  const loadOptions = (inputValue, callback) => {
    // Filter options based on user input
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    // Pass filtered options to the callback
    callback(filteredOptions);
  };

  // Handle change in selection
  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  // Custom styles
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent', // Transparent background
      border: 'none',                 // Remove border
      boxShadow: 'none',              // Remove shadow
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'transparent', // Transparent menu background
      width: '300px',                 // Increase the width of the dropdown menu
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: 'white',       // Set the background of options to white
      color: 'black',                 // Option text color
      padding: '10px',                // Add padding for better spacing
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: 'white',       // White background for selected options
        color: 'black',                 // Text color of selected options
        borderRadius: '4px',            // Add some border-radius for better appearance
      }),  
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'black', // Text color of selected options
    }),
    indicatorSeparator: () => ({
      display: 'none', // Remove the separator between the value and the arrow
    }),
    dropdownIndicator: () => ({
      display: 'none', // Remove the dropdown arrow
    }),
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions={options} // Provide default options from local store
      loadOptions={loadOptions}
      onChange={handleChange}
      value={selectedOptions}
      placeholder="Search your commitment"
      styles={customStyles} // Apply custom styles
    />
  );
};
