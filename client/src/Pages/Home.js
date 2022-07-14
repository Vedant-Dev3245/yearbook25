import React from "react"
import jwtDecode from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { Box } from "@chakra-ui/react"
export default function Home() {

  function handleCallbackResponse(response) {
    var userObject = jwtDecode(response.credential)
    setUser(userObject)
    localStorage.setItem("user", JSON.stringify(userObject))
    console.log(userObject)
    navigate('/form', { state: userObject })
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
      setUser(localStorage.getItem('user'))
      navigate('/form', { state: JSON.parse(localStorage.getItem("user")) })
    }

    // to logout just run localstorage.clear(); and navigate to /

  }, [])

  //   return (
  //     <div id="Home">
  //       <div id="signInDiv"></div>
  //     </div>)
  // }

  return (
    <Box id="Home" h="100vh" bg="beige">
      <Box id="signInDiv">
      </Box>
    </Box>
  )
}
