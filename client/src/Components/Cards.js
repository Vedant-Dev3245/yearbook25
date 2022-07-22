import { Box, Image } from "@chakra-ui/react";
import React from "react";

export default function Cards() {
    return (
        <Box bg="linear-gradient(180deg, rgba(217, 217, 217, 0.25) 0%, rgba(217, 217, 217, 0.25) 100%)"
            p="1rem"
            className="card"
            color="#B6B6B6"
            margin="1rem"
            opacity="0.8"
            backdropFilter="blur(40px)"
            w="30%"
            borderRadius="10px"
            marginInline="auto"
            border="2px solid #00ED97BF"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            position="relative"
        >
            <Box w="80%">
                hey let’s make something good for the graduating batch and idk why are you so free and reading this lol jk have fun</Box>
            <Box textAlign="right">~Person ABC</Box>
            <Box position="absolute" top="-1.5rem" right="-1.5rem" bgColor="white" borderRadius="50%" w="4rem" h="4rem"></Box>

        </Box>
    )
}