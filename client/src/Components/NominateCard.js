import { Box, Flex,Modal, ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, Text, Input, Button, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons"
import axios from "axios";


export default function NominateCard(props) {

    const [isVisible, setIsVisible] = React.useState(true)
    const [isSmallerThan800] = useMediaQuery('(max-width:800px')

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };
    
    const [captionData, setCaptionData] = React.useState({
        writerId: localStorage.getItem("userDetail"),
        caption: "",
        receiverId: props.id
    })

    function handleChange(event) {
        const { name, value } = event.target
        setCaptionData(prevCaptionData => {
            return {
                ...prevCaptionData,
                [name]: value
            }
        })
    }

    function submitCaption(){
        axios({
            method: 'POST',
            url: 'https://yearbook-portal-backend-2022.herokuapp.com/writecaption',
            data: captionData
        })
            .then(function (response) {
                console.log(response);
                setIsOpen(false)
                setIsVisible(false)
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log(captionData);
    }

    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <Flex bg="#151515"
            p="1.3rem 1rem"
            className="card"
            color="#DCEDFB"
            marginRight="1rem"
            marginBottom="1rem"
            opacity="0.8"
            w={isSmallerThan800 ? "100%" : "48%"}
            alignItems={"center"}
            backdropFilter="blur(40px)"
            borderRadius="20px"
            justifyContent="space-between"
            flexWrap="wrap"
            border="1px solid rgba(255, 255, 255, 0.5)"
            fontWeight="700"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            display={isVisible ? "flex" : "none"}
        >
            <Flex bgColor={"rgba(255, 255, 255, 0.05)"} border="1px solid rgba(255, 255, 255, 0.25)" borderRadius="3rem" w="fit-content" p="0.3rem 0.8rem">
                {/* <Image borderRadius={"50%"}  h="1.5rem" w="1.5rem" src="./images/pic.png" /> */}
                <Text fontWeight={"600"} fontSize="0.9rem">{props.name}</Text>
            </Flex>
            <Box lineHeight="1.3rem" fontSize="1rem" color="#FFFFFF" fontWeight="400">
                nominated you to write on their wall</Box>
            <Box onClick={handleOpen} borderRadius="50%" bgColor="white" border="1.17225px solid #FFC62D" h="2rem" w="2rem"  boxShadow="0px 0px 17.5838px rgba(255, 255, 255, 0.5)"  ><ArrowForwardIcon fontSize="1.4rem" cursor="pointer" color="black"ml="0.3rem"/></Box>
            <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent backdropFilter = "blur(47.5676px)" bgColor="#1D1E22" color="white" p="1.4rem">
                    <ModalHeader mt="2rem" fontSize="2rem">write caption for {props.name}</ModalHeader>
                    <ModalCloseButton onClick={handleClose} />
                    <ModalBody mt="0.5rem" fontSize="1rem" w="100%">
                        <Input type = "text" name="caption" placeholder="enter your caption!" onChange={handleChange}/>
                        <Flex justifyContent="center"><Button onClick={submitCaption} _hover={{ color: "black", bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" }} bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" fontWeight="700" mt="3rem" p="1.2rem 1.6rem" fontSize="1.4rem" colorScheme="blackAlpha">submit</Button></Flex>
                    </ModalBody>
                </ModalContent >
            </Modal>
        </Flex>
    )
}