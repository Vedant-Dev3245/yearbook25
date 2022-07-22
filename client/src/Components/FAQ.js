import React from "react";
import {
    Box, Text, VStack, useMediaQuery
} from "@chakra-ui/react";
import { useState } from "react";
import FAQItems from "./FAQItems";

export default function FAQ() {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    const [faq1, setFaq1] = useState(false);
    const [faq2, setFaq2] = useState(true);
    const [faq3, setFaq3] = useState(false);
    const [faq4, setFaq4] = useState(false);
    const [faq5, setFaq5] = useState(false);
    return (
        <>
            <Box className="heading" fontSize={64} color="#fff" fontWeight={800} textAlign='left' ml={isSmallerThan800 ? '1.4rem !important' : '6rem'} mt="10rem">have a <Text fontStyle="italic" display="inline" fontFamily="EB Garamond" >question?</Text> </Box>
            <VStack mt="2rem" spacing={4} className="faqCont">
                <FAQItems
                    marginBottom="0 !important"
                    faq="What is the difference between a token and a token pair?"
                    show={faq1}
                    setFaq={setFaq1}
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform.
                 For example, if you want to buy a token pair, you need to buy a token 
                 and a token pair. The token pair is the one that is traded on the platform."
                />
                <FAQItems
                    faq="What is the difference between a token and a token pair?"
                    show={faq2}
                    setFaq={setFaq2}
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform.
                 For example, if you want to buy a token pair, you need to buy a token 
                 and a token pair. The token pair is the one that is traded on the platform."
                />
                <FAQItems
                    faq="What is the difference between a token and a token pair?"
                    show={faq3}
                    setFaq={setFaq3}
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform.
                 For example, if you want to buy a token pair, you need to buy a token 
                 and a token pair. The token pair is the one that is traded on the platform."
                />
                <FAQItems
                    faq="What is the difference between a token and a token pair?"
                    show={faq4}
                    setFaq={setFaq4}
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform.
                 For example, if you want to buy a token pair, you need to buy a token 
                 and a token pair. The token pair is the one that is traded on the platform."
                />
                <FAQItems
                    faq="What is the difference between a token and a token pair?"
                    show={faq5}
                    setFaq={setFaq5}
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform.
                 For example, if you want to buy a token pair, you need to buy a token 
                 and a token pair. The token pair is the one that is traded on the platform."
                />
            </VStack>
        </>
    )
}
