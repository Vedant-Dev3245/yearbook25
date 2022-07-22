import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function ProfileNav() {
    return (
        <Flex alignItems="center" marginInline="2rem" p="1.2rem 1rem" justifyContent="flex-start">
            <Box w="300px" h="300px" bgColor="white" borderRadius="50px"></Box>
            <VStack alignItems="baseline" ml="3rem">
                <Text color="white"
                    fontWeight={800}
                    fontSize="2.4rem">SAKSHAM AGGARWAL</Text>
                <Text color="#B3B3B3"
                    fontWeight={600}
                    fontSize="2rem">2020A7PS1508P</Text>
                <Text color="#B3B3B3"
                    fontWeight={600}
                    fontSize="1rem"
                    mt="0rem !important">f20201508@pilani.bits-pilani.ac.in</Text>
            </VStack>
        </Flex >
    )
}