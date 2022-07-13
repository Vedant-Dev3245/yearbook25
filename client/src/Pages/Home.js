import React from "react"
import jwtDecode from "jwt-decode"
import {useNavigate} from "react-router-dom"
export default function Home() {

  const [user, setUser] = React.useState({})
  const navigate = useNavigate()
  function handleCallbackResponse(response) {
    var userObject = jwtDecode(response.credential)
    setUser(userObject)
    navigate('/form', {state: userObject})
  }
  React.useEffect(() => {
    /* global google */
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
  }, [])

  return (<div id="Home">
    <div id="signInDiv"></div>

    {user &&
      <div>
        <img src={user.picture} />
        <h3>{user.name}</h3>
      </div>}
  </div>)
}