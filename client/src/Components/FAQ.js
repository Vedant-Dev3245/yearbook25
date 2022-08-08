import React from "react";
import {
    Box, Text, VStack, useMediaQuery, Image
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
    const [faq6, setFaq6] = useState(false);
    return (
        <>
            <Box className="heading" fontSize="3.2rem"
            color="#fff" fontWeight={800} 
            textAlign='left' 
            ml={isSmallerThan800 ? '1.4rem !important' : '10rem'}
            mt="10rem">have a <Text fontStyle="italic" display="inline" fontFamily="EB Garamond" >question?</Text> </Box>
            <VStack mt="2rem" marginInline={isSmallerThan800 ? 0 : "5rem"} spacing={4} className="faqCont" id="faq">
                <FAQItems
                    marginBottom="0 !important"
                    faq="Would I need to log in every time I open the yearbook portal?"
                    show={faq1}
                    setFaq={setFaq1}
                    text="No, once you set up your profile when you first log in, you would not be required to log in again. You just need to click on the ‘profile’ at the top of the dashboard next time onwards."
                />
                <FAQItems
                    faq="Can we navigate through the profile of our batchmates?"
                    show={faq2}
                    setFaq={setFaq2}
                    text="Yes, you can by typing their name on the search bar."
                />
                <FAQItems
                    faq="Would we be required to re-enter our entries for the yearbook separately?"
                    show={faq3}
                    setFaq={setFaq3}
                    text="No, your entries from the yearbook portal will be redirected for printing in the yearbook."
                />
                <Image src="../images/text2816.png" zIndex='1' opacity="0.2" position="absolute" right="1.2rem" />                
                <FAQItems
                    faq="Is there a word limit for the quote?"
                    show={faq4}
                    setFaq={setFaq4}
                    text="Although the captions you write for your friends would not have any word limit, your quote has a limit of only 140 characters."
                />
                <FAQItems
                    faq="Will having a profile on the portal makes me a recipient of the yearbook by defacto?"
                    show={faq5}
                    setFaq={setFaq5}
                    text="No, you must sign up for the yearbook from the dashboard before the deadline."
                />
                 <FAQItems
                    faq="Is it compulsory to upload a picture/quote for the yearbook?"
                    show={faq6}
                    setFaq={setFaq6}
                    text="Yes, you would not be able to redirect to your Profile without a quote/picture. You could always edit them as many times as you would like once you're in though."
                />
                
            </VStack>
        </>
    )
}
