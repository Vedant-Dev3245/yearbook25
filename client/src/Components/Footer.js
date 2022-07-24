import { Box, Button, Flex, Text, VStack, Image, Link, useMediaQuery } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import React from 'react'

export default function Footer() {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    return (
        <Box >
            <Box color="white" w="80%" h="auto" 
            marginInline="auto" 
            bg={isSmallerThan800?"url('../images/rectangle.png')":"url('../images/walkBg.png')"} 
            backgroundSize="cover" mt="7rem" className="physical" 
            position="relative" 
            borderRadius={60} border="2px #B3B3B3 solid"
            mb={100}>
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
                    border-radius="50px" >
                    <Box fontSize={isSmallerThan800 ? "1.6rem" : "3rem"} fontWeight="700" mt={isSmallerThan800?"3rem":"6rem"}>opt-in for the <Box display="inline" fontStyle="italic" fontFamily="EB Garamond">physical</Box> yearbook 🥂</Box>
                    <Box color="#C9C8C8" mt={isSmallerThan800 ? "-1rem" : 0} fontSize={isSmallerThan800 ? "1rem" : "1.4rem"}>get physical copy. cherish it for the years to come.</Box>
                    <Button className="phyButton" marginBottom={isSmallerThan800?"2rem !important":"6rem !important"} fontSize="1.2rem" color="black" fontWeight="700">yes, i do need yearbook irl <ArrowForwardIcon />
                    </Button>
                </VStack>
            </Box>

            <Box bg={isSmallerThan800 ? 'none' : "url('../images/Group.png')"} overflowX={isSmallerThan800 ? 'none' : "hidden"} mt="-8rem" borderBlock={isSmallerThan800 ? 'none' : "2px solid rgba(255, 255, 255, 0.25)"}>
                <Flex flexDirection={isSmallerThan800 ? 'column' : 'row'} justifyContent="space-between" backgroundSize="cover" h="20rem" mt="4rem" ml="4rem" mb="2rem">
                    <VStack w="20%" alignItems="baseline" justifyContent="center">
                        <Box fontSize="3.5rem" fontWeight="700" mt="4rem" color="white">SARC</Box>
                        <Box fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3" w={isSmallerThan800 ? '300%' : "100%"}>
                            Student Alumni Relations Cell is a student body of BITS Pilani,
                            Pilani Campus working under the aegis of the Dean of Alumni
                            Relations Division. </Box>
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
                    <VStack alignItems="baseline" justifyContent="center" display={isSmallerThan800 ? 'none' : 'flex'}>
                        <Box fontSize="1.7rem" fontWeight="700" mt="4rem" color="white">quick links</Box>
                        <Box cursor="pointer" paddingTop="1rem" fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            initiatives</Box>
                        <Box cursor="pointer" fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            the podcast</Box>
                        <Box cursor="pointer" fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3">
                            gallery</Box>
                    </VStack>
                    <VStack alignItems="baseline" justifyContent="center">
                        <Box id="contact" fontSize="1.7rem" fontWeight="700" mt="4rem" color="white">connect w/ us</Box>
                        <Box paddingTop="1rem" fontSize="1rem" fontWeight="600" mt="4rem" color="#B3B3B3" w="60%">
                            follow us on social media to receive regular updates</Box>

                        <Flex justifyContent="space-between" width="50%" align={'center'} height='10%'>
                            <Link href="https://www.facebook.com" target="_blank"><Image cursor="pointer" src="../images/facebook.png" /></Link>
                            <Link href="https://www.twitter.com" target="_blank"><Image cursor="pointer" src="../images/twitter.png" /></Link>
                            <Link href="https://www.linkedin.com" target="_blank"><Image cursor="pointer" src="../images/linkedin.png" /></Link>
                            <Link href="https://www.instagram.com" target="_blank">  <Image cursor="pointer" src="../images/insta.png" /></Link>
                        </Flex>
                    </VStack>
                </Flex>
            </Box>
            <Box marginBlock="1rem" color="#B3B3B3" marginInline="auto" w="100%" textAlign="center">© copyright <Text display="inline" fontWeight="800">SARC</Text> · all rights reserved</Box>
        </Box>
    )
}
