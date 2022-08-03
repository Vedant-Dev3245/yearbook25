import React from 'react'
import {
    Box,
    Image,
    Text,
    Flex,
    useMediaQuery,
    useDisclosure,
    Collapse,
    VStack,
    Link,
    Button
} from "@chakra-ui/react";
import {FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

const DevCards = (props) => {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    return (
        <Box boxSizing="border-box" bgColor="#151515"
        pt={3} pl={3} pr={3} pb={5} borderRadius="15px" 
        border="0.414982px solid rgba(255, 255, 255, 0.5);"
        m={5}>
        <Image src={props.img} borderRadius="15px" />
            <VStack alignItems="baseline" pl={2}>
                <Text color="#DCEDFB" fontWeight={700} fontSize="1.6rem" mt="0.5rem !important">{props.name}</Text>
                <Text color="#B3B3B3" fontWeight={300} fontSize="0.7rem" mt="-0.2rem !important" mb="0.5rem !important">{props.caption}</Text>
                <Text color="#FAFAFABF" fontWeight={600} fontSize="0.55rem" w="80%">{props.text}</Text>
                    <Flex justifyContent="space-between" w={isSmallerThan800 ? "30%" : "20%"}>
                        <Link href={props.twitter} target="_blank"><FaTwitter color='white' fontSize={"0.9rem"}/> </Link>
                        <Link href={props.linkedIn} target="_blank"><FaLinkedin color='white' fontSize={"0.9rem"}/> </Link>
                        <Link href={props.instagram} target="_blank">  <FaInstagram color='white' fontSize={"0.9rem"}/> </Link>
                    </Flex>
                
            </VStack>
        </Box >
    )
}

export default DevCards