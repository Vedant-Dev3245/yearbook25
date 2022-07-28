import { Box, Input, Text,useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import SearchNom from "./SearchNom"

export default function Nominate(props) {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px')
    return (
        <Box w="90%" marginInline="auto" pb="4rem">
            <Box fontSize={isSmallerThan800 ? "2rem" : "3rem"} fontWeight="800">invite your <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">frens</Text> to write caption for you</Box>
            <Text color="#B3B3B3" fontSize="1.2rem" w={isSmallerThan800 ? "90%" : "50%"} mt="0.5rem">the credit score checker allows you to calculate your credit score report and cibil score. it is a three-digit numeric expression that represents your creditworthiness.</Text>
            <SearchNom name = {props.name}/>
           
        </Box>
    )
}


