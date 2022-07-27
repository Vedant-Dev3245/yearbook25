import { Box } from '@chakra-ui/react'
import React from 'react'
import ProfileInfo from '../Components/ProfileInfo'
import ProfileNav from '../Components/ProfileNav'
import Interact from '../Components/Interact'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// import * as fs from 'fs';
// import * as fs from 'fs/promises'

export default function Profile(props) {



    const params = useParams();
    const [user, setUser] = React.useState({
        captions: [],
        discipline: "",
        email: "",
        img: {},
        name: "",
        nominatedby: [],
        quote: "",
        __v: 0,
        _id: "",
        bitsId: ""
    })

    React.useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:3001/getprofile/${params.id}`,
        })
            .then(function (response) {
                setUser(response.data.user)
                console.log(response.data.user)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [params.id])
    
    return (
        <Box bg="linear-gradient(144.31deg, #050505 9%, #07111B 32.99%, #130D1F 50.05%, #130C1E 82.44%, #020202 92.26%)" color="white">
            <ProfileNav />
            <ProfileInfo
                name={user.name}
                quote = {user.quote}
                id={user.bitsId}
                discipline={user.bitsId[4]+user.bitsId[5]}
                imageUrl={user.imageUrl}
                />
            <Interact 
            captions = {user.captions}
            nominatedby = {user.nominatedby}
            />
        </Box>
    )
}