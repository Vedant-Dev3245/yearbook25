import React, { useState } from 'react';
import {
    Box,
    Flex,
    Image,
    Text,
    VStack,
    useMediaQuery
} from '@chakra-ui/react';
import { Search2Icon } from "@chakra-ui/icons";
import { HiMiniUserGroup } from "react-icons/hi2";
import Search from "./Search"
export default function ClubCards(props) {
    const [selectedOption, setSelectedOption] = useState('');
    const [isSmallerThan800] = useMediaQuery('(max-width: 800px)')
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box mt="5rem">
            <Box position="relative">
                <Image
                    src={props.imgUrl}
                    alt={props.commitment}
                    borderRadius="full"
                    boxSize="140px"
                    position="absolute"
                    top="-70px"
                    left="23%"
                    transform="translateX(-50%)"
                    border="6px solid rgba(88, 92, 158, 0.65)"
                    backdropFilter="blur(2px)"
                    fill="#100B18"
                    strokeWidth="4px"
                    stroke="#4D528C"
                />
            </Box>
            <Box
                borderWidth="1px"
                borderRadius="24px"
                overflow="hidden"
                p={4}
                position="relative"
                h="320"
                boxShadow="2px 2px 2px rgb(255, 255, 255, 0.2)"
                border="solid 1px rgb(255, 255, 255, 0.1)"
                fill="#100B18"
            >
                <VStack mt={12} alignItems="flex-start" ml={6}>
                    <Box fontSize="40px" fontWeight="bold" mt={4}>
                        <Text> 
                            {props.commitment}
                        </Text>
                    </Box>
                    {/* <Select
                        placeholder="Select option"
                        value={selectedOption}
                        onChange={handleSelectChange}
                    >
                        {dropdownOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </Select> */}
                    <Flex position="absolute" top="70%" className="searchIcon" borderRadius={"0.4rem"} w={isSmallerThan800 ? "80%" : "80%"} border="0.968254px solid #575757" p={isSmallerThan800 ? "0.4rem 0.8rem" : "0.4rem 1rem"} justifyContent={"flex-start"} alignItems="center"><Search2Icon color='#B3B3B3' fontSize="1rem" /> <Search />  </Flex>
                    <Flex
                    position="absolute"
                    top="20px"
                    right="40px"
                    display="flex"
                    gridGap="10px"
                    alignItems="center">
                        <HiMiniUserGroup
                            filter="drop-shadow(0px 0px 15px #2094FF)"
                            color="#2094FF"
                            fontSize="1.2rem"
                        />
                        <Text fontWeight={700} >
                            {props.seniorOptions.length} member{props.seniorOptions.length > 1 ? "s" : ""}
                        </Text>
                    </Flex>
                </VStack>
            </Box>
        </Box>
    );
};
