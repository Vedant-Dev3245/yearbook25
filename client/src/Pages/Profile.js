import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import ProfileInfo from "../Components/ProfileInfo";
import ProfileNav from "../Components/ProfileNav";
import Interact from "../Components/Interact";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
// import * as fs from 'fs';
// import * as fs from 'fs/promises'
// const base = process.env.REACT_APP_BACKEND_URL

export default function Profile(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState({
    captions: [],
    branchCode: [],
    email: "",
    imageUrl: "",
    name: "",
    nominatedby: [],
    quote: "",
    user_id: "",
    bitsId: "",
  });
  React.useEffect(() => {
    if (
      localStorage.token === undefined ||
      localStorage.token === "undefined"
    ) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
      alert("You have been logged out. Please log-in again!");
    }
  }, [navigate]);
  React.useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/profiles/${params.id}`,
    })
      .then(function (response) {
        console.log("this is from the front end, the response.data is: ", response.data);
        setUser(response.data)
        setLoading(false);
        if (params.id === window.localStorage.getItem("user")) {
          window.localStorage.setItem("userName", response.data.name);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [params.id]);

  React.useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
      window.location.reload();
    }
  }, [params.id, navigate]);

  return (
    <Box
      bg="linear-gradient(144.31deg, #050505 9%, #07111B 32.99%, #130D1F 50.05%, #130C1E 82.44%, #020202 92.26%)"
      color="white"
      overflowX="hidden"
      overflowY="hidden"
    >
      <Flex
        justifyContent={"center"}
        alignItems="center"
        position="fixed"
        zIndex="6"
        w="100%"
        h="120vh"
        display={loading ? "flex" : "none"}
        bg="blackAlpha.400"
        backdropFilter="blur(10px)"
      >
        <ScaleLoader
          color="#D4D4D4"
          loading={loading}
          size={60}
          speedMultiplier={0.7}
        />
      </Flex>
      <ProfileNav />
      <ProfileInfo
        name={user.name}
        quote={user.quote}
        id={user.bitsId}
        discipline={user.branchCode}
        imgUrl={user.imageUrl}
      />
      <Interact
        captions={user.captions}
        nominatedby={user.nominatedby}
        name={user.name}
        id={params.id}
      />
    </Box>
  );
}
