import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Cards from "./Cards";


export default function Wall() {
    return (
        <Box>
            <Box fontSize="2.4rem" ml="2rem" mt="4rem">your wall</Box>
            <Flex flexWrap="wrap" >
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
            </Flex>
        </Box>

    )
}