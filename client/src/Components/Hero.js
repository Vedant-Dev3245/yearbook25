import React from "react";
import { useNavigate } from "react-router-dom"
import { VStack, Box, Text, Image, Flex, useMediaQuery, Button } from "@chakra-ui/react";
export default function Hero() {

    const [isSmallerThan900] = useMediaQuery('(max-width:900px)')
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
        <Box mt="2rem" className="pad">
            <Flex justifyContent="space-between" alignItems="center" mt={isSmallerThan900 ? "2rem" : 0} flexDirection={isSmallerThan900?"column":"row"}>
                <VStack ml="1rem" width={isSmallerThan900 ? '90%' : '41%'} spacing={4} alignItems={isSmallerThan900 ? 'center' : 'baseline'}>
                    <Text fontSize={isSmallerThan900 ? '2.5rem' : '4rem'} color="white" lineHeight={isSmallerThan900?1.1:1.3} fontWeight={800} bgClip="linear(to-l, #7928CA, #FF0080)" textAlign={isSmallerThan900 ? "center" : "left"} >
                        let's make the <Text display="inline" bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%);" bgClip="text">yearbook</Text> fun <br/> this time <Image display={'inline'} height={isSmallerThan900?35:59} src="../images/hourglass-not-done_23f3.png"></Image></Text>
                    <Text textAlign={isSmallerThan900 ? "center" : "left"} mt={isSmallerThan900?"2rem !important":"1rem"} fontWeight="600" lineHeight={isSmallerThan900 ? '1.3rem' : '1.5rem'} fontSize={isSmallerThan900 ? '0.9rem' : '1.2rem'} color="#B3B3B3">hey let's make something good for the graduating batch and idk why are you so free and reading this lol jk have fun</Text>
                    {loggedIn&& isSmallerThan900 ?
						<Button onClick={gotoprofile} mr={10} bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%);"  _hover={{ transform: "translate(-2px, -2px)" , bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" }}>
							<Text fontSize="s" fontWeight="700" color="white" p={4}>Profile</Text>
						</Button>
						: <Box id="signInDiv2" p={2} mr={10} display={isSmallerThan900 ? "block !important" : "none"}></Box>}
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
                                <Text fontSize={isSmallerThan900 ? '1.3rem' : '2.8rem'} fontWeight="800">42</Text>
                                <Text mt="-0.5rem" fontSize={isSmallerThan900 ? '0.8rem' : '0.9rem'} color="#B3B3B3" fontWeight="500">branches</Text>
                            </Box>
                            <Box w="70%">
                                <Text fontSize={isSmallerThan900 ? '1.3rem' : '2.8rem'} fontWeight="800">250k+</Text>
                                <Text mt="-0.5rem" fontSize={isSmallerThan900 ? '0.8rem' : '0.9rem'} color="#B3B3B3" fontWeight="500">visits in past 30 days</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </VStack>
                <Box marginInline={isSmallerThan900 ? "auto" : "0rem" }>
                    <Box position="relative" className="clockTower" w={isSmallerThan900 ? "100%" : "80%"} marginInline={isSmallerThan900 ? "auto" : "0"} mt={isSmallerThan900 ? "1rem" : 0} >
                        <Box className="floatText" bg="rgba(216, 66, 34, 0.25);" fontSize={isSmallerThan900 ? "0.5rem" : "0.8rem"} p={isSmallerThan900 ? "0.2rem" : "0.8rem"} fontWeight="600"  color="#B3B3B3" borderRadius="20px" border="2px solid rgba(216, 66, 34, 0.25);" backdropFilter="blur(4px)" boxShadow="0px 0.685535px 16.4528px 0.685535px rgba(0, 0, 0, 0.15)" position="absolute" w={isSmallerThan900 ? '10rem' : '16rem'} top={isSmallerThan900 ? '-1rem' : '7rem'} left={isSmallerThan900?"-1rem":"-4rem"}>
                            <Text>love for pharma grills
                                never die. snaps</Text>
                            <Text textAlign="right">~amrit</Text></Box>
                        <Box className="floatText" bg="rgba(69, 81, 255, 0.25);" fontSize={isSmallerThan900 ? "0.5rem" : "0.8rem"} p={isSmallerThan900 ? "0.2rem" : "0.8rem"} fontWeight="600"  color="#B3B3B3" borderRadius="20px" border="2px solid rgba(69, 81, 255, 0.25);" backdropFilter="blur(4px)" boxShadow="0px 0.58805px 14.1132px 0.58805px rgba(69, 81, 255, 0.25);" position="absolute" w={isSmallerThan900 ? '8rem' : '16rem'} top={isSmallerThan900 ? '2rem' : '22rem'} left= {isSmallerThan900 ? '13rem' : '20rem'} >
                            <Text >“hey let’s make it please something
                                good for the graduating”</Text>
                            <Text textAlign="right">~amrit</Text>
                        </Box>
                        <Box className="floatText" bg="rgba(255, 198, 45, 0.15);" fontSize={isSmallerThan900 ? "0.5rem" : "0.8rem"} p={isSmallerThan900 ? "0.2rem" : "0.8rem"} fontWeight="600"  color="#B3B3B3" borderRadius="20px" border="2px solid rgba(255, 198, 45, 0.25);" backdropFilter="blur(4px)" boxShadow="0px 0.58805px 14.1132px 0.58805px rgba(255, 198, 45, 0.25);" position="absolute" w={isSmallerThan900 ? '10rem' : '15rem'} top={isSmallerThan900 ? '14rem' : '3rem'} left={isSmallerThan900 ? '12rem' : '22rem'}>
                            <Text >“hey let’s make something
                                good for the graduating
                                batch and idk why are
                                you so free and reading
                                this lol jk have fun”</Text>
                            <Text textAlign="right">~bakshi</Text>
                        </Box>
                        <Box className="floatText" bg="rgba(32, 148, 255, 0.5);" fontSize={isSmallerThan900 ? "0.5rem" : "0.8rem"} p={isSmallerThan900 ? "0.2rem" : "0.8rem"} fontWeight="600"  color="#B3B3B3" borderRadius="20px" border="2px solid rgba(32, 148, 255, 0.25);" backdropFilter="blur(4px)" boxShadow="0px 0.58805px 14.1132px 0.58805px rgba(32, 148, 255, 0.25);" position="absolute" w={isSmallerThan900 ? '8rem' : '15rem'} top={isSmallerThan900 ? '18rem' : '28rem'} left={isSmallerThan900 ? '0rem' : '-5rem'}>
                            <Text >hey let’s make it
                                please something
                                graduating batch and
                                idk why are you</Text>
                            <Text textAlign="right">~bakshi</Text>
                        </Box>
                        <Image pointerEvents={'none'} src="../images/Ellipse 8.png" alt="ellipse" position="absolute" left="27rem" top="10rem" />
                        <Image pointerEvents={'none'} w={isSmallerThan900?"100%":"90%"} src="../images/clock.svg" alt="yearbook" p={isSmallerThan900 ? 0 : '2rem'} marginInline="8"/>
                    </Box>
                </Box>
            </Flex >
        </Box >
    )
}
