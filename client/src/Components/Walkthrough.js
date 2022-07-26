import React from 'react'
import { Box, Image, Text, Button } from '@chakra-ui/react'
export default function Walkthrough() {

    const [showVideo, setShowVideo] = React.useState(false)
    function toggleVideo() {
        setShowVideo(true)
    }
    return (
        <Box mt="10rem">
            <Box className="heading" fontSize={64} color="#fff" fontWeight={800} align={'center'}>a <Text fontStyle="italic" display="inline" fontFamily="EB Garamond" >walkthrough</Text> of the platform</Box>
            <Box w="100%" bg="url(./images/textBg.png)"> 
                <Box background="url(./images/walkBg.png)" backgroundSize="cover" w="90%" h="30rem" borderRadius="50px"
                    border="3px solid rgba(255, 255, 255, 0.75);" marginInline="auto" mt="2rem">
                    <Box w='100%' h="30rem">
                        <Box display={showVideo === true ? 'block' : 'none'}>
                            <iframe width="100%" className='video' src="https://www.youtube.com/embed/T94PHkuydcw?" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                        </Box>
                        <Button display={showVideo === true ? "none" : "block"} cursor="pointer" onClick={toggleVideo} mt="22rem" ml="3rem" p="2rem 2.6rem" borderRadius="200px"> <Image mt="-0.5rem" w="12%" src="./images/playButton.png" /> <Text mt="-1.4rem" fontWeight="800" fontSize="1.4rem" ml="2rem">play video</Text> </Button>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}