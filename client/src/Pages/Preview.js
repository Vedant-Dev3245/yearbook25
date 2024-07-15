import ScaleLoader from "react-spinners/ScaleLoader";
import {
  Box,
  Flex,
  Text,
  VStack,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import Masonry from "react-masonry-css";
import Cards from "../Components/Cards";

export default function Preview(props) {
  /* ProfileInfo */
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState({
    captions: [],
    discipline: "",
    email: "",
    imageUrl: "",
    name: "",
    nominatedby: [],
    quote: "",
    __v: 0,
    _id: "",
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
        setUser(response.data.user)
        setLoading(false);
        if (params.id === window.localStorage.getItem("user")) {
          window.localStorage.setItem("userName", response.data.user.name);
          window.localStorage.setItem('nominatedBy', JSON.stringify(response.data.user.nominatedby))
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

  /* ProfileInfo */
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenRequest, setIsOpenRequest] = React.useState(false);
  const [ownProfile, setOwnProfile] = React.useState();
  const [showEdit, setShowEdit] = React.useState();
  const [spin, setSpin] = React.useState(false);
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const [msg, setMsg] = React.useState("");
  const [res, setRes] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [imgExist, setImgExist] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState({
    quote: "",
    imgUrl: "",
  });

  React.useEffect(() => {
    if (window.location.href.includes(localStorage.getItem("user"))) {
      setShowEdit(true);
      setOwnProfile(true);
    } else {
      setShowEdit(false);
      setOwnProfile(false);
    }
  }, [window.location.href]);

  React.useEffect(() => {
    setIsOpen(false);
  }, [window.location.href]);

  function screenshot() {
    const srcElement = document.getElementById("scr"),
      btns = document.querySelectorAll("button");
    btns.forEach(btn => { // looping through each btn
      // adding click event to each btn
      btn.addEventListener("click", () => {
        // creating canvas of element using html2canvas
        html2canvas(srcElement).then(canvas => {
          // downloading canvas/screenshot
          const a = document.createElement("a");
          a.href = canvas.toDataURL();
          a.download = "screenshot.jpg";
          a.click();
        });
      });
    });
  }


  const [captionData, setCaptionData] = React.useState({
    caption: "",
    targetId: params.id,
  });

  React.useEffect(() => {
    setIsOpenRequest(false);
  }, []);

  /* Interact */
  const [wallActive, setWallActive] = React.useState(true);
  React.useEffect(() => {
    if (window.location.href.includes(window.localStorage.getItem("user"))) {
      setOwnProfile(true);
    } else {
      setOwnProfile(false);
    }
  });
  React.useEffect(() => {
    setWallActive(true);
  }, [props.id]);

  /* Wall */
  const [capt, setCapt] = React.useState([]);
  const [title, setTitle] = React.useState(false);
  const breakpointColumnsObj = {
    default: 3,
    700: 2,
    500: 1,
  };
  const cards = Array.from(capt).map((person, index) => {
    return (
      <Cards
        name={person.name}
        index={index}
        caption={person.caption}
        img={person.imageUrl}
        bitsId={person.bitsId}
        key={person.id}
      />
    );
  });
  React.useEffect(() => {
    setCapt(user.captions);
  }, [user.captions]);
  React.useEffect(() => {
    if (capt.length === 0) {
      setTitle(true);
    } else {
      setTitle(false);
    }
  }, [capt]);

  return (
    <Box
      w="100%"
      h="100vh"
      backgroundImage="url('https://user-images.githubusercontent.com/69129797/182023922-d7ea77b0-0619-4775-af32-5b34dbe00e8b.png')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      align="center"
      justify="center"
    >
      <Box
        bg="linear-gradient(144.31deg, #050505 9%, #07111B 32.99%, #130D1F 50.05%, #130C1E 82.44%, #020202 92.26%)"
        color="white"
        overflowX="hidden"
        overflowY="scroll"
        w="630px"
        h="690px"
        border="2px solid #E1D4D4;"
        borderRadius="2rem"
        id="scr"
        position="fixed"
        top="12"
        left="8"
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
        <Flex
          className="infoFlex"
          alignItems="center"
          marginInline="auto"
          w="90%"
          mt="2rem"
          p="1.2rem 0rem"
          justifyContent="space-between"
        >
          <Flex
            alignItems="center"
            flexDirection={isSmallerThan800 ? "column" : "row"}
            justifyContent="center"
          >
            <Box
              className="imageCont"
              bg={`url("${user.imageUrl}")`}
              backgroundPosition={"center"}
              backgroundSize={"cover"}
              minWidth="15rem"
              minHeight="15rem"
              position="relative"
              bgColor="grey"
              borderRadius="50%"
              border="2px solid #E1D4D4;"
              bgPosition={"center"}
              bgSize="cover"
            >
            </Box>
            <VStack
              alignItems={isSmallerThan800 ? "center" : "baseline"}
              ml={isSmallerThan800 ? "0" : "3rem"}
              mt={isSmallerThan800 ? "1rem" : "4rem"}
            >
              <Text
                color="white"
                fontWeight={700}
                letterSpacing="0.08rem"
                textAlign={isSmallerThan800 ? "center" : ""}
                fontSize="2.2rem"
              >
                {user.name.toString().toLowerCase()}
              </Text>
              <Text
                color="#B3B3B3"
                fontWeight={300}
                opacity="0.75"
                fontSize="1.2rem"
              >
                {user.bitsId} | {user.bitsId.indexOf("PS") === -1
                  ? user.bitsId.slice(4, 8)
                  : user.bitsId[4] + user.bitsId[5]}
              </Text>
              <Box w="80%">
                <Text
                  textAlign={isSmallerThan800 ? "center" : "left"}
                  mt={isSmallerThan800 ? "0.4rem" : "1rem"}
                  color="#DAE6FF"
                  fontWeight="700"
                  fontSize="1.2rem"
                >
                  {user.quote}
                </Text>
              </Box>
            </VStack>
          </Flex>
        </Flex>
        <Box>
          <Box display="block">
            {/* <Wall
              ownProfile={ownProfile}
              captions={user.captions}
            /> */}
            <Box w="90%" marginInline="auto" pb="4rem">
              <Masonry
                width="100%"
                marginInline="auto"
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {/* {cards} */}
                <Cards
                  name="{user.name}"
                  index="{index}"
                  caption="{person.caption}"
                  img="{person.imageUrl}"
                  bitsId="{person.bitsId}"
                  key="{person.id}"
                />
              </Masonry>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        position="absolute"
        top="12"
        right="8"
      >
        <Button
          w="max-content"
          whiteSpace={"nowrap"}
          textAlign="center"
          position="relative"
          mt={isSmallerThan800 ? "2rem" : "0"}
          cursor={"pointer"}
          bgColor="rgba(255, 255, 255, 0.1)"
          color="black"
          fontSize="1rem"
          border="0.6px solid black"
          padding="0.6rem 1rem"
          borderRadius="20px"
          fontWeight="700"
          onClick={screenshot}
        >
          save memory
        </Button>
      </Box>
    </Box>
  );
}
