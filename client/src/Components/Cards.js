import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function Cards(props) {
    return (
        <Box bg="#151515"
            p="1rem"
            className="card"
            color="#DCEDFB"
            margin="1rem"
            opacity="0.8"
            backdropFilter="blur(40px)"
            w="100%"
            borderRadius="20px"
            marginInline="auto"
            border="1px solid rgba(255, 255, 255, 0.5)"
            fontWeight="700"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        >
            <Flex bgColor={"rgba(255, 255, 255, 0.05)"} border="1px solid rgba(255, 255, 255, 0.25)" borderRadius="3rem" w="fit-content" p="0.3rem 0.8rem">
                {/* <Image borderRadius={"50%"}  h="1.5rem" w="1.5rem" src="./images/pic.png" /> */}
                
                <Text fontWeight={"600"} fontSize="0.9rem">{props.name.toLowerCase()}</Text>
            </Flex>
            <Box w="95%" mt="1rem" lineHeight="1.3rem" fontSize="1rem">
                {props.caption}</Box>
        </Box>
    )
}