import { Flex, Text, Box, Input } from "@chakra-ui/react"
import React from "react"
import AsyncSelect from "react-select/async"
import axios from "axios"

export default function Search(props) {

    const [option, setOption] = React.useState({})
    const [exists, setExists] = React.useState(false)

    const fetchData = (inputValue, callback) => {
        if (!inputValue) {
            callback([]);
        }
        else {
            setTimeout(() => {
                console.log(`http://127.0.0.1:3001/searchUsers?name=${inputValue}`)
                axios({
                    method: 'GET',
                    url: `http://127.0.0.1:3001/searchUsers?name=${inputValue}`,
                })
                    .then(function (response) {
                        let tempArray = [];
                        response.data.users.forEach(element => {
                            tempArray.push({ label: `${element[0]} ${element[2]} `, value: `${element[1]}` });
                        });
                        callback(tempArray);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        }
    }
    let bitsid = ""
    const onSearchChange = (option) => {
        if (option) {
            setOption({ option })
            localStorage.setItem("friend", option.value)
            bitsid = option.label.substring(option.label.length -14)
            console.log(bitsid)
            setExists(true)
        }
    }
    let nominateData = {
        senderId : localStorage.getItem("user"),
        senderName : props.name,
        receiverId : localStorage.getItem("friend")
    }
    function nominate(){
        axios({
            method: 'POST',
            url: "http://127.0.0.1:3001/nominate",
            data: nominateData
        })
        .then(function(res){
            console.log(res);
        })
        .catch(function(err){
            console.log(err);
        });
        // console.log(nominateData)
    }

    return (
        <Box>
            <Text mt="3rem" mb="1rem" fontSize="1.5rem" fontWeight="800">name</Text>
            <Flex alignItems="center" w="100%">
                <Box w="100%"> <AsyncSelect
                    value={option}
                    loadOptions={fetchData}
                    placeholder="search"
                    className="selectProfNom" classNamePrefix="selectOptNom"
                    onChange={(e) => {
                        onSearchChange(e)
                    }}
                    defaultOptions={false} /></Box>
            </Flex>
            <Text mt="2rem" fontSize="1.5rem" fontWeight="800">bitsid</Text>
            <Input disabled marginBlock="1rem" p="1.2rem" w="40%" border="1px solid #6C6C6C !important" color="white" value={exists ? bitsid : "check bits id here"}/>
            <Box cursor="pointer" mt="2rem" border="1px solid #C9C9C9" bgColor="rgba(255, 255, 255, 0.1)" padding="0.5rem 1.5rem" borderRadius="2rem" w="fit-content" fontWeight={"600"} onClick={nominate}>Nominate</Box>
        </Box>
    )
}