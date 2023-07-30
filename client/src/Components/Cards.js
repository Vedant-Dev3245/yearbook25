import { Box, Flex, Text, useMediaQuery,Image } from "@chakra-ui/react";
import React from "react";
import { FiShare2 } from "react-icons/fi";
import { Icon } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import Template from "./Template";




export default function Cards(props) {


  const [isSmallerThan800] = useMediaQuery('(max-width:800px)')



  const [caption, setCaption] = React.useState("")
  const [ownProfile, setOwnProfile] = React.useState("")


  const handleShareInsta = async () => {
    const templateElement = document.querySelector(".template");
    if (templateElement) {
      try {
        const canvas = await html2canvas(templateElement, {
          scrollY: -window.scrollY,
          useCORS: true,
        });

        canvas.toBlob(async (blob) => {
          if (blob) {
            const filesArray = [new File([blob], "insta-story.png", { type: "image/png" })];

            const shareData = {
              files: filesArray,
            };

            if (navigator.canShare && navigator.canShare(shareData)) {
              try {
                await navigator.share(shareData);
                console.log("Shared successfully!");
              } catch (error) {
                console.error("Error sharing:", error);
              }
            } else {
              console.log("Sharing to Instagram is not supported on this device.");
            }
          } else {
            console.log("Failed to convert HTML to image.");
          }
        });
      } catch (error) {
        console.error("Error converting HTML to image:", error);
      }
    } else {
      console.error("Template element not found.");
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
        <Image borderRadius={"50%"}  h="1.5rem" w="1.5rem" src={props.img} margin={0}/>
        <Text fontWeight={"600"} fontSize="0.9rem">{props.name.toLowerCase()}</Text>
      </Flex>

      {/* template for insta story */}
      {ownProfile && isSmallerThan800 &&
        <Template caption={props.caption} name={props.name} img={props.img} bitsId={props.bitsId} />
      }
      {/* template for insta story */}

      <Flex> 
        <Box w="95%" mt="1rem" lineHeight="1.3rem" fontSize="1rem">
          {props.caption}</Box>
        {/* insta share Button */}
        {ownProfile && isSmallerThan800 &&
          <Box cursor={"pointer"} onClick={handleShareInsta} p="0.35rem" h="2rem" w="
                2rem" className="pencil"><Icon w="1rem" h="1rem" as={FiShare2} /></Box>
        }
        {/* insta share Button */}

      </Flex>
      



    </Box>
  )
}