import React from 'react';
import { useNavigate } from "react-router-dom"
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Devs from '../Components/Devs';
import { Box, Text, VStack, useMediaQuery, Flex } from '@chakra-ui/react';
import jwtDecode from "jwt-decode"
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";



export default function Devleopers() {
  const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
  const [auth, isAuth] = React.useState(true)
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate()

  React.useEffect(() => {
    /* global google */
    if (localStorage.getItem("user") === null) {
      google.accounts.id.initialize({
        client_id: "1502189684-lrjbvrj8h65ti32b90kioqq0fvv5mfab.apps.googleusercontent.com",
        callback: handleCallbackResponse
      })

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline", size: "medium"
        }

      )
      google.accounts.id.renderButton(
        document.getElementById("signInDiv2"),
        {
          theme: "outline", size: "medium"
        }
      )
    }
  }, [])

  React.useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 2000);

  }, [])

  function handleCallbackResponse(response) {
    var userObject = jwtDecode(response.credential)
    var token = response.credential
    localStorage.setItem("google_token", token)
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BACKEND_URL}/auth/google`,
      data: { token: token }
    })
      .then(function (response) {
        // checkUser(userObject)
        if (!response.data.authorised) {
          isAuth(false)
          setLoading(false)
          setTimeout(() => {
            isAuth(true)
          }, 5000);
        } else{
          if (response.data.exists) {
            localStorage.setItem("user", response.data.user)
            localStorage.setItem("token", response.data.token)
            setLoading(false)
            navigate(`/profile/${response.data.user}`)
          } else {
            navigate('/form', { state: userObject })
          }
        }
      })
  }


  return (
    <Box overflowX="hidden"
      bg="#141414"
      className="noselect landing">
      <Flex justifyContent={"center"} alignItems="center" position="fixed" zIndex="26" w="100%" h="100vh" display={loading ? "flex" : "none"} bg='blackAlpha.400'
        backdropFilter='blur(10px)'><ScaleLoader
          color="#D4D4D4"
          loading={loading}
          size={60}
          speedMultiplier={0.7}
        /></Flex>
      <Navbar />
      <Box w="90%" marginInline="auto" pb="4rem" mt="7rem" mb="5rem">
        <VStack spacing="1rem" marginInline="auto" >
          <Text fontWeight={800} fontSize={isSmallerThan800 ? "1.8rem" : "4rem"} color="white">
            meet the team 🌱</Text>
          {/* <Text fontWeight={600} fontSize="1.2rem" color="#B3B3B3" 
                w={isSmallerThan800?"80%":"45%"} mb="3rem !important" align="center">
                    hey let's make something good for the graduating batch
                </Text> */}
          <Devs />
        </VStack>
      </Box>
      <Footer />
    </Box>

  )
}