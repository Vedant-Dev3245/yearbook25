import {
    Box, Flex, Modal, ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, Text, VStack
} from "@chakra-ui/react";
import React from "react";
import { Icon } from "@chakra-ui/react";
import { TbPencil } from "react-icons/tb"

export default function ProfileInfo() {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };
    return (

        <Flex alignItems="center" marginInline="auto" w="90%" mt="-4rem" p="1.2rem 0rem" justifyContent="flex-start">
            <Box w="15rem" h="15rem" position="relative" bgColor="grey" borderRadius="50%" border="2px solid #E1D4D4;">
                <Box cursor={"pointer"} onClick={handleOpen} position="absolute" top="0" right="0px" p="1rem" className="pencil"><Icon w="2rem" h="2rem" as={TbPencil} /></Box>
            </Box>
            <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent bgColor="#1D1E22" color="white" p="1.4rem">
                    <ModalHeader mt="2rem" fontSize="2rem">update your details</ModalHeader>
                    <ModalCloseButton onClick={handleClose} />
                    <ModalBody mt="-0.5rem" fontSize="1rem">
                        put the instructions in the google docs here in    the form of bullet points like this: <br/>
                        wish to do anything with it,<br/>
                        google docs here in the form<br/>
                        2020A7PS1508P great stuff
                    </ModalBody>
                </ModalContent >
            </Modal>
            <VStack alignItems="baseline" ml="3rem" mt="4rem">
                <Text color="white"
                    fontWeight={700}
                    letterSpacing="0.08rem"
                    fontSize="2.2rem">saksham aggarwal</Text>
                <Text color="#B3B3B3"
                    fontWeight={300}
                    opacity="0.75"
                    fontSize="1.2rem">2020A7PS1508P | A7</Text>
                <Box w="55%">
                    <Text mt="1rem" color="#DAE6FF" fontWeight="700" fontSize="1.2rem">hey let’s make something good for the graduating batch and idk why are you so free and reading this lol jk have fun</Text>
                </Box>
            </VStack>
        </Flex >
    )
}