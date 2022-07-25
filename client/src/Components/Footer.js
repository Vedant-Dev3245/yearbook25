import { Box, Flex, Text, VStack, Image, Link, useMediaQuery } from '@chakra-ui/react'

import React from 'react'

export default function Footer() {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    return (
        <Box >
            <Box bg={isSmallerThan800 ? 'none' : "url('../images/Group.png')"} overflowX={isSmallerThan800 ? 'none' : "hidden"} mt="-8rem" borderBlock={isSmallerThan800 ? 'none' : "2px solid rgba(255, 255, 255, 0.25)"}>
                <Flex flexDirection={isSmallerThan800 ? 'column' : 'row'} justifyContent="space-between" backgroundSize="cover" mt="4rem" ml="4rem" mb="2rem">
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
            <Box paddingBlock="1rem" color="#B3B3B3" marginInline="auto" w="100%" textAlign="center">© copyright <Text display="inline" fontWeight="800">SARC</Text> · all rights reserved</Box>
        </Box>
    )
}
