import { Flex } from "@chakra-ui/react"
import React from "react"
import AsyncSelect from "react-select/async"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Search() {

    const [option, setOption] = React.useState({})
    const navigate = useNavigate()

    const fetchData = (inputValue, callback) => {
        if (!inputValue) {
            callback([]);
        }
        else {
            setTimeout(() => {
                console.log(`http://localhost:3001/searchUsers?name=${inputValue}`)
                axios({
                    method: 'GET',
                    url: `http://localhost:3001/searchUsers?name=${inputValue}`,
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
            setOption({ option })
            localStorage.setItem("friend", option.value )
            navigate(`/profile/${option.value}`)
        }
    }

    return (
        <Flex  alignItems = "center" w= "100%">
            <AsyncSelect
                value={option}
                loadOptions={fetchData}
                placeholder="search"
                className="selectProf" classNamePrefix="selectOpt"
                onChange={(e) => {
                    onSearchChange(e)
                }}
                defaultOptions={false} />
        </Flex>
    )
}