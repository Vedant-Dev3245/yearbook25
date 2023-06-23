import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios";
import { Box, Input, Flex, Heading, Text, FormLabel, FormControl, FormHelperText, Button, Textarea, SimpleGrid, GridItem, Image, useMediaQuery, Alert, AlertIcon, Link } from "@chakra-ui/react"
import { storage } from '../Firebase'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function Form() {
    const validID = new RegExp('2019[ABD][1-9AB]([A][1-9AB]|PS|TS)[0-2][0-9][0-9][0-9]P|2021H1[0-9][0-9][0-2][0-9][0-9][0-9]P|2019D2PS[0-2][0-9][0-9][0-9]P|2017HS461082P|2017HS531187P')
    const location = useLocation()
    const data = location.state;
    const [formInfo, setFormInfo] = React.useState({
        // firstName: 'shwetabh',
        firstName: data.given_name,
        // lastName: 'niket',
        lastName: data.family_name || "",
        quote: "",
        id: "",
        email: data.email,
        pEmail: "",
        imgUrl: "",
        phone: ""
    })
    const [img, setImg] = React.useState();
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [imgExist, setImgExist] = React.useState(false)
    const [error, setError] = React.useState(false)
    // const [emailErr, setEmailErr] = React.useState(false);
    const [valid, setValid] = React.useState(false);

    function validate(e) {
        if (validID.test(formInfo.id)) {
            setValid(true);
            // console.log(valid);
            if (formInfo.id !== ""
                && formInfo.quote !== ""
                && formInfo.phone !== ""
                && formInfo.pEmail !== ""
                && imgExist) {
                // ) {
                e.target.disabled = true 
                axios({
                    method: 'POST',
                    // url: 'some/api',
                    url: `${process.env.REACT_APP_BACKEND_URL}/auth/add`,
                    data: { ...formInfo, token: localStorage.google_token }
                })
                    .then(function (response) {
                        if (response.data.detail === "Profile created") {
                            localStorage.setItem("user", response.data._id)
                            localStorage.setItem("token",response.data.token)
                            navigate(`/profile/${response.data._id}`)
                        }
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
            else{
                setError(true);
            setTimeout(() => {
                setError(false)
            }, 2000);
            }
        } else {
            setValid(false);
            alert("Please enter a valid BITS ID (eg. 2019A7PS0060P")
            
        }
    }
    const [isSmallerThan900] = useMediaQuery('(max-width: 900px)')
    const [isSmallerThan1100] = useMediaQuery('(max-width: 1100px)')
    const [isSmallerThan500] = useMediaQuery('(max-width: 500px)')
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
    function onImageChange(e) {
        const imageFile = e.target.files[0]
        // console.log(imageFile)
        setImg(URL.createObjectURL(imageFile))
        // console.log(URL.createObjectURL(imageFile))
        setImgExist(true)
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
                    // console.log(downloadURL)
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
        validate(e);
        // if (valid) {
           
        //     else {
        //         // <Alert status='error'>
        //         //     <AlertIcon />
        //         //         There was an error processing your request
        //         // </Alert>
               
        //     }
        // }
        // else{
            
        // }
    }
    return (
        <Flex flexDirection={isSmallerThan900 ? 'column' : 'row'} minHeight="100vh" bg="black" >
            <Flex w={isSmallerThan900 ? '100%' : '60%'} backgroundImage="url('https://user-images.githubusercontent.com/69129797/182023922-d7ea77b0-0619-4775-af32-5b34dbe00e8b.png')" bgPosition="center"
                bgRepeat="no-repeat" bgSize="cover" align="center" justify="center">
                <Box boxShadow="0px 1px 24px 1px rgba(0, 0, 0, 0.15)" bg="#242323"
                    w="80%" color="white" border="3px" borderStyle="solid"
                    borderColor="white.300" borderRadius="20px"
                    marginBlock={isSmallerThan900 ? '2rem' : 0}>

                    <Box pl={isSmallerThan500 ? '1.2rem' : '3rem'}>
                        <Heading mt="5rem" fontSize={isSmallerThan1100 ? '3rem' : '3.6rem'}>join your <Box fontStyle="italic" display="inline" fontFamily="EB Garamond" >batchies</Box> </Heading>
                        <Text fontWeight="600" color="#B3B3B3" mt="1rem">note: please refer to this  <Link fontWeight={800} textDecor="underline" href="https://shreyakhubber.notion.site/shreyakhubber/Yearbook-Portal-a40d3dfec7714184b04812205daf62e6">document</Link> before submitting your photo and quote for the yearbook portal.</Text>
                        <Box mt="2rem">
                            <FormControl mt="4rem">
                                <SimpleGrid columns={2} columnGap={2} rowGap={4} w="full" >
                                    <GridItem colSpan={1}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="firstName"
                                            fontSize="20px"
                                            fontWeight="600"
                                        >first name</FormLabel>
                                        <Input disabled={true} opacity="1 !important" id="firstName" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your first name here" name="firstName" type="text" value={formInfo.firstName} />
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="lastName"
                                            fontSize="20px"
                                            fontWeight="600"
                                        >last name</FormLabel>
                                        <Input disabled={true} opacity="1 !important" id="lastName" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your last name here" name="lastName" type="text" value={formInfo.lastName} />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="email"
                                            fontSize="20px"
                                            fontWeight="600"
                                        >personal email</FormLabel>
                                        <Input pattern="f20[1-2]\d\d\d\d\d@pilani\.bits-pilani\.ac\.in" opacity="1 !important" w="90%" id="email" onChange={handleChange} p="1.2rem 0.8rem" placeholder="enter your personal mail here" name="pEmail" type="text" value={formInfo.pEmail} />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="id"
                                            fontSize="20px"
                                            fontWeight="600"
                                        >bits id</FormLabel>
                                        <Input w="90%" id="id" pattern="20[1-2]\d[A-B][1-8]([A-B][1-5])?PS\d\d\d\dP" onChange={handleChange} p="1.2rem 0.8rem" placeholder="enter your id number here" name="id" type="text" value={formInfo.id} />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="phone"
                                            fontSize="20px"
                                            fontWeight="600"
                                        >phone</FormLabel>
                                        <Input w="90%" id="phone" pattern="20[1-2]\d[A-B][1-8]([A-B][1-5])?PS\d\d\d\dP" onChange={handleChange} p="1.2rem 0.8rem" placeholder="enter your 10 digit phone number here" name="phone" type="number" value={formInfo.phone} />
                                    </GridItem>

                                    <GridItem colSpan={2}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="quote"
                                            fontSize="20px"
                                            fontWeight="600"
                                        >yearbook quote</FormLabel>
                                        <Textarea w="90%" maxLength="140" borderColor="#444" size="sm" resize="none" id="quote" onChange={handleChange} p="0.8rem" placeholder="enter your yearbook quote here" name="quote" value={formInfo.quote} />
                                        <FormHelperText mt="0.4rem" mb="6rem">{formInfo.quote.length}/140 characters used</FormHelperText>
                                    </GridItem>
                                </SimpleGrid>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
            </Flex>
            <Flex color="white" w={isSmallerThan900 ? '100%' : '40%'} bg="#242323" textAlign="center" justify="center" >
                <Box spacing={2}>
                    <Box mt="8rem"> <Input cursor="pointer" id="file" type="file" onChange={onImageChange} accept="image/*" position="absolute" right="100vw" overflow="hidden" />
                        <FormLabel htmlFor="file" position="relative">
                            <Text display={imgExist ? "none" : "block"} textAlign="center" fontWeight="600">insert picture here</Text>
                            <Image src={imgExist ? img : '../images/pic.png'} margin="auto" cursor="pointer" w="300px" h="300px" borderRadius="48px" />

                        </FormLabel>
                    </Box>
                    <Box fontFamily="Gilmer" fontSize="3rem" mt="2rem" fontWeight="800" lineHeight="2.8rem" >
                        {formInfo.firstName.toUpperCase()} <br />{formInfo.lastName.toUpperCase()}
                    </Box>
                    <Box fontSize="1.2rem" mt="1.6rem" color="#B3B3B3" fontWeight="600">
                        {formInfo.email}
                    </Box>
                    <Box fontSize="1.2rem" color="#B3B3B3" fontWeight="600">
                        {formInfo.id}
                    </Box>
                    <Box fontSize="1.8rem" color="#B3B3B3" letterSpacing="-0.1rem" fontFamily="Gilroy" fontStyle="italic" fontWeight="700" w="60%" marginInline="auto" marginBlock="2rem" lineHeight="1.8rem">
                        {' "' + formInfo.quote + '" '}
                    </Box>
                    <Button disabled={isDisabled} className="button" onClick={handleSubmit} mb={isSmallerThan900 ? '3rem' : '0'} _hover={{ transform: "translate(-2px, -2px)", bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" }} bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" fontWeight="700" p="2.4rem 3.2rem" fontSize="2rem" colorScheme="blackAlpha">submit</Button>
                </Box>
            </Flex>
            <Alert bg="#242323" color="white" status='error' display={error ? "block" : "none"} position="absolute" w="40%" bottom="0" right="0">
                <AlertIcon />
                Please enter all the fields.
            </Alert>
        </Flex>
    )
}
