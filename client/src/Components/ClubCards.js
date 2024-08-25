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
import { FaUsers } from "react-icons/fa";
import Search from "./Search"
export default function ClubCards(props) {
    const [selectedOption, setSelectedOption] = useState('');
    const [isSmallerThan800] = useMediaQuery('(max-width: 800px)')
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box
            mt="5rem"
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25), 24px 27px 22.2px 0px rgba(0, 0, 0, 0.40)"
            mix-blend-mode="overlay"
            borderRadius="24px"
            border="solid 1px rgb(255, 255, 255, 0.1)"
            opacity="0.6"
            background="url(../images/clubcardsbg.png)"
            backgroundSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            align="center"
            justify="center"

        >
            <Box
                position="relative"
            >
                {/* <Image
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
                    stroke="#FFF"
                /> */}
                <Box
                    position="absolute"
                    top="-70px"
                    left="24%"
                    transform="translateX(-50%)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 130 130" fill="none">
                        <circle cx="65" cy="65" r="63" fill="#100B18" stroke="url(#paint0_linear_124_195)" stroke-width="4" />
                        <defs>
                            <linearGradient id="paint0_linear_124_195" x1="65" y1="4" x2="65" y2="126" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white" />
                                <stop offset="0.354" stop-color="#4D528C" />
                                <stop offset="1" stop-color="#0C1117" />
                            </linearGradient>
                        </defs>
                    </svg>
                </Box>
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
                    <Box fontSize="40px" fontWeight="bold" mt={4} text-align="center">
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
                    <Flex position="absolute" top="70%" className="searchIcon" backdropFilter="blur(20px)" borderRadius={"0.6rem"} w={isSmallerThan800 ? "80%" : "80%"} border="1px solid #FFF" p={isSmallerThan800 ? "0.4rem 0.8rem" : "0.4rem 1rem"} justifyContent={"flex-start"} alignItems="center" boxShadow="0px 1px 24px 1px rgba(0, 0, 0, 0.15)"><Search2Icon color='#B3B3B3' fontSize="1rem" /> <Search />  </Flex>
                    <Flex
                        position="absolute"
                        top="20px"
                        right="40px"
                        display="flex"
                        gridGap="10px"
                        alignItems="center">  
                        <FaUsers
                            filter="drop-shadow(0px 0px 15px #2094FF)"
                            color="#DAE6FF"
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
