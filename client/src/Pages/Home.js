import React from "react"
import jwtDecode from "jwt-decode"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Box } from '@chakra-ui/react';
import Footer from "./Components/Footer";
import Logo from "./Components/Navbar"
import Hero from "./Components/Hero"
import Working from "./Components/Working"
import Walkthrough from "./Components/Walkthrough";



export default function Home() {

  function checkUser(userObject) {
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:3001/profile/check',
      data: userObject
    })
      .then(function (response) {
        if (response.data.exists) {
          navigate('/profile', { state: userObject })
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
    setUser(userObject)
    localStorage.setItem("user", JSON.stringify(userObject))
    checkUser(userObject)
  }

  const [user, setUser] = React.useState({})
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
          theme: "outline", size: "large"
        }

      )
      google.accounts.id.prompt();
    }

    if (localStorage.getItem("user") !== null) {
      const userObject = JSON.parse(localStorage.getItem("user"))
      localStorage.setItem("user", JSON.stringify(userObject))
      checkUser(userObject)
    }


    // to logout just run localstorage.clear(); and navigate to /

  }, [])

  return (
      <Box bg="#141414" pl="100px" pt="50px" pb="50px" pr="100px">
        <Logo />
        <Hero />
        <Working />
        <Walkthrough/>
        <Footer />
      </Box>
  )
}