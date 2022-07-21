import React from 'react'
import {
    Box,
    Image,
    Text,
    Flex
} from "@chakra-ui/react";

const FAQItems = (props) => {
    return (
        <Box mt='0.5rem' mb={3} pt={5} pl={10} pr={10} pb={5} borderRadius={8} border="3px solid rgba(240, 248, 255, 0.25);" width='80%' onClick={() => props.setFaq(!props.show)}>
            <Image src="../images/bullet.png" />
            <Flex justifyContent="left">
                <Text fontWeight={400} fontSize={24} fontStyle="Poppins" color="#fff" position='relative'>{props.faq}</Text>
                {props.show ? <Image src="../images/arrowDown.png" /> : <Image src="../images/arrowDown.png" transform='rotate(180deg)' />}
            </Flex>
            {props.show ? <Text fontWeight={400} fontSize={15} fontStyle="Poppins" color="#B3B3B3">{props.text}</Text> : <div>null</div>}
        </Box >
    )
}

export default FAQItems