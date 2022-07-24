import { Box } from '@chakra-ui/react'
import React from 'react'
import ProfileInfo from '../Components/ProfileInfo'
import ProfileNav from '../Components/ProfileNav'
import Interact from '../Components/Interact'

export default function Profile() {
    return (
        <Box bg="linear-gradient(144.31deg, #050505 9%, #07111B 32.99%, #130D1F 50.05%, #130C1E 82.44%, #020202 92.26%)" color="white">
            <ProfileNav />
            <ProfileInfo />
            <Interact />
        </Box>
    )
}