import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function ProfileNav() {
    return (
        <Flex alignItems="center" marginInline="2rem" p="1.2rem 1rem" justifyContent="space-between">
            <Button background="linear-gradient(90deg, #0057FF 0%, #00ED97 100%)"><ArrowBackIcon /></Button>
            <Text fontWeight={800} fontSize="2rem">profile</Text>
            <Button background="linear-gradient(90deg, #0057FF 0%, #00ED97 100%)">edit</Button>
        </Flex>
    )
}