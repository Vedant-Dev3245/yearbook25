import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons"
export default function NominateCard(props) {
    return (
        <Flex bg="#151515"
            p="1.3rem 1rem"
            className="card"
            color="#DCEDFB"
            marginRight="1rem"
            marginBottom="1rem"
            opacity="0.8"
            alignItems={"center"}
            backdropFilter="blur(40px)"
            w="48%"
            borderRadius="20px"
            justifyContent="space-between"
            marginInline="auto"
            border="1px solid rgba(255, 255, 255, 0.5)"
            fontWeight="700"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        >
            <Flex bgColor={"rgba(255, 255, 255, 0.05)"} border="1px solid rgba(255, 255, 255, 0.25)" borderRadius="3rem" w="fit-content" p="0.3rem 0.8rem">
                {/* <Image borderRadius={"50%"}  h="1.5rem" w="1.5rem" src="./images/pic.png" /> */}
                <Text fontWeight={"600"} fontSize="0.9rem" ml="1rem">{props.name}</Text>
            </Flex>
            <Box lineHeight="1.3rem" fontSize="1rem" color="#FFFFFF" fontWeight="400">
                nominated you to write on their wall</Box>
            <Box borderRadius="50%" bgColor="white" border="1.17225px solid #FFC62D" h="2rem" w="2rem"  boxShadow="0px 0px 17.5838px rgba(255, 255, 255, 0.5)"  ><ArrowForwardIcon fontSize="1.4rem" cursor="pointer" color="black"ml="0.3rem"/></Box>
        </Flex>
    )
}