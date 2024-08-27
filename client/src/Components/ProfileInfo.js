import {
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  HStack,
  Image,
  FormLabel,
  Textarea,
  FormHelperText,
  Button,
  Input,
  FormControl,
  Checkbox,
  useMediaQuery,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React from "react";
import { Icon } from "@chakra-ui/react";
import { TbPencil } from "react-icons/tb";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Tags from "./Tags"

export default function ProfileInfo(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenRequest, setIsOpenRequest] = React.useState(false);
  const [ownProfile, setOwnProfile] = React.useState();
  const [showEdit, setShowEdit] = React.useState();
  const [spin, setSpin] = React.useState(false);
  const [spin2, setSpin2] = React.useState(false);
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  const [msg, setMsg] = React.useState("");
  const [res, setRes] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [imgExist, setImgExist] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState({
    quote: "",
    imgUrl: "",
  });
  const [img, setImg] = React.useState();
  const [submitToggle, setSubmitToggle] = React.useState(true);
  const navigate = useNavigate();
  const params = useParams();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormInfo((prevFormInfo) => {
      return {
        ...prevFormInfo,
        [name]: value,
      };
    });
  }

  React.useEffect(() => {
    if (window.location.href.includes(localStorage.getItem("user"))) {
      setShowEdit(true);
      setOwnProfile(true);
    } else {
      setShowEdit(false);
      setOwnProfile(false);
    }
  }, [window.location.href]);

  function onImageChange(e) {
    const imageFile = e.target.files[0];
    setImg(URL.createObjectURL(imageFile));
    setImgExist(true);
    console.log(`${localStorage.getItem("userName")}${uuidv4()}.${imageFile.name.split(".").pop()}`)
    const uniqueFileName = `${localStorage.getItem("userName")}${uuidv4()}.${imageFile.name.split(".").pop()}`; // generate unique filename
    const storageRef = ref(storage, `files/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setSpin2(true);
        setIsDisabled(true);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log(downloadURL)
          setIsDisabled(false);
          setSpin2(false);
          setFormInfo((prevFormInfo) => {
            return {
              ...prevFormInfo,
              imgUrl: downloadURL,
            };
          });
        });
      }
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    let currentUser = localStorage.getItem("user");
    axios({
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/profiles/edit`,
      data: formInfo,
    })
      .then(function (response) {
        if (response.data.msg === "Successfully Updated") {
          let user = localStorage.getItem("user");
          document.location.reload();
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleClose = () => {
    setIsOpen(false);
  };
  React.useEffect(() => {
    setIsOpen(false);
  }, [window.location.href]);

  const handleOpen = () => {
    setIsOpen(true);
  };
  // console.log(props.img)
  // console.log(props.img.data)
  function handleLogout() {
    localStorage.clear();
    navigate("/");
    document.location.reload();
  }

  const [captionData, setCaptionData] = React.useState({
    caption: "",
    targetId: params.id,
  });
  function nominate() {
    let nominateData = {
      senderId: localStorage.getItem("user"),
      senderName: localStorage.getItem("userName"),
      receiverId: params.id,
    }
    setSpin(true);
    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/nominations/nominate`,
      data: nominateData,
    })
      .then(function (res) {
        console.log(nominateData);
        console.log(res);
        setMsg(res.data.msg);
        setIsOpenRequest(false);
        setRes(true);
        setSpin(false);
        setTimeout(() => {
          setRes(false);
        }, 3000);
      })
      .catch(function (err) {
        console.log(err);
        setSpin(false);
      });
  }
  // console.log(localStorage.getItem("nominatedBy").search(localStorage.getItem('friend')) !== -1);


  function handleChangeRequest(event) {
    const { name, value } = event.target;
    setCaptionData((prevCaptionData) => {
      return {
        ...prevCaptionData,
        [name]: value,
      };
    });
  }
  function sendRequest() {
    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: localStorage.getItem("nominatedBy").search(params.id) !== -1 ? `${process.env.REACT_APP_BACKEND_URL}/profiles/${params.id}/caption` : `${process.env.REACT_APP_BACKEND_URL}/nominations/requests`,
      data: captionData,
    })
      .then(function (res) {
        console.log(res);
        setIsOpenRequest(false);
        if (res.data.success) {
          window.location.reload();
        }
      })
      .catch(function (err) {
        console.log(err);
        setSpin(false);
      });
  }
  const handleOpenRequest = () => {
    setIsOpenRequest(true);
    setIsOpen(false);
  };
  const handleCloseRequest = () => {
    setIsOpenRequest(false);
  };
  React.useEffect(() => {
    setIsOpenRequest(false);
  }, []);

  function toggleSubmit() {
    if (submitToggle) {
      setSubmitToggle(false);
    } else {
      setSubmitToggle(true);
    }
  }

  /* senior club tag temp */
  const commitments = ['SARC', 'WSC', 'Comdey Club', 'Department of Sponz','PIEDS', 'CEL', 'Mechanical Engineering Assoc'];
  return (
    <Flex
      className="infoFlex"
      alignItems="center"
      marginInline="auto"
      w="90%"
      mt="-4rem"
      p="1.2rem 0rem"
      justifyContent="space-between"
    >
      <Modal isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          color="white"
          p="0.6rem"
          backgroundImage="url('https://user-images.githubusercontent.com/69129797/182023922-d7ea77b0-0619-4775-af32-5b34dbe00e8b.png')"
          backgroundSize={"cover"}
          borderRadius="20px"
          maxH="500px" maxW="550px"
        >
          <Box
            border="3px solid #FFFFFF"
            borderRadius="20px"
            backdropFilter="blur(47.5676px)"
            bgColor="#1D1E22"
            maxH="480px" maxW="550px"
          >
            <ModalHeader
              fontSize={isSmallerThan800 ? "1rem" : "2rem"}
              textAlign="center"
              fontWeight={1100}
            >
              update your profile
            </ModalHeader>
            <ModalCloseButton onClick={handleClose} />
            <ModalBody
              mt="-0.5rem"
              fontSize={isSmallerThan800 ? "0.4rem" : "0.8rem"}
              textAlign="center"
              color="#B3B3B3"
              mb="1rem"
              maxH="500px" maxW="550px"
            >
              <Text fontWeight="600" color="#B3B3B3">
                note: please refer to this{" "}
                <Link
                  fontWeight={800}
                  textDecor="underline"
                  color="#FFF"
                  href="https://shreyakhubber.notion.site/shreyakhubber/Yearbook-Portal-a40d3dfec7714184b04812205daf62e6"
                >
                  document
                </Link>{" "}
                before submitting your photo and quote for the yearbook portal.
              </Text>
              <FormControl mt={isSmallerThan800 ? "1rem" : "2rem"}>
                <Flex justifyContent="space-between" mx="2rem">
                  <Box>
                    <Input
                      cursor="pointer"
                      id="file"
                      type="file"
                      onChange={onImageChange}
                      accept="image/*"
                      position="absolute"
                      right="100vw"
                      overflow="hidden"
                    />
                    <FormLabel
                      htmlFor="file"
                      textAlign={"center"}
                      fontWeight="700"
                      fontSize={isSmallerThan800 ? "0.4rem" : "0.8rem"}
                      pb={2}
                    >
                      {" "}
                      please upload a 1080*1080 <br /> image to avoid cuts
                      <Image
                        src={imgExist ? img : props.imgUrl}
                        margin="auto"
                        cursor="pointer"
                        w="6rem"
                        h="6rem"
                      />
                      <Spinner
                        size="lg"
                        mt="1rem"
                        position="absolute"
                        display={spin2 ? "block" : "none"}
                      />
                    </FormLabel>
                  </Box>
                  <Box>
                    <FormLabel
                      cursor="pointer"
                      htmlFor="quote"
                      fontSize="16px"
                      fontWeight="600"
                    >
                      yearbook quote
                    </FormLabel>
                    <Textarea
                      w="90%"
                      maxLength="140"
                      borderColor="#444"
                      size="sm"
                      resize="none"
                      id="quote"
                      onChange={handleChange}
                      p="0.8rem"
                      placeholder="enter your yearbook quote here"
                      name="quote"
                      value={formInfo.quote}
                    />
                    <FormHelperText
                      mt="0.4rem"
                      mb={isSmallerThan800 ? "1rem" : "2rem"}
                    >
                      {formInfo.quote.length}/140 characters used
                    </FormHelperText>
                  </Box>
                </Flex>
                <HStack spacing={1} mx="1rem" wrap="wrap">
                  {commitments.map((commitment, index) => (
                    <Tags key={index} commitments={commitment} />
                  ))} </HStack>
                <Flex justifyContent={"center"}>
                  <Button
                    disabled={isDisabled}
                    onClick={handleSubmit}
                    _hover={{
                      transform: "translate(-2px, -2px)",
                      bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)",
                    }}
                    bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)"
                    fontWeight="700"
                    p="1.6rem 2rem"
                    fontSize="1.2rem"
                    colorScheme="blackAlpha"
                  >
                    submit
                  </Button>
                </Flex>
              </FormControl>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
      <Flex
        alignItems="center"
        flexDirection={isSmallerThan800 ? "column" : "row"}
        justifyContent="center"
      >
        <Box
          className="imageCont"
          bg={`url("${props.imgUrl}")`}
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
          {
            <Box
              cursor={"pointer"}
              onClick={handleOpen}
              position="absolute"
              display={showEdit ? "block" : "none"}
              top="0"
              right="0px"
              p="1rem"
              h="4rem"
              w="
                4rem"
              className="pencil"
            >
              <Icon w="2rem" h="2rem" as={TbPencil} />
            </Box>
          }
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
            {props.name.toLowerCase()}
          </Text>
          <Text
            color="#B3B3B3"
            fontWeight={300}
            opacity="0.75"
            fontSize="1.2rem"
          >
            {props.id} | {props.discipline}
          </Text>
          <Box w="80%">
            <Text
              textAlign={isSmallerThan800 ? "center" : "left"}
              mt={isSmallerThan800 ? "0.4rem" : "1rem"}
              color="#DAE6FF"
              fontWeight="700"
              fontSize="1.2rem"
            >
              {props.quote}
            </Text>
          </Box>
          <HStack spacing={1} max-width="200px">
            {commitments.map((commitment, index) => (
              <Tags key={index} commitments={commitment} />
            ))} </HStack>
        </VStack>
      </Flex>

      {
        !ownProfile && (
          <Box
            mr={isSmallerThan800 ? "0" : "2rem"}
            w="max-content"
            whiteSpace={"nowrap"}
            textAlign="center"
            position="relative"
            mt={isSmallerThan800 ? "2rem" : "0"}
            cursor={"pointer"}
            bgColor="rgba(255, 255, 255, 0.1)"
            fontSize="1rem"
            border="0.6px solid #C9C9C9"
            padding="0.6rem 1rem"
            borderRadius="20px"
            fontWeight="700"
            onClick={ownProfile ? handleLogout : handleOpenRequest}
          >
            write on their wall
          </Box>
        )
      }

      <Box
        w="max-content"
        whiteSpace={"nowrap"}
        textAlign="center"
        position="relative"
        mt={isSmallerThan800 ? "2rem" : "0"}
        cursor={"pointer"}
        bgColor="rgba(255, 255, 255, 0.1)"
        fontSize="1rem"
        border="0.6px solid #C9C9C9"
        padding="0.6rem 1rem"
        borderRadius="20px"
        fontWeight="700"
        onClick={ownProfile ? handleLogout : nominate}
      >
        {ownProfile ? "logout" : "nominate this user"}
        <Spinner
          size="lg"
          mt="1rem"
          position="absolute"
          display={spin ? "block" : "none"}
        />

        {/* Requesting people to write on their wall-Modal open for that */}
        <Modal isOpen={isOpenRequest}>
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalContent
            backdropFilter="blur(47.5676px)"
            bgColor="#1D1E22"
            color="white"
            p="1.4rem"
          >
            <ModalHeader mt="2rem" fontSize="2rem">
              write caption for {props.name}
            </ModalHeader>
            <ModalCloseButton onClick={handleCloseRequest} />
            <ModalBody mt="0.5rem" fontSize="1rem" w="100%">
              <Textarea
                type="text"
                name="caption"
                placeholder="enter your caption!"
                onChange={handleChangeRequest}
              />
              <Text fontWeight="600" color="#B3B3B3" mt="1rem">
                You must accept these guidelines before writing a caption<br /><br />
                1. The quote must only be written in English. Refrain from using any other script or emojis.<br />
                2. Offensive quotes will not be accepted. Your quote must not defame or criticize any individual.<br />
                3. Please refrain from using any expletives.<br />
              </Text>
              <br />
              <Checkbox onChange={toggleSubmit}>
                I accept these terms.
              </Checkbox>
              <Flex justifyContent="center">
                <Button
                  onClick={sendRequest}
                  _hover={{
                    transform: "translate(-2px, -2px)",
                    bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)",
                  }}
                  bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)"
                  fontWeight="700"
                  mt="3rem"
                  p="1.2rem 1.6rem"
                  fontSize="1.4rem"
                  colorScheme="blackAlpha"
                  isDisabled={submitToggle}
                >
                  request
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
        {/* Requesting people to write on their wall-Modal open for that */}

        <Alert
          bg="#242323"
          color="white"
          status="success"
          display={!isSmallerThan800 && res ? "block" : "none"}
          position="absolute"
          w="100%"
          whiteSpace={"normal"}
          bottom="-8rem"
          left="0"
          borderRadius="20px"
        >
          <AlertIcon />
          {msg}
        </Alert>
        <Alert
          bg="#242323"
          color="white"
          status="success"
          display={isSmallerThan800 && res ? "block" : "none"}
          position="fixed"
          w="60%"
          top="8rem"
          left="20%"
          borderRadius="20px"
        >
          <AlertIcon />
          {msg}
        </Alert>
      </Box>
    </Flex >
  );
}
