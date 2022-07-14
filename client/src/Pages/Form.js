import React from "react"
import { useLocation } from "react-router-dom"
import axios from "axios";
import { chakra, Box } from "@chakra-ui/react"
// import { Gilmer } from "../gilmer-complete-family-webfont-full/gilmer-bold/webfonts/gilmer-bold.ttf"
export default function Form() {
    const location = useLocation()
    const data = location.state;
    const [formData, setFormData] = React.useState({
        firstName: data.given_name,
        lastName: data.family_name,
        img: {},
        quote: "",
        id: "",
        email: data.email
    })
    // let formInfo = new FormData();

    function handleChange(event) {
        const { name, value, type } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: (type == "file" ? event.target.files[0] : value)
            }
        })
    }
    //  function handleFile(e) {
    //     console.log(e.target.files[0])
    //     if(e.target && e.target.files[0]){
    //         formInfo.append('file', e.target.files[0])
    //     }
    // }
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(formData)
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3001/profile/add',
            data: { formData }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <Box>
            <Box>
                <Box bg="#1D1E22" w="80%" color="white">
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} name="firstName" type="text" value={formData.firstName} />
                        <input onChange={handleChange} name="lastName" type="text" value={formData.lastName} />
                        <input onChange={handleChange} name="img" type="file" accept="image/*" />
                        <input onChange={handleChange} name="quote" type="text" value={formData.quote} placeholder="Quote" />
                        <input onChange={handleChange} name="id" type="text" value={formData.id} placeholder="BITS ID" />
                        <button>Submit</button>
                    </form>
                </Box>
            </Box>
            <Box>

            </Box>
        </Box>
    )
}