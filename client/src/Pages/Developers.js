import React from 'react';
import { useNavigate } from "react-router-dom"
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Devs from '../Components/Devs';
import {Box, Text, VStack} from '@chakra-ui/react';



export default function Devleopers(){
    return(
        <Box overflowX="hidden"
        bg="#141414"
        className="noselect landing">
            <Navbar />
            <Box w="80%" marginInline="auto" pb="4rem" mt="7rem" mb="10rem">
            <VStack spacing="1rem" marginInline="auto" >
                <Text fontWeight={800} fontSize="4rem" color="white">hope you liked it 🌱</Text>
                <Text fontWeight={600} fontSize="1.2rem" color="#B3B3B3" 
                w="45%" mb="3rem !important" align="center">
                    hey let's make something good for the graduating batch
                    and idk why are you so free and reading this lol jk have fun
                </Text>
                <Devs />
            </VStack>
            </Box>
            <Footer />
        </Box>

    )
}