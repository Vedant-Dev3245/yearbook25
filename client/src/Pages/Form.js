import React from "react"
import { useLocation } from "react-router-dom"
import axios from "axios";
export default function Form() {
    const location = useLocation()
    const data = location.state;
    console.log(data);
    const [formData, setFormData] = React.useState({
        firstName: data.given_name,
        lastName: data.family_name,
        img: data.picture,
        quote: "",
        id: "",
        email: data.email
    })
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3001/profile/add',
            data: formData
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} name="firstName" type="text" value={formData.firstName} />
                <input onChange={handleChange} name="lastName" type="text" value={formData.lastName} />
                <input onChange={handleChange} name="img" type="image" src={formData.img} />
                <input onChange={handleChange} name="quote" type="text" value={formData.quote} placeholder="Quote" />
                <input onChange={handleChange} name="id" type="text" value={formData.id} placeholder="BITS ID" />
                <button>Submit</button>
            </form>
        </div>
    )
}