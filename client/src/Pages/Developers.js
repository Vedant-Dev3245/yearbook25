import React from 'react';
import { useNavigate } from "react-router-dom"
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Devs from '../Components/Devs';
import {Box, Text, VStack, useMediaQuery} from '@chakra-ui/react';



export default function Devleopers(){
	const [isSmallerThan800] = useMediaQuery('(max-width:800px)')

    return(
        <Box overflowX="hidden"
        bg="#141414"
        className="noselect landing">
            <Navbar />
            <Box w="80%" marginInline="auto" pb="4rem" mt="7rem" mb="5rem">
            <VStack spacing="1rem" marginInline="auto" >
                <Text fontWeight={800} fontSize={isSmallerThan800?"2rem":"4rem"} color="white">
                    hope you liked it 🌱</Text>
                <Text fontWeight={600} fontSize="1.2rem" color="#B3B3B3" 
                w={isSmallerThan800?"70%":"45%"} mb="3rem !important" align="center">
                    hey let's make something good for the graduating batch
                </Text>
                <Devs />
            </VStack>
            </Box>
            <Footer />
        </Box>

    )
}