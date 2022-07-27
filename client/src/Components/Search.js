import { Flex } from "@chakra-ui/react"
import React from "react"
import AsyncSelect from "react-select/async"
import axios from "axios"

export default function Search() {

    const [option, setOption] = React.useState({})

    const fetchData = (inputValue, callback) => {
        if (!inputValue) {
            callback([]);
        }
        else {
            setTimeout(() => {
                console.log(`https://yearbook-portal-backend-2022.herokuapp.com/searchUsers?name=${inputValue}`)
                axios({
                    method: 'GET',
                    url: `https://yearbook-portal-backend-2022.herokuapp.com/searchUsers?name=${inputValue}`,
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
    const onSearchChange = (option) => {
        if (option) {
            setOption({ option })
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