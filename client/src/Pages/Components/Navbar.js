import React from "react"
import { Box, Flex, Text, Link } from '@chakra-ui/react';
export default function Navbar(){
  return(

  <Flex borderWidth={1} borderRadius={10} backdropBlur={10} justifyContent="space-between" paddingBlock={1} alignItems= "center"
          borderColor="linear-gradient(92.53deg, #B5D2FF 2.36%, #2094FF 18.96%, #C34FFA 28.09%, #FF6187 41.77%, #F8D548 51.61%);"
          background="linear-gradient(90deg, rgba(251, 251, 251, 0.1) 0%, rgba(251, 251, 251, 0.1) 100%);" zIndex = "2" position="relative"
        >
          <Text fontWeight="800" fontSize="2rem" color="white" p={3} pl={6}>SARC</Text>
          <Flex justifyContent="space-between" width="100%" maxW="500px" align={'center'}>
            <Link fontSize="s" fontWeight="600" color="white" p={4}>home</Link>
            <Link fontSize="s" fontWeight="600" color="white" p={4}>about</Link>
            <Link fontSize="s" fontWeight="600" color="white" p={4}>contact</Link>
            <Link fontSize="s" fontWeight="600" color="white" p={4}>developers</Link>
          </Flex>
          <Box id="signInDiv" p={2}>
          </Box>
        </Flex>

  )
}
{/* <Box> */}
{/* <Box background="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" h="2rem" w = "90%" zIndex="1" position="absolute"></Box> */}
{/* 
</Box> */}