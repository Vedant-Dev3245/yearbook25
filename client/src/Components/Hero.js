import React from "react";
import { VStack, Box, Grid, Text, Image, Flex, HStack, useMediaQuery } from "@chakra-ui/react";
export default function Hero() {
    const [isSmallerThan900] = useMediaQuery('(max-width:900px)')
    return (
        <Box mt="7rem" className="pad">
            <Flex justifyContent="space-between" alignItems="center">
                <VStack ml="1rem" width="40%" spacing={4} alignItems="baseline">
                    <Text fontSize={isSmallerThan900 ? '2.4rem' : '5rem'} color="white" lineHeight={1.3} fontWeight={800} bgClip="linear(to-l, #7928CA, #FF0080)">
                        let's make the <Text display="inline" bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%);" bgClip="text">yearbook</Text> fun this time ⌛️</Text>
                    <Text mt="1rem" fontWeight="600" lineHeight="2rem" fontSize={isSmallerThan900 ? '1rem' : '1.4rem'} color="#B3B3B3">hey let's make something good for the graduating batch and idk why are you so free and reading this lol jk have fun</Text>
                    <Flex mt="3rem !important" color="white" width="60%" flexDirection="column">
                        <Flex justifyContent="space-between" textAlign="left">
                            <Box>
                                <Text fontSize="3rem" fontWeight="800">5.3k+</Text>
                                <Text mt="-0.5rem" color="#B3B3B3" >captions</Text>
                            </Box>
                            <Box>
                                <Text fontSize="3rem" fontWeight="800">486</Text>
                                <Text mt="-0.5rem" color="#B3B3B3" >yearbook quotes</Text>
                            </Box>
                        </Flex>
                        <Image src="../images/Ellipse 9.png" alt="ellipse" position="absolute" left="-3rem" top="40rem" />
                        <Flex justifyContent="space-between" textAlign="left">
                            <Box>
                                <Text fontSize="3rem" fontWeight="800">4.2</Text>
                                <Text mt="-0.5rem" color="#B3B3B3" >branches</Text>
                            </Box>
                            <Box>
                                <Text fontSize="3rem" fontWeight="800">250k+</Text>
                                <Text mt="-0.5rem" color="#B3B3B3" >visits in past 30d</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </VStack>
                <Box>
                    <Box position="relative" className="clockTower" mr="4rem" >
                        <Box bg="rgba(216, 66, 34, 0.25);" p="1rem" color="#B3B3B3" borderRadius="20px" border="2px solid rgba(216, 66, 34, 0.25);" backdropFilter="blur(4px)" boxShadow="0px 0.685535px 16.4528px 0.685535px rgba(0, 0, 0, 0.15)" position="absolute" w="16rem" top="10rem" left="-2rem">
                            <Text>love for pharma grills </Text>
                            <Text> never die. snaps</Text>
                            <Text textAlign="right">~amrit</Text></Box>
                        <Box bg="rgba(69, 81, 255, 0.25);" p="1rem" color="#B3B3B3" borderRadius="20px" border="2px solid rgba(69, 81, 255, 0.25);" backdropFilter="blur(4px)" boxShadow="0px 0.58805px 14.1132px 0.58805px rgba(69, 81, 255, 0.25);" position="absolute" w="20rem" top="35rem" left="20rem" >
                            <Text >“hey let’s make it please something</Text>
                            <Text> good for the graduating”</Text>
                            <Text textAlign="right">~amrit</Text></Box>
                        <Box bg="rgba(255, 198, 45, 0.15);" p="1rem" color="#B3B3B3" borderRadius="20px" border="2px solid rgba(255, 198, 45, 0.25);" backdropFilter="blur(4px)" boxShadow="0px 0.58805px 14.1132px 0.58805px rgba(255, 198, 45, 0.25);" position="absolute" w="16rem" top="4rem" left="25rem">
                            <Text>“hey let’s make something </Text>
                            <Text> good for the graduating</Text>
                            <Text> batch and idk why are</Text>
                            <Text> you so free and reading</Text>
                            <Text> this lol jk have fun”</Text>
                            <Text textAlign="right">~bakshi</Text></Box>
                        <Box bg="rgba(32, 148, 255, 0.5);" p="1rem" color="#B3B3B3" borderRadius="20px" border="2px solid rgba(32, 148, 255, 0.25);" backdropFilter="blur(4px)" boxShadow="0px 0.58805px 14.1132px 0.58805px rgba(32, 148, 255, 0.25);" position="absolute" w="16rem" top="30rem" left="-5rem">
                            <Text >hey let’s make it
                                please something
                                graduating batch and
                                idk why are you</Text>
                                   <Text texAlign = "right">~bakshi</Text>
                        </Box>
                        <Image src="../images/Ellipse 8.png" alt="ellipse" position="absolute" left="27rem" top="10rem" />
                        <Image w="100%" ml={isSmallerThan900 ? '4rem' : '-1rem'} src="../images/Clock.png" alt="yearbook" p={isSmallerThan900 ? 0 : '2rem'} />
                    </Box>
                </Box>
            </Flex >
        </Box >
    )
}
