import { Box, Flex, Text, VStack, Link, useMediaQuery } from '@chakra-ui/react'

import React from 'react'
import {FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function Footer() {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    return (
        <Box>
            <Box bg={isSmallerThan800 ? 'none' : "url('../images/Frame 47.png')"} backgroundRepeat="no-repeat" 
            backgroundSize="cover"  overflowX={isSmallerThan800 ? 'none' : "hidden"} mt={isSmallerThan800 ? '0rem' : "-8rem"}
            borderBlock={isSmallerThan800 ? 'none' : "2px solid rgba(255, 255, 255, 0.25)"}>
                <Flex flexDirection={isSmallerThan800 ? 'column' : 'row'} justifyContent="space-between" backgroundSize="cover" mt="3rem" ml="5rem" mb="2rem" mr="-7rem">
                    <VStack w="23%" alignItems="baseline" justifyContent="center">
                        <Box fontSize="3.5rem" fontWeight="700" mt="4rem" color="white">SARC</Box>
                        <Box fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3" w={isSmallerThan800 ? '300%' : "100%"}>
                            Student Alumni Relations Cell is a student body of BITS Pilani,
                            Pilani Campus working under the aegis of the Dean of Alumni
                            Relations Division. </Box>
                        <Flex justifyContent="space-between" width={isSmallerThan800?"200% !important":"50%"} align={'center'} height='20%' mt="1rem !important">
                            <Link href="https://www.facebook.com" target="_blank"><FaFacebook color='white' fontSize={"1.8rem"}/> </Link>
                            <Link href="https://www.twitter.com" target="_blank"><FaTwitter color='white' fontSize={"1.8rem"}/> </Link>
                            <Link href="https://www.linkedin.com" target="_blank"><FaLinkedin color='white' fontSize={"1.8rem"}/> </Link>
                            <Link href="https://www.instagram.com" target="_blank">  <FaInstagram color='white' fontSize={"1.8rem"}/> </Link>
                        </Flex>
    
                    </VStack>
                    <VStack alignItems="baseline" justifyContent="center">
                        <Box fontSize="1.7rem" fontWeight="700" mt="4rem" color="white">about us</Box>
                        <Box cursor="pointer" paddingTop="1rem" fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            initiatives</Box>
                        <Box cursor="pointer" fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            the podcast</Box>
                        <Box cursor="pointer" fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            gallery</Box>
                    </VStack>
                    <VStack alignItems="baseline" justifyContent="center" >
                        <Box fontSize="1.7rem" fontWeight="700" mt="4rem" color="white">quick links</Box>
                        <Box cursor="pointer" paddingTop="1rem" fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            initiatives</Box>
                        <Box cursor="pointer" fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            the podcast</Box>
                        <Box cursor="pointer" fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            gallery</Box>
                    </VStack>
                    <VStack alignItems="baseline" justifyContent="center">
                        <Box id="contact" fontSize="1.7rem" fontWeight="700" mt="4rem" mb="0.4rem" color="white">connect w/ us</Box>
                        <Box fontSize="1rem" fontWeight="600" color="#B3B3B3" w="60%" position="relative" top="0.6rem" >
                            follow us on social media to receive regular updates</Box>
                        <Box cursor="pointer" border="1px solid #C9C9C9" bgColor="#151515" color="white" padding="0.5rem 1.5rem" borderRadius="0.5rem" w="fit-content" fontWeight={"600"} >need help ?</Box>
                    </VStack>
                </Flex>
            </Box>
            <Box paddingBlock="1rem" color="#B3B3B3" marginInline="auto" w="100%" textAlign="center">© copyright <Text display="inline" fontWeight="800">SARC</Text> · all rights reserved</Box>
        </Box>
    )
}
