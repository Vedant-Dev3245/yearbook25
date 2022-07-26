import { Box, Input, Text } from '@chakra-ui/react'
import React from 'react'
import Search from "./Search"

export default function Nominate() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    return (
        <Box w="90%" marginInline="auto" pb="4rem">
            <Box fontSize="3rem" fontWeight="800">invite your <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">frens</Text> to write caption for you</Box>
            <Text color="#B3B3B3" fontSize="1.2rem" w="50%" mt="0.5rem">the credit score checker allows you to calculate your credit score report and cibil score. it is a three-digit numeric expression that represents your creditworthiness.</Text>
            <Text mt="3rem" mb="1rem" fontSize="1.5rem" fontWeight="800">name</Text>
            <Box w="40%"><Search/></Box>
            <Text mt="2rem" fontSize="1.5rem" fontWeight="800">bitsid</Text>
            <Input disabled marginBlock="1rem" p="1.2rem" w="40%" border="1px solid #6C6C6C !important"/>
            <Box cursor="pointer" mt="2rem" border="1px solid #C9C9C9" bgColor="rgba(255, 255, 255, 0.1)" padding="0.5rem 1.5rem" borderRadius="2rem" w="fit-content" fontWeight={"600"}>Nominate</Box>
           
        </Box>
    )
}


