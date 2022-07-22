import React from 'react'
import {
    Box,
    Image,
    Text,
    Flex,
    useMediaQuery
} from "@chakra-ui/react";

const FAQItems = (props) => {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    return (
        <Box justifyContent="space-between" pt={5} pl={10} pr={10} pb={5} borderRadius={8} border="3px solid rgba(240, 248, 255, 0.25);" width='90%' onClick={() => props.setFaq(!props.show)}>
            <Flex justifyContent="space-between">
                <Image src="../images/bullet.png" mt="0.6rem" w="1rem" h="1rem" ml={isSmallerThan800 ? "-1.2rem" : 0} />
                <Flex justifyContent="space-between" w="95%">
                    <Text fontWeight={400} fontSize={isSmallerThan800 ? "1rem" : "1.6rem"} fontStyle="Poppins" color="#fff" position='relative'>{props.faq}</Text>
                    {props.show ? <Image mt="0.4rem" w={isSmallerThan800 ? "1rem" : "1.2rem"} h={isSmallerThan800 ? "1rem" : "1.2rem"} src="../images/arrowDown.png" transform='rotate(180deg)' /> : <Image mt="0.4rem" w={isSmallerThan800 ? "1rem" : "1.2rem"} h={isSmallerThan800 ? "1rem" : "1.2rem"} src="../images/arrowDown.png" />}
                </Flex>
            </Flex>
            {props.show ? <Text ml={isSmallerThan800 ? "1rem" : "5rem"} className=".faqAns" mr={isSmallerThan800 ? "1rem" : "4rem"} mt="1.6rem" fontWeight={400} fontSize="1rem" fontStyle="Poppins" color="#B3B3B3">{props.text}</Text> : <div></div>}
        </Box >
    )
}

export default FAQItems