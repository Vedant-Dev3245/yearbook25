import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios";
import { Box, Input, Flex, Heading, Text, FormLabel, FormControl, FormHelperText, Button, Textarea, SimpleGrid, GridItem, Image, useMediaQuery, extendTheme } from "@chakra-ui/react"
// import { validEmail, validID } from '../Utils.js';

export default function Form() {
    const location = useLocation()
    const data = location.state;
    const [formInfo, setFormInfo] = React.useState({
        firstName: data.given_name,
        lastName: data.family_name,
        quote: "",
        id: "",
        email: data.email
    })
    const [img, setImg] = React.useState();
    const [formImage, setFormImage] = React.useState({ file: null });
    const [imgExist, setImgExist] = React.useState(false)
    const formData = new FormData();

    // const [emailErr, setEmailErr] = React.useState(false);
    // const [IDError, setIDError] = React.useState(false);

    // function validate() {
    //     console.log(formInfo)
    //     if (!validEmail.test(formInfo.email)) {
    //         setEmailErr(true);
    //     } else {
    //         setEmailErr(false);
    //     }
    //     if (validID.test(formInfo.id)) {
    //         setIDError(true);
    //     } else {
    //         setIDError(false);
    //     }
    // }
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
        if (e.target && imageFile) {
            setFormImage({ file: imageFile })
        }
        setImg(URL.createObjectURL(imageFile))
        setImgExist(true)
    }
    function handleSubmit(e) {
        e.preventDefault();
        e.target.disabled = true
        formData.append('image', formImage.file);

        Object.entries(formInfo).map(item => {
            formData.append(item[0], item[1])
        })

        axios({
            method: 'POST',
            url: 'http://127.0.0.1:3001/profile/add',
            data: formData
        })
            .then(function (response) {
                if (response.data.detail === "Profile created") {
                    navigate('/profile')
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <Flex flexDirection={isSmallerThan900 ? 'column' : 'row'} h="100vh" bg="black">
            <Flex w={isSmallerThan900 ? '100%' : '60%'} backgroundImage="url('../images/light.png')" bgPosition="center"
                bgRepeat="no-repeat" bgSize="cover" align="center" justify="center">
                <Box boxShadow="0px 1px 24px 1px rgba(0, 0, 0, 0.15)" bg="#242323" w="80%" color="white" border="3px" borderStyle="solid" borderColor="white.300" borderRadius="20px" marginBlock={isSmallerThan900 ? '2rem' : 0}>

                    <Box pl={isSmallerThan500 ? '1.2rem' : '3rem'}>
                        <Heading mt="5rem" fontSize={isSmallerThan1100 ? '3rem' : '3.6rem'}>join your <Box fontStyle="italic" display="inline" fontFamily="EB Garamond" >batchies</Box> </Heading>
                        <Text color="#B3B3B3" mt="1rem">building yearbook portal for graduating peeps pog</Text>
                        <Box mt="2rem">
                            <FormControl mt="4rem">
                                <SimpleGrid columns={2} columnGap={2} rowGap={4} w="full">
                                    <GridItem colSpan={1}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="firstName"
                                            fontSize="20px"
                                        >first name</FormLabel>
                                        <Input disabled={true} opacity="1 !important" id="firstName" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your first name here" name="firstName" type="text" value={formInfo.firstName} />
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="lastName"
                                            fontSize="20px"
                                        >last name</FormLabel>
                                        <Input disabled={true} opacity="1 !important" id="lastName" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your last name here" name="lastName" type="text" value={formInfo.lastName} />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="email"
                                            fontSize="20px"
                                        >email</FormLabel>
                                        <Input disabled={true} pattern="f20[1-2]\d\d\d\d\d@pilani\.bits-pilani\.ac\.in" opacity="1 !important" w="90%" id="email" onChange={handleChange} p="1.2rem 0.8rem" placeholder="enter your email here" name="email" type="text" value={formInfo.email} />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="id"
                                            fontSize="20px"
                                        >bits id</FormLabel>
                                        <Input w="90%" id="id" pattern="20[1-2]\d[A-B][1-8]([A-B][1-5])?PS\d\d\d\dP" onChange={handleChange} p="1.2rem 0.8rem" placeholder="enter your id number here" name="id" type="text" value={formInfo.id} />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="quote"
                                            fontSize="20px"
                                        >yearbook quote</FormLabel>
                                        <Textarea w="90%" maxLength="280" borderColor="#444" size="sm" resize="none" id="quote" onChange={handleChange} p="0.8rem" placeholder="enter your yearbook quote here" name="quote" value={formInfo.quote} />
                                        <FormHelperText mt="0.4rem" mb="6rem">{formInfo.quote.length}/280 characters used</FormHelperText>
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
                        <FormLabel htmlFor="file">
                            <Image src={imgExist ? img : '../images/pic.png'} margin="auto" cursor="pointer" w="300px" h="300px" borderRadius="48px" />
                        </FormLabel>
                    </Box>
                    <Box fontFamily="Gilmer" fontSize="3rem" mt="2rem" fontWeight="800" lineHeight="2.8rem" >
                        {formInfo.firstName.toUpperCase()} <br />{formInfo.lastName.toUpperCase()}
                    </Box>
                    <Box fontSize="1.2rem" mt="1.6rem" color="#B3B3B3">
                        {formInfo.email}
                    </Box>
                    <Box fontSize="1.2rem" color="#B3B3B3">
                        {formInfo.id}
                    </Box>
                    <Box fontSize="1.8rem" color="#B3B3B3" letterSpacing="-0.1rem" fontStyle="italic" fontWeight="700" w="60%" marginInline="auto" marginBlock="2rem" lineHeight="1.8rem">
                        {' "' + formInfo.quote + '" '}
                    </Box>
                    <Button onClick={handleSubmit} mb={isSmallerThan900 ? '3rem' : '0'} _hover={{ color: "black", bg: "linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" }} bg="linear-gradient(97.22deg, #B5D2FF -20.38%, #2094FF 22.55%, #C34FFA 54.73%, #FF6187 86.84%, #F8D548 106.95%)" fontWeight="700" p="2.4rem 3.2rem" fontSize="2rem" colorScheme="blackAlpha">submit</Button>
                </Box>
            </Flex>
        </Flex>
    )
}

{/* <Input w="90%" id = "file" onChange={handleChange} name="img" type="file" accept="image/*" /> 
*/}