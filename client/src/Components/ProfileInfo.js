import {
    Box, Flex, Modal, ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, Text, VStack, Image, FormLabel, Textarea, FormHelperText, Button, Input, FormControl, useMediaQuery
} from "@chakra-ui/react";
import React from "react";
import { Icon } from "@chakra-ui/react";
import { TbPencil } from "react-icons/tb"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { storage } from '../Firebase'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function ProfileInfo(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [ownProfile, setOwnProfile] = React.useState()
    const [showEdit, setShowEdit] = React.useState()
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    const [isDisabled, setIsDisabled] = React.useState(false)
    // const [imgExist, setImgExist] = React.useState(false)
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
        const storageRef = ref(storage, `files/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on("state_changed",
            (snapshot) => {
                setIsDisabled(true)
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL)
                    setIsDisabled(false)
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
            url: `http://localhost:3001/profile/edit/${currentUser}`,
            data: formInfo
        })
            .then(function (response) {
                if (response.data.msg === "Successfully Updated") {
                    navigate(`/profile/${formInfo.id}`)
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
    axios({
        method: 'POST',
        url: "http://127.0.0.1:3001/nominate",
        data: nominateData
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
        });
}



return (

    <Flex className="infoFlex" alignItems="center" marginInline="auto" w="90%" mt="-4rem" p="1.2rem 0rem" justifyContent="space-between">

        <Modal isOpen={isOpen} onClose={1} >
            <ModalOverlay />
            <ModalContent color="white" p="0.6rem" backgroundImage="url('../images/light.png')" backgroundSize={"cover"} borderRadius="20px">
                <Box border="3px solid #FFFFFF" borderRadius="20px" backdropFilter="blur(47.5676px)" bgColor="#1D1E22">
                    <ModalHeader mt="2rem" fontSize="2rem">update your details</ModalHeader>
                    <ModalCloseButton onClick={handleClose} />
                    <ModalBody mt="-0.5rem" fontSize="1rem" color="#B3B3B3">
                        put the instructions in the google docs here in    the form of bullet points like this: <br />
                        wish to do anything with it,<br />
                        google docs here in the form<br />
                        2020A7PS1508P great stuff
                        <FormControl mt="2rem"><Input cursor="pointer" id="file" type="file" onChange={onImageChange} accept="image/*" position="absolute" right="100vw" overflow="hidden" />
                            <FormLabel htmlFor="file" position="relative">
                                <Image src={img} margin="auto" cursor="pointer" w="8rem" h="8rem" borderRadius="48px" />
                            </FormLabel>
                            <FormLabel
                                cursor="pointer"
                                htmlFor="quote"
                                fontSize="20px"
                                fontWeight="600"
                            >yearbook quote</FormLabel>
                            <Textarea w="90%" maxLength="280" borderColor="#444" size="sm" resize="none" id="quote" onChange={handleChange} p="0.8rem" placeholder="enter your yearbook quote here" name="quote" value={formInfo.quote} />
                            <FormHelperText mt="0.4rem" mb="2rem">{formInfo.quote.length}/280 characters used
                            </FormHelperText>
                            <Flex justifyContent={"center"}>
                                <Button disabled={isDisabled} onClick={handleSubmit} _hover={{ color: "black", bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" }} bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" fontWeight="700" p="1.6rem 2rem" fontSize="1.2rem" colorScheme="blackAlpha">submit</Button>
                            </Flex>
                        </FormControl>
                    </ModalBody>
                </Box>
            </ModalContent >
        </Modal>
        <Flex alignItems="center" flexDirection={isSmallerThan800 ? "column" : "row"} justifyContent="center">
            <Box className="imageCont" bg={`url(${props.imgUrl})`} w="15rem" h="15rem" position="relative" bgColor="grey" borderRadius="50%" border="2px solid #E1D4D4;" bgPosition={"center"} bgSize="cover">
                <Box cursor={"pointer"} onClick={handleOpen} position="absolute" display={showEdit ? "block" : "none"} top="0" right="0px" p="1rem" h="4rem" w="
                4rem" className="pencil"><Icon w="2rem" h="2rem" as={TbPencil} /></Box>

            </Box>
            <VStack alignItems="baseline" ml="3rem" mt="4rem">
                <Text color="white"
                    fontWeight={700}
                    letterSpacing="0.08rem"
                    fontSize="2.2rem">{props.name.toLowerCase()}</Text>
                <Text color="#B3B3B3"
                    fontWeight={300}
                    opacity="0.75"
                    fontSize="1.2rem">{props.id} | {props.discipline}</Text>
                <Box w={isSmallerThan800 ? "80%" : "55%"}>
                    <Text mt="1rem" color="#DAE6FF" fontWeight="700" fontSize="1.2rem">{props.quote}</Text>
                </Box>
            </VStack>
        </Flex>
        <Box ml={isSmallerThan800 ? "0" : "14rem"} mt={isSmallerThan800 ? "2rem" : "0"} cursor={"pointer"} bgColor="rgba(255, 255, 255, 0.1)" border="0.6px solid #C9C9C9" padding="0.6rem 1rem" borderRadius="20px" fontWeight="700" onClick={ownProfile ? handleLogout : nominate} >{ownProfile ? "logout" : "nominate this friend"}</Box>
    </Flex >
)
}