import { Flex } from "@chakra-ui/react"
import React from "react"
import AsyncSelect from "react-select/async"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function ClubSearch(props) {

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent', 
      border: 'none',                 
      boxShadow: 'none',              
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'linear-gradient(144deg, #050505 9%, #081018 32.99%, #110B1B 50.05%, #060508 82.44%, #020202 92.26%)', // Transparent menu background
      width: '300px',
      borderRadius: '11px'          
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: 'linear-gradient(144deg, #050505 9%, #081018 32.99%, #110B1B 50.05%, #060508 82.44%, #020202 92.26%)',       // Set the background of options to white
      color: 'white',                 
      fontWeight: '600',
      fontSize: '18px',
      cursor: 'pointer',                
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: () => ({
      display: 'none',
    }),
  };

  const [option, setOption] = React.useState({})
  const navigate = useNavigate()

  const fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    }
    else {
      setTimeout(() => {
        // console.log(`https://yearbook-portal-backend-2022.herokuapp.com/searchUsers?name=${inputValue}`)
        axios({
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          url: `${process.env.REACT_APP_BACKEND_URL}/profiles/search?name=${inputValue}`,
        })
          .then(function (response) {
            let tempArray = [];
            response.data.forEach(element => {
              tempArray.push({ label: `${element.name} ${element.bitsId} `, value: `${element.user_id}` });
            });
            callback(tempArray);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  }
  const onSearchChange = (option) => {
    if (option) {
      setOption({ option })
      localStorage.setItem("friend", option.value)
      navigate(`/profile/${option.value}`)
    }
  }

  return (
    <Flex alignItems="center" w="100%">
      <AsyncSelect
        value={option}
        loadOptions={fetchData}
        placeholder="search"
        className="selectProf" 
        classNamePrefix="selectOpt"
        onChange={(e) => {
          onSearchChange(e)
        }}
        defaultOptions={true}
        styles={customStyles} />
    </Flex>
  )
}