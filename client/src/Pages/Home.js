import React from "react"
import jwtDecode from "jwt-decode"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Box, Flex, Text, Button, Spacer, Grid, GridItem, Image, Link, Center, Icon, createIcon } from '@chakra-ui/react';

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

  //   return (
  //     <div id="Home">
  //       <div id="signInDiv"></div>
  //     </div>)
  // }

  return (
    <>
      <Box bg="#0F0F0F" pl="100px" pt="50px" pb="50px" pr="100px">

        {/* Navbar */}
        <Flex borderWidth={1} borderRadius={10} backdropBlur={10}
          borderColor="linear-gradient(92.53deg, #B5D2FF 2.36%, #2094FF 18.96%, #C34FFA 28.09%, #FF6187 41.77%, #F8D548 51.61%);"
        >
          <Text fontSize="2xl" color="white" p={3} pl={6}>SARC</Text>
          <Spacer />
          <Flex width="100%" maxW="500px" align={'center'}>
            <Link fontSize="s" color="white" p={4}>home</Link>
            <Link fontSize="s" color="white" p={4}>about</Link>
            <Link fontSize="s" color="white" p={4}>contact</Link>
            <Link fontSize="s" color="white" p={4}>developers</Link>
          </Flex>
          <Spacer />
          <Box id="signInDiv" p={2}>
          </Box>
        </Flex>
        {/* End Navbar */}

        <Spacer height={150} />

        {/* Hero */}
        <Box>
          <Grid templateColumns='repeat(2, 1fr)'>
            <Grid templateRows='4fr 1fr 3fr' >
              <Text fontSize={80} color="white" fontWeight={800} bgClip="linear(to-l, #7928CA, #FF0080)">
                let's make the yearbook fun this time ⌛️</Text>
              <Text fontSize={24} color="white">hey let's make something good for the graduating batch and idk why are you so free and reading this lol jk have fun</Text>
              <Grid templateRows='repeat(2, 1fr)'>
                <Grid templateColumns='repeat(2, 1fr)' s>
                  <Grid templateRows='1fr 1fr'>
                    <Text fontSize={56.32} color="white" fontWeight={800}>
                      5.3K+
                    </Text>
                    <Text fontSize={18.02} color="#B3B3B3" fontWeight={500}>
                      captions
                    </Text>
                  </Grid>
                  <Grid templateRows='1fr 1fr'>
                    <Text fontSize={'5xl'} color="white" fontWeight={800}>
                      486
                    </Text>
                    <Text fontSize={'lg'} color="#B3B3B3" fontWeight={500}>
                      yearbook quotes
                    </Text>
                  </Grid>
                </Grid>
                <Grid templateColumns='repeat(2, 1fr)'>
                  <Grid templateRows='1fr 1fr'>
                    <Text fontSize={'5xl'} color="white" fontWeight={800}>
                      42
                    </Text>
                    <Text fontSize={'lg'} color="#B3B3B3" fontWeight={500}>
                      branches
                    </Text>
                  </Grid>
                  <Grid templateRows='1fr 1fr'>
                    <Text fontSize={'5xl'} color="white" fontWeight={800}>
                      250k+
                    </Text>
                    <Text fontSize={'lg'} color="#B3B3B3" fontWeight={500}>
                      visits in past 30 days
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box>
              <Image src="../images/Group21.png" alt="yearbook" p={10} />
            </Box>
          </Grid>
        </Box>
        {/* End Hero */}

        {/* howItWorks */}
        <Box>
          <Text fontSize={80} color="#fff" fontWeight={800} align={'center'}>how it <Box fontStyle="italic" display="inline" fontFamily="EB Garamond" >works?</Box> </Text>
          <Grid templateRows='2fr 3fr'>
            <Box bgColor={"#2094FF"} opacity="0.25" border="2px" borderColor="#A7D5FF" borderRadius="24px" boxShadow={"0px 0px 10px #2094FF"}>
              <Grid templateColumns={'1fr 1fr'}>
                <Grid templateRows='1fr 1fr 1fr'>
                  <Image src="../images/Group 11.png" alt="yearbook" p={10} />
                </Grid>
              </Grid>
            </Box>
            <Grid templateColumns='4fr 1.5fr'>
              <Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* howItWorks Ended */}

      </Box >
    </>
  )
}