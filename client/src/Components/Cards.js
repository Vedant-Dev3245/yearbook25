import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useRef } from "react";
import { TbPencil } from "react-icons/tb"
import { Icon } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import Template from "./Template";



export default function Cards(props) {



    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')



    const [caption, setCaption] = React.useState("")


    const captionRef = useRef("");

    const handleShareInsta = async () => {
        try {
          const templateCanvas = await html2canvas(document.querySelector(".template"));
    
          templateCanvas.toBlob(async (blob) => {
            const file = new File([blob], "template.png", {
              type: "image/png",
              lastModified: new Date().getTime(),
            });
    
            const shareData = {
              title: "My Template with Caption",
              files: [file],
            };
    
            if (navigator.canShare && navigator.canShare(shareData)) {
              try {
                await navigator.share(shareData);
                console.log("Shared to Instagram successfully!");
              } catch (error) {
                console.error("Error sharing to Instagram:", error);
              }
            } else {
              console.error("Sharing is not supported.");
            }
          }, "image/png");
        } catch (error) {
          console.error("Error capturing template content:", error);

        }
      };
    // // sharing in insta story 

    return (
        <Box bg="#151515"
            p="1rem"
            className="card"
            color="#DCEDFB"
            margin="1rem"
            opacity="0.8"
            backdropFilter="blur(40px)"
            w="100%"
            borderRadius="20px"
            marginInline="auto"
            border="1px solid rgba(255, 255, 255, 0.5)"
            fontWeight="700"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        >
            <Flex bgColor={"rgba(255, 255, 255, 0.05)"} border="1px solid rgba(255, 255, 255, 0.25)" borderRadius="3rem" w="fit-content" p="0.3rem 0.8rem">
                {/* <Image borderRadius={"50%"}  h="1.5rem" w="1.5rem" src="./images/pic.png" /> */}

                <Text fontWeight={"600"} fontSize="0.9rem">{props.name.toLowerCase()}</Text>
            </Flex>

            {/* template for insta story */}
            
                <Template display={"none"} caption={props.caption} />
            

            {/* template for insta story */}
            
            <Flex>
            <Box w="95%" mt="1rem" lineHeight="1.3rem" fontSize="1rem">
                {props.caption}</Box>
            {/* insta share Button */}
            <Box cursor={"pointer"} onClick={handleShareInsta}  p="0.35rem" h="2rem" w="
                2rem" className="pencil"><Icon w="1rem" h="1rem" as={TbPencil} /></Box>
            {/* insta share Button */}
            </Flex>
            


        </Box>
    )
}