import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ChevronLeftIcon, Search2Icon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom"

import Search from "./Search"
export default function ProfileNav(props) {

    // const reader = new FileReader();
    // reader.onload = function (event) {
    //     console.log(event.target.result); // the CSV content as string
    //   };
    // const file = readTextFile()
    //   reader.readAsText(file);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    
    // const options = props.options
    // console.log(options)

    const navigate = useNavigate()
    function backHome(){
        navigate('/')        
    }
    return (
        <Box borderBottom="1px solid rgba(255, 255, 255, 0.25)" pb="10rem" pt="3rem" bg="url(./images/profBg.png)" bgSize="cover" bgPosition="center">
            <Flex className="navProf" alignItems="center" w="90%" marginInline="auto" p="1.2rem 1rem" justifyContent="space-between" position="relative" zIndex="2" >
                <Flex alignItems={"center"}>
                <Button _hover={{"color" : "black", "background-color": "#B3B3B3"}} onClick={backHome} bg = "transparent" fontSize="2rem" p="0.2rem"> <ChevronLeftIcon/></Button>
                <Text fontSize="2rem" ml="1.2rem" fontWeight="700">SARC</Text>
                </Flex>
                <Flex className="searchIcon" borderRadius={"0.4rem"} w="20%" border ="0.968254px solid #575757" p="0.4rem 1rem" justifyContent={"flex-start"} alignItems="center"><Search2Icon color='#B3B3B3' fontSize="1rem" /> <Search/>  </Flex>
                
            </Flex>
        </Box>
    )
}