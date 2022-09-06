import { Flex, Text, Box, Input, useMediaQuery, Alert, AlertIcon } from "@chakra-ui/react"
import React from "react"
import AsyncSelect from "react-select/async"
import axios from "axios"
import { Spinner } from '@chakra-ui/react'

export default function Search(props) {

    const [exists, setExists] = React.useState(false)
    const [res, setRes] = React.useState(false)
    const [spin, setSpin] = React.useState(false)
    const[alert,setAlert] = React.useState(false)
    const [label,setLabel] = React.useState("")
    const[bitsid, setBitsid] = React.useState("")
    const[msg,setMsg] = React.useState("")
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    const fetchData = (inputValue, callback) => {
        if (!inputValue) {
            callback([]);
        }
        else {
            setTimeout(() => {
                // console.log(`https://yearbook-portal-backend-2022.herokuapp.com/searchUsers?name=${inputValue}`)
                axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_BACKEND_URL}/searchUsers?name=${inputValue}`,
                })
                    .then(function (response) {
                        let tempArray = [];
                        response.data.users.forEach(element => {
                            tempArray.push({ label: `${element.name} ${element.bitsId} `, value: `${element.uId}` });
                        });
                        callback(tempArray);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        }
    }
    const onSearchChange = (option) => {
        if (option) {
            localStorage.setItem("friend", option.value)
            setBitsid(option.label.substring(option.label.length -14))
            setLabel(option.label.substring(0,option.label.length -14 ))
            console.log(bitsid)
            console.log(label)
            setExists(true)
        }
    }

    let nominateData = {
        senderId : localStorage.getItem("user"),
        senderName : props.name,
        receiverId : localStorage.getItem("friend")
    }
    function nominate(){
        if(nominateData.senderId === nominateData.receiverId){
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 3000);
        }
        else{
            setSpin(true)
            axios({
                method: 'POST',
                headers: {
                    'accessToken': localStorage.token
                  },
                url: `${process.env.REACT_APP_BACKEND_URL}/nominate`,
                data: nominateData
            })
            .then(function(res){
                console.log(res);
                setMsg( res.data.msg);
                setRes(true)
                setSpin(false)
                setLabel("")
                setBitsid("")
            setTimeout(() => {
                setRes(false)
            }, 3000);
            })
            .catch(function(err){
                setMsg( err.message);
                setRes(true)
                console.log(err);
                setSpin(false)
                setTimeout(() => {
                    setRes(false)
                }, 3000);
            });
        }
        // console.log(nominateData)
    }

    return (
        <Box position={"relative"}>
            <Text mt="3rem" mb="1rem" fontSize="1.5rem" fontWeight="800">name</Text>
            <Flex alignItems="center" w="100%">
                <Box w="100%"> <AsyncSelect
                    value={{label}}
                    loadOptions={fetchData}
                    placeholder="search"
                    className="selectProfNom" classNamePrefix="selectOptNom"
                    onChange={(e) => {
                        onSearchChange(e)
                    }}
                    defaultOptions={false} /></Box>
            </Flex>
            <Text mt="2rem" fontSize="1.5rem" fontWeight="800">bitsid</Text>
            <Input disabled marginBlock="1rem" p="1.2rem" w={isSmallerThan800 ? "80%" : "40%"} border="1px solid #6C6C6C !important" color="white" value={exists ? bitsid : "check bits id here"}/>
            <Flex alignItems={"center"} justifyContent="center" cursor="pointer" mt="2rem" border="1px solid #C9C9C9" bgColor="rgba(255, 255, 255, 0.1)" padding="0.5rem 1.5rem" borderRadius="2rem" w="130px" fontWeight={"600"} onClick={nominate}>Nominate</Flex>
            <Spinner size="lg" mt="1rem" display={spin ? "block" : "none"}/>
            <Alert bg="#242323" color="white" status='error' display={alert ? "block" : "none"} position="absolute" w="40%" bottom="5rem" left="0">
                <AlertIcon />
                You can not nominate yourself ;)
            </Alert>
            <Alert bg="#242323" color="white" status='success' display={res ? "block" : "none"} position="absolute" w="40%" bottom="-5rem" left="0">
                <AlertIcon />
                {msg}
            </Alert>
        </Box>
    )
}