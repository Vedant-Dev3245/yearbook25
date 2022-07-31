import React from "react";
import { useNavigate } from "react-router-dom"
import { VStack, Box, Text, Image, Flex, useMediaQuery, Button } from "@chakra-ui/react";
export default function Hero() {

    const [isSmallerThan900] = useMediaQuery('(max-width:800px)')
    const [loggedIn, setLoggedIn] = React.useState(false)
    const navigate = useNavigate()
    if (localStorage.getItem("user") !== null && !loggedIn) {
		setLoggedIn(true)
	}
    function gotoprofile() {
		console.log(localStorage.getItem("user"))
		navigate(`/profile/${localStorage.getItem("user")}`)
	}
    return (
        <Box mt="3rem" className="pad">
            <Flex justifyContent="space-between" alignItems="center" mt={isSmallerThan900 ? "3rem" : 0} flexDirection={isSmallerThan900?"column":"row"}>
                <VStack ml="1rem" width={isSmallerThan900 ? '80%' : '41%'} spacing={4} alignItems={isSmallerThan900 ? 'center' : 'baseline'}>
                    <Text fontSize={isSmallerThan900 ? '3rem' : '4rem'} color="white" lineHeight={1.3} fontWeight={800} bgClip="linear(to-l, #7928CA, #FF0080)" textAlign={isSmallerThan900 ? "center" : "left"} >
                        let's make the <Text display="inline" bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%);" bgClip="text">yearbook</Text> fun this time <Image display={'inline'} height={59} src="../images/hourglass-not-done_23f3.png"></Image></Text>
                    <Text textAlign={isSmallerThan900 ? "center" : "left"} mt="1rem" fontWeight="600" lineHeight={isSmallerThan900 ? '1.3rem' : '1.5rem'} fontSize={isSmallerThan900 ? '1.1rem' : '1.2rem'} color="#B3B3B3">hey let's make something good for the graduating batch and idk why are you so free and reading this lol jk have fun</Text>
                    {loggedIn&& isSmallerThan900 ?
						<Button onClick={gotoprofile} mr={10} bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%);"  _hover={{ transform: "translate(-2px, -2px)" , bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" }}>
							<Text fontSize="s" fontWeight="700" color="white" p={4}>Profile</Text>
						</Button>
						: <Box id="signInDiv" p={2} mr={10}></Box>}
                    <Flex mt="3rem !important" color="white" width={isSmallerThan900 ? '100%' : '60%'} flexDirection="column">
                        <Flex justifyContent="space-between" textAlign="left" display={isSmallerThan900?"none":"flex"}>
                            <Box w="70%" mr={isSmallerThan900 ? '1.4rem' : 0}>
                                <Text fontSize={isSmallerThan900 ? '1.3rem' : '2.8rem'} fontWeight="800">5.3k+</Text>
                                <Text mt="-0.5rem" fontSize={isSmallerThan900 ? '0.8rem' : '0.9rem'} color="#B3B3B3" fontWeight="500">captions</Text>
                            </Box>
                            <Box w="70%">
                                <Text fontSize={isSmallerThan900 ? '1.3rem' : '2.8rem'} fontWeight="800">486</Text>
                                <Text mt="-0.5rem" fontSize={isSmallerThan900 ? '0.8rem' : '0.9rem'} color="#B3B3B3" fontWeight="500">yearbook quotes</Text>
                            </Box>
                        </Flex>
                        <Image pointerEvents={'none'} src="../images/Ellipse 9.png" alt="ellipse" position="absolute" left="-3rem" top="40rem" />
                        <Flex justifyContent="space-between" textAlign="left" display={isSmallerThan900?"none":"flex"} >
                            <Box w="70%" mr={isSmallerThan900 ? '1.4rem' : 0}>
                                <Text fontSize={isSmallerThan900 ? '1.3rem' : '2.8rem'} fontWeight="800">4.2</Text>
                                <Text mt="-0.5rem" fontSize={isSmallerThan900 ? '0.8rem' : '0.9rem'} color="#B3B3B3" fontWeight="500">branches</Text>
                            </Box>
                            <Box w="70%">
                                <Text fontSize={isSmallerThan900 ? '1.3rem' : '2.8rem'} fontWeight="800">250k+</Text>
                                <Text mt="-0.5rem" fontSize={isSmallerThan900 ? '0.8rem' : '0.9rem'} color="#B3B3B3" fontWeight="500">visits in past 30 days</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </VStack>
                <Box ml={isSmallerThan900 ? '-1.3rem' : 0}>
                    <Box position="relative" className="clockTower" w="90%" ml={isSmallerThan900 ? "auto" : "0"} mt={isSmallerThan900 ? "3rem" : 0} >
                        <Box className="floatText" bg="rgba(216, 66, 34, 0.25);" p="1rem" color="#B3B3B3" borderRadius="20px" border="2px solid rgba(216, 66, 34, 0.25);" backdropFilter="blur(4px)" boxShadow="0px 0.685535px 16.4528px 0.685535px rgba(0, 0, 0, 0.15)" position="absolute" w={isSmallerThan900 ? '10rem' : '16rem'} top={isSmallerThan900 ? '-1rem' : '7rem'} left={isSmallerThan900?"-1rem":"-4rem"}>
                            <Text fontSize="0.9rem">love for pharma grills
                                never die. snaps</Text>
                            <Text textAlign="right">~amrit</Text></Box>
                        <Box className="floatText" bg="rgba(69, 81, 255, 0.25);" p="1rem" color="#B3B3B3" borderRadius="20px" border="2px solid rgba(69, 81, 255, 0.25);" backdropFilter="blur(4px)" boxShadow="0px 0.58805px 14.1132px 0.58805px rgba(69, 81, 255, 0.25);" position="absolute" w={isSmallerThan900 ? '8rem' : '20rem'} top={isSmallerThan900 ? '-3rem' : '32rem'} left= {isSmallerThan900 ? '11rem' : '12rem'} >
                            <Text fontSize="0.9rem">“hey let’s make it please something
                                good for the graduating”</Text>
                            <Text textAlign="right">~amrit</Text>
                        </Box>
                        <Box className="floatText" bg="rgba(255, 198, 45, 0.15);" p="1rem" color="#B3B3B3" borderRadius="20px" border="2px solid rgba(255, 198, 45, 0.25);" backdropFilter="blur(4px)" boxShadow="0px 0.58805px 14.1132px 0.58805px rgba(255, 198, 45, 0.25);" position="absolute" w={isSmallerThan900 ? '10rem' : '15rem'} top={isSmallerThan900 ? '12rem' : '3rem'} left={isSmallerThan900 ? '11rem' : '22rem'}>
                            <Text fontSize="0.9rem">“hey let’s make something
                                good for the graduating
                                batch and idk why are
                                you so free and reading
                                this lol jk have fun”</Text>
                            <Text textAlign="right">~bakshi</Text>
                        </Box>
                        <Box className="floatText" bg="rgba(32, 148, 255, 0.5);" p="1rem" color="#B3B3B3" borderRadius="20px" border="2px solid rgba(32, 148, 255, 0.25);" backdropFilter="blur(4px)" boxShadow="0px 0.58805px 14.1132px 0.58805px rgba(32, 148, 255, 0.25);" position="absolute" w={isSmallerThan900 ? '10rem' : '15rem'} top={isSmallerThan900 ? '20rem' : '28rem'} left={isSmallerThan900 ? '0rem' : '-5rem'}>
                            <Text fontSize="0.9rem">hey let’s make it
                                please something
                                graduating batch and
                                idk why are you</Text>
                            <Text textAlign="right">~bakshi</Text>
                        </Box>
                        <Image pointerEvents={'none'} src="../images/Ellipse 8.png" alt="ellipse" position="absolute" left="27rem" top="10rem" />
                        <Image pointerEvents={'none'} w="90%" src="../images/clock.png" alt="yearbook" p={isSmallerThan900 ? 0 : '2rem'}/>
                    </Box>
                </Box>
            </Flex >
        </Box >
    )
}
