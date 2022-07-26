import { Box, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import NominateCard from "./NominateCard"

export default function Nominate(props){
    const nominateArray = props.nominatedBy;

    const cards = Array.from(nominateArray).map(person => {
        return <NominateCard name={person.name.toLowerCase()} key={person.id} id={person.id}/>
    })
    
    return(
        <Box width="90%" marginInline="auto" >
             <Box fontSize="3rem" fontWeight="800">damnn... {nominateArray.length-1}+ pending  <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">captions</Text></Box>
            <Text color="#B3B3B3" fontSize="1.2rem" w="50%" mt="0.5rem">the credit score checker allows you to calculate your credit score report and cibil score. it is a three-digit numeric expression that represents your creditworthiness.</Text>
            <Flex width={"80%"} flexWrap="wrap" mt="4rem" pb="4rem">
            {cards}
            </Flex>
        </Box>)
}