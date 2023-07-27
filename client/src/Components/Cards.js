import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useRef,useEffect,useState} from "react";
import {FiShare2} from "react-icons/fi";
import { Icon } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import Template from "./Template";




export default function Cards(props) {



    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')



    const [caption, setCaption] = React.useState("")
    const[ownProfile,setOwnProfile]=React.useState("")


    const handleShareInsta = async () => {
      const templateElement = document.querySelector(".template");
    
      const imageDataURL = await html2canvas(templateElement);
    
      if (imageDataURL) {
        const title = "Insta";
        const blobImageAsset = await fetch(imageDataURL).then((res) => res.blob());
    
        const filesArray = [
          new File([blobImageAsset], `${title}.png`, {
            type: "image/png",
            lastModified: new Date().getTime(),
          }),
        ];
    
        const shareData = {
          title: title,
          files: filesArray,
        };
    
        if (navigator.canShare && navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData);
          } catch (error) {
            console.error("Error sharing to Instagram:", error);
          }
        } else {
          console.log("Sharing to Instagram is not supported on this device.");
        }
      } else {
        console.log("Failed to convert HTML to image.");
      }
    };
    
    // // sharing in insta story 

    React.useEffect(() => {
      if (window.location.href.includes(localStorage.getItem("user"))) {
          setOwnProfile(true)
      }
      else {
          setOwnProfile(false)
      }
  })

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
            {ownProfile  &&
                <Template caption={props.caption} />
            }

            {/* template for insta story */}
            
            <Flex>
            <Box w="95%" mt="1rem" lineHeight="1.3rem" fontSize="1rem">
                {props.caption}</Box>
            {/* insta share Button */}
            {ownProfile && isSmallerThan800 &&
            <Box cursor={"pointer"} onClick={handleShareInsta}  p="0.35rem" h="2rem" w="
                2rem" className="pencil"><Icon w="1rem" h="1rem" as={FiShare2} /></Box>
            }
            {/* insta share Button */}

            </Flex> 
            


        </Box>
    )
}