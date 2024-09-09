import {
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Textarea,
  FormHelperText,
  Button,
  FormControl,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

/* const optionsArray = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(optionsArray.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase())));
  }, 1000);
};
 */
export default function ClubSearch() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [res, setRes] = React.useState(false)
  const [label, setLabel] = React.useState("")
  const [bitsid, setBitsid] = React.useState("")
  const [msg, setMsg] = React.useState("")
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const [isDisabled, setIsDisabled] = React.useState(false);

  const fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        axios({
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          url: `${process.env.REACT_APP_BACKEND_URL}/profiles/search?name=${inputValue}`,
        })
          .then(function (response) {
            let tempArray = [];
            response.data.users.forEach((element) => {
              tempArray.push({
                label: `${element.name} ${element.bitsId} `,
                value: `${element.uId}`,
              });
            });
            callback(tempArray);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  };

  const onSearchChange = (option) => {
    if (option) {
      localStorage.setItem("friend", option.value)
      setBitsid(option.label.substring(option.label.length - 14))
      setLabel(option.label.substring(0, option.label.length - 14))
      onOpen();
    }
  }

  let clubData = {
    receiverId: localStorage.getItem("friend")
  }

  function clubMembers() {
    if (clubData.senderId === clubData.receiverId) {
      console.log("stop")
    }
    else {
      console.log(clubData)
      axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        },
        url: `${process.env.REACT_APP_BACKEND_URL}/nominations/nominate`, /* backend */
        data: clubData
      })
        .then(function (res) {
          console.log(res);
          setMsg(res.data.msg);
          setRes(true)
          setLabel("")
          setBitsid("")
          setTimeout(() => {
            setRes(false)
          }, 3000);
        })
        .catch(function (err) {
          setMsg(err.message);
          setRes(true)
          console.log(err);
          setTimeout(() => {
            setRes(false)
          }, 3000);
        });
    }
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent', // Transparent background
      border: 'none',                 // Remove border
      boxShadow: 'none',              // Remove shadow
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'linear-gradient(144deg, #050505 9%, #081018 32.99%, #110B1B 50.05%, #060508 82.44%, #020202 92.26%)', // Transparent menu background
      width: '300px',
      borderRadius: '11px'          // Increase the width of the dropdown menu
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: 'linear-gradient(144deg, #050505 9%, #081018 32.99%, #110B1B 50.05%, #060508 82.44%, #020202 92.26%)',       // Set the background of options to white
      color: 'white',                 // Option text color
      fontWeight: '600',
      fontSize: '18px',
      cursor: 'pointer',                // Add padding for better spacing
    }),
    indicatorSeparator: () => ({
      display: 'none', // Remove the separator between the value and the arrow
    }),
    dropdownIndicator: () => ({
      display: 'none', // Remove the dropdown arrow
    }),
  };


  return (
    <>
      <AsyncSelect
        cacheOptions
        loadOptions={fetchData}
        defaultOptions={false}
        onChange={onSearchChange}
        styles={customStyles}
      />
      <Modal isOpen={isOpen} isClose={onClose} scrollBehavior="inside">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          color="white"
          p="0.6rem"
          backgroundImage="url('https://user-images.githubusercontent.com/69129797/182023922-d7ea77b0-0619-4775-af32-5b34dbe00e8b.png')"
          backgroundSize={"cover"}
          borderRadius="20px"
          maxH="500px" maxW="550px"
          overflow="visible"
        >
          <Box
            border="3px solid #FFFFFF"
            borderRadius="20px"
            backdropFilter="blur(47.5676px)"
            bgColor="#1D1E22"
            maxH="480px" maxW="550px"
            overflow="visible"
          >
            <ModalHeader
              fontSize={isSmallerThan800 ? "1rem" : "2rem"}
              textAlign="center"
              fontWeight={1100}
            >
              shout-out to your seniors!
            </ModalHeader>
            <ModalCloseButton onClick={onClose} />
            <ModalBody
              mt="-0.5rem"
              fontSize={isSmallerThan800 ? "0.4rem" : "0.8rem"}
              textAlign="center"
              color="#B3B3B3"
              mb="1rem"
              maxH="500px" maxW="550px"
            >
              <FormControl mt={isSmallerThan800 ? "1rem" : "2rem"}>
                <Box ml={1}>ouyout

                  <FormLabel
                    cursor="pointer"
                    htmlFor="quote"
                    fontSize="16px"
                    fontWeight="600"
                  >
                    message to your senior
                  </FormLabel>
                  <Textarea
                    w="90%"
                    maxLength="140"
                    borderColor="#444"
                    size="md"
                    resize="none"
                    id="quote"
                    onChange={onSearchChange}
                    p="0.8rem"
                    placeholder="write a message to your senior here"
                    name="quote"
                  /* value={formInfo.quote} */
                  />
                  <FormHelperText
                    mt="0.4rem"
                    mb={isSmallerThan800 ? "1rem" : "2rem"}
                  >
                    {10}/140 characters used
                  </FormHelperText>
                </Box>
                <Flex justifyContent={"center"}>
                  <Button
                    disabled={isDisabled}
                    /* onClick={handleSubmit} */
                    _hover={{
                      transform: "translate(-2px, -2px)",
                      bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)",
                    }}
                    bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)"
                    fontWeight="700"
                    p="1.6rem 2rem"
                    fontSize="1.2rem"
                    colorScheme="blackAlpha"
                    onClick={clubMembers}
                  >
                    submit
                  </Button>
                </Flex>
              </FormControl>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
