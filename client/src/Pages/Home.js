import React from "react"
import jwtDecode from "jwt-decode"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Box } from '@chakra-ui/react';
import Footer from "../Components/Footer";
import Hero from "../Components/Hero"
import Working from "../Components/Working"
import Walkthrough from "../Components/Walkthrough";
import FAQ from "../Components/FAQ";
import Navbar from "../Components/Navbar";
import OptIn from "../Components/OptIn";

export default function Home() {

  function checkUser(userObject) {
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:3001/profile/check',
      data: userObject
    })
      .then(function (response) {
        // console.log(response)
        if (response.data.exists) {
          console.log("id: " + response.data.user._id)
          localStorage.setItem("user", response.data.user._id)
          navigate(`/profile/${response.data.user._id}`)
        } else {
          navigate('/form', { state: userObject })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleCallbackResponse(response) {
    var userObject = jwtDecode(response.credential)
    // setUser(userObject)
    // console.log(userObject)
    // localStorage.setItem("user", JSON.stringify(userObject))
    checkUser(userObject)
  }

  // const [user, setUser] = React.useState({})
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
      google.accounts.id.prompt();
    }

    // if (localStorage.getItem("user") !== null) {
    //   const userObject = JSON.parse(localStorage.getItem("user"))
    //   localStorage.setItem("user", JSON.stringify(userObject))
    //   checkUser(userObject)
    // }
    // localStorage.clear()
    // to logout just run localstorage.clear(); and navigate to /

  })

  return (

    <Box overflowX="hidden"
      bg="#141414"
    >
      <Navbar />
      <Hero />
      <Working />
      <Walkthrough />
      <FAQ />
      <OptIn/>
      <Footer />
    </Box>
  )
}