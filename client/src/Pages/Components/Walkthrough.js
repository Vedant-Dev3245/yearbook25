import React from 'react'
import { Box, Image, Text, Button } from '@chakra-ui/react'
export default function Walkthrough() {
    return (
        <Box mt="10rem">
            <Box fontSize={64} color="#fff" fontWeight={800} align={'center'}>a <Text fontStyle="italic" display="inline" fontFamily="EB Garamond" >walkthrough</Text> of the platform</Box>
            <Box w="100%" bg="url(./images/textBg.png)">
                <Box background="url(./images/walkBg.png)" backgroundSize="cover" w="80%" h="30rem" borderRadius="50px"
                    border="3px solid rgba(255, 255, 255, 0.75);" marginInline="auto" mt="2rem">
                    <Button m="22rem 3rem" p="2rem 2.6rem" borderRadius="200px"> <Image w="12%" src="./images/playButton.png" /> <Text fontWeight="800" fontSize="1.4rem" ml="1rem">play video</Text> </Button>
                </Box>
            </Box>
        </Box>
    )
}