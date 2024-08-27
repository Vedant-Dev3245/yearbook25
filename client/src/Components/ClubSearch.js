import React from 'react';
import AsyncSelect from 'react-select/async';
import { Flex } from "@chakra-ui/react"

const customStyles = {
    control: (provided) => ({
        ...provided,
        border: 'none',            // Remove the border (bar)
        boxShadow: 'none',         // Remove the default box shadow
    }),
    dropdownIndicator: () => ({
        display: 'none',           // Hide the dropdown arrow
    }),
    indicatorSeparator: () => ({
        display: 'none',           // Hide the separator line next to the arrow
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'white',       // Background color of the dropdown menu
    }),
    option: (provided, state) => ({
        ...provided,
        color: 'black',                 // Set the text color of dropdown options to black
        backgroundColor: state.isSelected ? '#f0f0f0' : 'white', // Optional: Change the background when selected
        '&:hover': {
            backgroundColor: '#e6e6e6',   // Optional: Change background color on hover
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'black',                 // Text color of the selected option
    }),
};

const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'grape', label: 'Grape' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'lemon', label: 'Lemon' },
    { value: 'mango', label: 'Mango' },
    { value: 'orange', label: 'Orange' },
    { value: 'peach', label: 'Peach' },
    { value: 'pear', label: 'Pear' },
    { value: 'pineapple', label: 'Pineapple' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'watermelon', label: 'Watermelon' },
];

const loadFruits = (inputValue, callback) => {
    // Filter fruits based on user input
    const filteredFruits = fruits.filter(fruit =>
        fruit.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredFruits);
};

export default function ClubSearch(props) {
    return (
        <Flex textAlign="left" w="100%">
            <AsyncSelect
                cacheOptions
                loadOptions={loadFruits}
                placeholder="search your senior"
                className="selectProf"
                classNamePrefix="selectOpt"
                styles={customStyles}
                {...props} // Pass other props like value, onChange, etc.
            />
        </Flex>
    );
};
