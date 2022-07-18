import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import React from 'react'

export default function Footer() {

    return (
        <Box color="white" position = 'relative' mt="4rem">
            <Image src='../images/physicalBg.png' position = 'absolute' left="15%" z-index = "1"/>
            <VStack
                w="80%"
                marginInline="auto"
                position="relative"
                background="url()"
                bgPosition="center"
                bgSize="cover"
                spacing = {10}
                box-shadow="0px 1px 24px 1px rgba(0, 0, 0, 0.15)"
                backdrop-filter="blur(40px)"
                z-index = "2"
                border-radius="50px" >
                <Box fontSize="3rem" fontWeight = "700" mt = "4rem">opt-in for the <Box display="inline" fontStyle = "italic" fontFamily="EB Garamond">physical</Box> yearbook 🥂</Box>
                <Box color = "#C9C8C8" fontSize="1.4rem">get physical copy. cherish it for the years to come.</Box>
                <Button fontSize = "1.2rem" color = "black" fontWeight="700">yes, i do need yearbook irl <ArrowForwardIcon />
                </Button>
            </VStack>
                
        </Box>
    )
}