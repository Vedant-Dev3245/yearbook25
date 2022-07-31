import React from 'react'
import {Box, VStack, useMediaQuery, Button} from "@chakra-ui/react"
import { ArrowForwardIcon } from '@chakra-ui/icons'


export default function OptIn(){
    
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')

    return(
        <Box color="white" w="80%" h="auto" 
            marginInline="auto" 
            bg={isSmallerThan800?"url('./images/rectangle.png')":"url('./images/back.png')"} 
            backgroundSize="cover" mt="7rem" className="physical" borderRadius="50px"
            position="relative" border="2px #B3B3B3 solid"
            mb={"2rem"}>
                <VStack
                    w="80%"
                    marginInline="auto"
                    position="relative"
                    background="url()"
                    bgPosition="center"
                    bgSize="cover"
                    spacing={5}
                    box-shadow="0px 1px 24px 1px rgba(0, 0, 0, 0.15)"
                    backdrop-filter="blur(40px)"
                    z-index="2"
                    paddingBottom="2.5rem"
                     >
                    <Box fontSize={isSmallerThan800 ? "1.6rem" : "3rem"} fontWeight="700" mt={isSmallerThan800?"3rem":"6rem"}>opt-in for the <Box display="inline" fontStyle="italic" fontFamily="EB Garamond">physical</Box> yearbook 🥂</Box>
                    <Box color="#C9C8C8" mt={isSmallerThan800 ? "-1rem" : 0} fontSize={isSmallerThan800 ? "1rem" : "1.4rem"}>get physical copy. cherish it for the years to come.</Box>
                    <Button className="phyButton" marginBottom={isSmallerThan800?"2rem !important":"6rem !important"} fontSize="1.2rem" color="black" fontWeight="700">yes, i do need yearbook irl <ArrowForwardIcon /></Button>
                    </VStack>
            </Box>
    )
}