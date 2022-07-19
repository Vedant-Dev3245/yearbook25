import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import React from 'react'

export default function Footer() {

    return (
        <>
            <Box color="white" w="80%" marginInline="auto" bg="url('../images/physicalBg.png')" backgroundSize="cover" position='relative' mt="7rem">
                <VStack
                    w="80%"
                    marginInline="auto"
                    position="relative"
                    background="url()"
                    bgPosition="center"
                    bgSize="cover"
                    spacing={10}
                    box-shadow="0px 1px 24px 1px rgba(0, 0, 0, 0.15)"
                    backdrop-filter="blur(40px)"
                    z-index="2"
                    border-radius="50px" >
                    <Box fontSize="3rem" fontWeight="700" mt="6rem">opt-in for the <Box display="inline" fontStyle="italic" fontFamily="EB Garamond">physical</Box> yearbook 🥂</Box>
                    <Box color="#C9C8C8" fontSize="1.4rem">get physical copy. cherish it for the years to come.</Box>
                    <Button marginBottom="6rem !important" fontSize="1.2rem" color="black" fontWeight="700">yes, i do need yearbook irl <ArrowForwardIcon />
                    </Button>
                </VStack>
            </Box>
            <Box bg="url('../images/Group.png')" overflowX="hidden" mt="-8rem" borderBlock="2px solid rgba(255, 255, 255, 0.25)">
                <Flex justifyContent="space-between" backgroundSize="cover" h="20rem" mt="4rem" ml="4rem">
                    <VStack w="20%" alignItems="baseline" justifyContent="center">
                        <Box fontSize="3.5rem" fontWeight="700" mt="4rem" color="white">SARC</Box>
                        <Box fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3" w='100%'>
                            Student Alumni Relations Cell is a student body of BITS Pilani,
                            Pilani Campus working under the aegis of the Dean of Alumni
                            Relations Division. </Box>
                    </VStack>
                    <VStack alignItems="baseline" justifyContent="center">
                        <Box fontSize="1.7rem" fontWeight="700" mt="4rem" color="white">about us</Box>
                        <Box fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            initiatives</Box>
                        <Box fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            the podcast</Box>
                        <Box fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            gallery</Box>
                    </VStack>
                    <VStack alignItems="baseline" justifyContent="center">
                        <Box fontSize="1.7rem" fontWeight="700" mt="4rem" color="white">quick links</Box>
                        <Box fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            initiatives</Box>
                        <Box fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            the podcast</Box>
                        <Box fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            gallery</Box>
                    </VStack>
                    <VStack alignItems="baseline" justifyContent="center">
                        <Box fontSize="1.7rem" fontWeight="700" mt="4rem" color="white">connect w/ us</Box>
                        <Box fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3" w="60%">
                            follow us on social media to receive regular updates</Box>
                        <Flex>

                        </Flex>

                    </VStack>
                </Flex>
            </Box>
            <Box marginBlock="1rem" color="#B3B3B3" marginInline="auto" w="100%" textAlign="center">© copyright <Text display = "inline" fontWeight="800">SARC</Text> · all rights reserved</Box>
        </>
    )
}