import React from 'react';
import { useNavigate } from "react-router-dom"
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Devs from '../Components/Devs';
import {Box, Text, VStack, useMediaQuery} from '@chakra-ui/react';
import jwtDecode from "jwt-decode"
import axios from "axios";



export default function Devleopers(){
	const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    const [auth, isAuth] = React.useState(true)
    const [loading, setLoading] = React.useState(true)
    const navigate = useNavigate()

    React.useEffect(() => {
        /* global google */
         if (localStorage.getItem("user") === null) {
           google.accounts.id.initialize({
             client_id: "1050493483344-ardfhdeca71u0v4758micitopt027jnr.apps.googleusercontent.com",
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
    
       function handleCallbackResponse(response) {
        var userObject = jwtDecode(response.credential)
        // setUser(userObject)
        // console.log(userObject)
        // localStorage.setItem("user", JSON.stringify(userObject))
        checkUser(userObject)
      } 
      
      function checkUser(userObject) {
        setLoading(true)
        axios({
          method: 'POST',
          url: 'https://yearbook-backend-5algm.ondigitalocean.app/profile/check',
          data: userObject
        })
          .then(function (response) {
            if(response.data.authorised===0){
              isAuth(false)
              setLoading(false)
              setTimeout(() => {
                isAuth(true)
              }, 5000);
            }
            else{
              if (response.data.exists) {
                setLoading(false)
                // console.log("id: " + response.data.user._id)
                localStorage.setItem("user", response.data.user._id)
                navigate(`/profile/${response.data.user._id}`)
              } else {
                navigate('/form', { state: userObject })
              }
            }
           
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    
    
    return(
        <Box overflowX="hidden"
        bg="#141414"
        className="noselect landing">
            <Navbar />
            <Box w="80%" marginInline="auto" pb="4rem" mt="7rem" mb="5rem">
            <VStack spacing="1rem" marginInline="auto" >
                <Text fontWeight={800} fontSize={isSmallerThan800?"2rem":"4rem"} color="white">
                    hope you liked it 🌱</Text>
                <Text fontWeight={600} fontSize="1.2rem" color="#B3B3B3" 
                w={isSmallerThan800?"70%":"45%"} mb="3rem !important" align="center">
                    hey let's make something good for the graduating batch
                </Text>
                <Devs />
            </VStack>
            </Box>
            <Footer />
        </Box>

    )
}