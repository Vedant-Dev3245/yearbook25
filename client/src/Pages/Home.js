import React from "react"
import jwtDecode from "jwt-decode"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Alert,AlertIcon, Box, Flex } from '@chakra-ui/react';
import Footer from "../Components/Footer";
import Hero from "../Components/Hero"
import Working from "../Components/Working"
import Walkthrough from "../Components/Walkthrough";
import FAQ from "../Components/FAQ";
import Navbar from "../Components/Navbar";
import ScaleLoader from "react-spinners/ScaleLoader";
import OptIn from "../Components/OptIn";
export default function Home() {
   
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
    // console.log(userObject.family_name===undefined)
    // localStorage.setItem("user", JSON.stringify(userObject))
    checkUser(userObject)
  }

  const [auth, isAuth] = React.useState(true)
  const [loading, setLoading] = React.useState(true)

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

  React.useEffect(()=>{
   
      setTimeout(() => {
        setLoading(false);
      }, 2000);
   
   },[])



  // const [user, setUser] = React.useState({})
  const navigate = useNavigate()


  

  return (
    <Box>The Yearbook Portal is under maintenance. Please check back after some time.</Box>
    // <Box overflowX="hidden"
    //   bg="#141414"
    //   className="noselect landing"
    // >
    //   <Flex justifyContent={"center"} alignItems="center" position="fixed"  zIndex="26" w="100%" h="100vh" display={loading ? "flex" : "none"} bg='blackAlpha.400'
    //   backdropFilter='blur(10px)'><ScaleLoader
    //             color="#D4D4D4"
    //             loading = {loading}
    //             size={60}
    //             speedMultiplier={0.7}
    //         /></Flex>
    //   <Alert bg="#242323" color="white" 
    //   status='error' display={auth ? "none" : "block"} 
    //   position="absolute" w="40%" top="12rem" right="0">
    //             <AlertIcon />
    //             Sorry, you are not authorised to log-in.
    //   </Alert>
    //   <Navbar />
    //   <Hero />
    //   <Working />
    //   <Walkthrough />
    //   <FAQ />
    //   <OptIn/>
    //   <Footer />
    // </Box>
  )
}