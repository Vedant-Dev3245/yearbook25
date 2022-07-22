import { Box, Text, Flex, Grid, Image, VStack, useMediaQuery } from '@chakra-ui/react'
import React from 'react'

export default function Working() {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px')
    return (
        <Box mt={isSmallerThan800 ? '6rem' : '10rem'}>
            <Box className="heading" fontSize={80} color="#fff" fontWeight={800} align={'center'}>how it <Text fontStyle="italic" display="inline" fontFamily="EB Garamond" >works?</Text> </Box>
            <VStack>
                <Box mt="5rem" border="2px solid #A7D5FF;" boxShadow="0px 0px 10px #2094FF;" borderRadius="1rem" w="80%" color="white" bgColor="rgba(32, 148, 255, 0.15)">
                    <Box ml={isSmallerThan800 ? '2rem !important' : '3rem'} mt="4rem" bgColor="#2094FF" color="white" width="3.5rem" h="3.5rem" borderRadius="50%" textAlign="center"><Text fontSize="1.2rem" transform="translateY(44%)">1</Text></Box>
                    <Flex justifyContent="space-between" flexDirection={isSmallerThan800 ? 'column !important' : 'row'} >
                        <Box w={isSmallerThan800 ? '80% !important' : '24%'} ml={isSmallerThan800 ? '2rem !important' : '3rem'} mt="1rem">
                            <Box fontSize="2rem" lineHeight="2.4rem" fontWeight="800" mb="1rem">upload your profile picture and yearbook quote ☀️ </Box>
                            <Box fontSize="1.2rem" lineHeight="1.6rem" mb="6rem" color="#B3B3B3">
                                hey let’s make something good for the graduating batch and idk why are you so free and reading this lol jk have fun
                            </Box>
                        </Box>
                        <Image className="workImg" w="50%" h="100%" src='../images/Auth form.png' borderTopLeftRadius="30px" borderBottomRightRadius="10px" mb={isSmallerThan800 ? '2rem' : 0} />
                    </Flex>
                </Box>
                <Flex flexDirection={isSmallerThan800 ? 'column !important' : 'row'} w="80%" justifyContent="space-between" mt="2rem !important">
                    <Box w={isSmallerThan800 ? '100% !important' : '60%'} mr="2rem" border="2px solid #FFC62D" boxShadow="0px 0px 10px #FFC62D;" borderRadius="1rem" color="white" bgColor="rgba(255, 198, 45, 0.15);">
                        <Box ml={isSmallerThan800 ? '2rem !important' : '3rem'} mt="4rem" bgColor="#FFC62D" color="white" width="3.5rem" h="3.5rem" borderRadius="50%" textAlign="center">
                            <Text fontSize="1.2rem" transform="translateY(44%)">2</Text>
                        </Box>
                        <VStack mt="1rem" ml={isSmallerThan800 ? '2rem !important' : '3rem'} alignItems="baseline">
                            <Box fontSize="2rem" lineHeight="2.4rem" fontWeight="800" mb="1rem">visit your frens, write quotes on their wall & nominate them 🌱 </Box>
                            <Box fontSize="1.2rem" lineHeight="1.6rem" mb="6rem" color="#B3B3B3" textAlign="left">
                                hey let’s make something good for the graduating batch and idk why
                            </Box>
                        </VStack>
                        <Box w={isSmallerThan800 ? '80%' : '50%'} h="18rem" mb="4rem !important" bgColor="#FFC62D" borderRadius="20px" margin="auto"><Text m="2rem" fontSize="1.2rem" fontWeight="600" transform="translateY(44px)" >insert profile view here</Text></Box>


                    </Box>

                    <Box w={isSmallerThan800 ? '100% !important' : '40%'} mt={isSmallerThan800 ? '1rem' : '0'} color="white" border="2px solid #D84222;" boxShadow="0px 0px 10px #D84222;" borderRadius="1rem" bgColor="rgba(216, 66, 34, 0.15);">
                        <Box w="80%" h="18rem" mb="4rem !important" bgColor="#D84222" borderRadius="20px" margin="auto"><Text m="2rem" fontSize="1.2rem" fontWeight="600" transform="translateY(20px)" >insert others’ profile view ss here</Text></Box>
                        <Box ml={isSmallerThan800 ? '2rem !important' : '3rem'} mt="4rem" bgColor="#D84222" color="white" width="3.5rem" h="3.5rem" borderRadius="50%" textAlign="center">

                            <Text fontSize="1.2rem" transform="translateY(44%)">3</Text>
                        </Box>
                        <VStack mb={isSmallerThan800 ? '2rem' : 0} mt="1rem" ml={isSmallerThan800 ? '2rem !important' : '3rem'} alignItems="baseline" w="80%">
                            <Box fontSize="2rem" lineHeight="2.4rem" fontWeight="800" mb="1rem">vote your favs & do some crazy shit ✨</Box>
                            <Box fontSize="1.2rem" lineHeight="1.6rem" mb="6rem" color="#B3B3B3" textAlign="left">
                                hey let's make something good for the graduating batch and
                            </Box>
                        </VStack>
                    </Box>
                </Flex>
            </VStack >
        </Box >
    )
}