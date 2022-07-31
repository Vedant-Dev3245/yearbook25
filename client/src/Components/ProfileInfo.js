import {
    Box, Flex, Modal, ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, Text, VStack, Image, FormLabel, Textarea, FormHelperText, Button, Input, FormControl, useMediaQuery, Alert, AlertIcon
} from "@chakra-ui/react";
import React from "react";
import { Icon } from "@chakra-ui/react";
import { TbPencil } from "react-icons/tb"
import axios from "axios"
import { Spinner } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { storage } from '../Firebase'   
import {BiImageAdd } from 'react-icons/bi'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function ProfileInfo(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [ownProfile, setOwnProfile] = React.useState()
    const [showEdit, setShowEdit] = React.useState()
    const [spin, setSpin] = React.useState(false)
    const [spin2, setSpin2] = React.useState(false)
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    const[msg,setMsg] = React.useState("")
    const [res, setRes] = React.useState(false)
    const [isDisabled, setIsDisabled] = React.useState(false)
    const [imgExist, setImgExist] = React.useState(false)
    const [formInfo, setFormInfo] = React.useState({
        quote: "",
        imgUrl: ""
    })
    const [img, setImg] = React.useState();
    const navigate = useNavigate()

    function handleChange(event) {
        const { name, value } = event.target
        setFormInfo(prevFormInfo => {
            return {
                ...prevFormInfo,
                [name]: value
            }
        })
    }

    React.useEffect(() => {
        if (window.location.href.includes(localStorage.getItem("user"))) {
            setShowEdit(true)
            setOwnProfile(true)
        }
        else {
            setShowEdit(false)
            setOwnProfile(false)
        }
    })
    // React.useEffect(() => {
    //     if (props.img.type === "Buffer") {

    //         let blob = new Blob(props.img.data, { type: "image/jpeg" })
    //         let file = new File([blob], "name", { type: "image/jpeg" });
    //         setImage(URL.createObjectURL(file))
    //         console.log(file);
    //         console.log(URL.createObjectURL(file))

    //     }
    // }, [props.img])

    function onImageChange(e) {
        const imageFile = e.target.files[0]
        setImg(URL.createObjectURL(imageFile))
        setImgExist(true)
        const storageRef = ref(storage, `files/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on("state_changed",
            (snapshot) => {
                setSpin2(true)
                setIsDisabled(true)
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL)
                    setIsDisabled(false)
                    setSpin2(false)
                    setFormInfo(prevFormInfo => {
                        return {
                            ...prevFormInfo,
                            imgUrl: downloadURL
                        }
                    })


                });
            }
        );
    }
    function handleSubmit(e) {
        e.preventDefault();
        let currentUser = localStorage.getItem("user")
        axios({
            method: 'POST',
            url: `https://yearbook-backend-5algm.ondigitalocean.app/edit/${currentUser}`,
            data: formInfo
        })
            .then(function (response) {
                if (response.data.msg === "Successfully Updated") {
                    // let user = localStorage.getItem("user")
                    document.location.reload()
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

    const handleOpen = () => {
        setIsOpen(true);
    };
    // console.log(props.img)
    // console.log(props.img.data)
    function handleLogout() {
        localStorage.clear()
        navigate("/")
    }
    let nominateData = {
        senderId: localStorage.getItem("user"),
        senderName: localStorage.getItem("userName"),
        receiverId: localStorage.getItem("friend")
    }
    function nominate() {
        setSpin(true)
        axios({
            method: 'POST',
            url: "https://yearbook-backend-5algm.ondigitalocean.app/nominate",
            data: nominateData
        })
            .then(function (res) {
                console.log(res);
                setMsg( res.data.msg);
                setRes(true)
                setSpin(false)
            setTimeout(() => {
                setRes(false)
            }, 3000);
            })
            .catch(function (err) {
                console.log(err);
                setSpin(false)
            });
    }



    return (

        <Flex className="infoFlex" alignItems="center" marginInline="auto" w="90%" mt="-4rem" p="1.2rem 0rem" justifyContent="space-between">

            <Modal isOpen={isOpen}  id="editModal" >
            <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px)'
    />
                <ModalContent color="white" p="0.6rem" backgroundImage="url('../images/light.png')" backgroundSize={"cover"} borderRadius="20px">
                    <Box border="3px solid #FFFFFF" borderRadius="20px" backdropFilter="blur(47.5676px)" bgColor="#1D1E22">
                        <ModalHeader mt={isSmallerThan800 ? "0.5rem" : "2rem"} fontSize={isSmallerThan800 ? "1.5rem" : "2rem"}>update your details</ModalHeader>
                        <ModalCloseButton onClick={handleClose} />
                        <ModalBody mt="-0.5rem" fontSize={isSmallerThan800 ? "0.8rem" : "1rem"} color="#B3B3B3" mb="1rem">
                            put the instructions in the google docs here in    the form of bullet points like this: <br />
                            wish to do anything with it,<br />
                            google docs here in the form<br />
                            2020A7PS1508P great stuff
                            <FormControl mt={isSmallerThan800 ? "1rem" : "2rem"}><Input cursor="pointer" id="file" type="file" onChange={onImageChange} accept="image/*" position="absolute" right="100vw" overflow="hidden" />
                                <FormLabel htmlFor="file" position="relative" textAlign={"center"} fontWeight="700" fontSize={isSmallerThan800 ? "0.8rem" : "1rem"}> please upload a 1080*1080 <br/> image to avoid cuts                                    
                                    <Image src={imgExist? img : props.imgUrl} margin="auto" cursor="pointer" w="10rem" h="10rem" />
                                    <Spinner size="lg" mt="1rem" position="absolute" display={spin2 ? "block" : "none"}/>
                                    <Box position="absolute" top="3rem" left="15%"><BiImageAdd fontSize="3rem"/></Box>
                                </FormLabel>
                                <FormLabel
                                    cursor="pointer"
                                    htmlFor="quote"
                                    fontSize="20px"
                                    fontWeight="600"
                                >yearbook quote</FormLabel>
                                <Textarea w="90%" maxLength="140" borderColor="#444" size="sm" resize="none" id="quote" onChange={handleChange} p="0.8rem" placeholder="enter your yearbook quote here" name="quote" value={formInfo.quote} />
                                <FormHelperText mt="0.4rem" mb={isSmallerThan800 ? "1rem" : "2rem"}>{formInfo.quote.length}/140 characters used
                                </FormHelperText>
                                <Flex justifyContent={"center"}>
                                    <Button disabled={isDisabled} onClick={handleSubmit} _hover={{ transform: "translate(-2px, -2px)" , bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" }} bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" fontWeight="700" p="1.6rem 2rem" fontSize="1.2rem" colorScheme="blackAlpha">submit</Button>
                                </Flex>
                            </FormControl>
                        </ModalBody>
                    </Box>
                </ModalContent >
            </Modal>
            <Flex alignItems="center" flexDirection={isSmallerThan800 ? "column" : "row"} justifyContent="center">
                <Box className="imageCont" bg={`url("${props.imgUrl}")`} backgroundPosition={"center"} backgroundSize={"cover"}  minWidth="15rem" minHeight="15rem" position="relative" bgColor="grey" borderRadius="50%" border="2px solid #E1D4D4;" bgPosition={"center"} bgSize="cover">
                    <Box cursor={"pointer"} onClick={handleOpen} position="absolute" display={showEdit ? "block" : "none"} top="0" right="0px" p="1rem" h="4rem" w="
                4rem" className="pencil"><Icon w="2rem" h="2rem" as={TbPencil} /></Box>

                </Box>
                <VStack alignItems= {isSmallerThan800 ? "center" : "baseline"} ml={isSmallerThan800 ? "0" : "3rem"} mt={isSmallerThan800 ? "1rem" : "4rem"}>
                    <Text color="white"
                        fontWeight={700}
                        letterSpacing="0.08rem"
                        fontSize="2.2rem">{props.name.toLowerCase()}</Text>
                    <Text color="#B3B3B3"
                        fontWeight={300}
                        opacity="0.75"
                        fontSize="1.2rem">{props.id} | {props.discipline}</Text>
                    <Box w="80%">
                        <Text textAlign={isSmallerThan800 ? "center" : "left"} mt={isSmallerThan800 ? "0.4rem" : "1rem"} color="#DAE6FF" fontWeight="700" fontSize="1.2rem">{props.quote}</Text>
                    </Box>
                </VStack>
            </Flex>
            <Box ml={isSmallerThan800 ? "0" : "10rem"} position= "relative" mt={isSmallerThan800 ? "2rem" : "0"} cursor={"pointer"} bgColor="rgba(255, 255, 255, 0.1)" border="0.6px solid #C9C9C9" padding="0.6rem 1rem" borderRadius="20px" fontWeight="700" onClick={ownProfile ? handleLogout : nominate} >{ownProfile ? "logout" : "nominate this friend"}
            <Spinner size="lg" mt="1rem" position="absolute" display={spin ? "block" : "none"}/>
            <Alert bg="#242323" color="white" status='success' display={res ? "block" : "none"} position="absolute" w="100%" bottom="-8rem" left="0" borderRadius="20px">
                <AlertIcon />
                {msg}
            </Alert>
            </Box>
            
        </Flex >
    )
}