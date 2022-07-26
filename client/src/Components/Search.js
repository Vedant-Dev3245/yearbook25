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
                console.log(`http://127.0.0.1:3001/searchUsers?name=${inputValue}`)
                axios({
                    method: 'GET',
                    url: `http://127.0.0.1:3001/searchUsers?name=${inputValue}`,
                })
                    .then(function (response) {
                        console.log(response.json())
                        return response.json()
                    })
                    .then((data) => {
                        let tempArray = [];
                        data.forEach(element => {
                            tempArray.push({ label: `${element.name}`, value: `${element.id}` });
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