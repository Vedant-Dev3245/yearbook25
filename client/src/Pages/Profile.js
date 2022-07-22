import { Box } from '@chakra-ui/react'
import React from 'react'
import ProfileInfo from '../Components/ProfileInfo'
import ProfileNav from '../Components/ProfileNav'
import Wall from '../Components/Wall'

export default function Profile() {
    return (
        <Box bg="#0F0F0F" w="100vw" h="100vh" color="white">
            <ProfileNav />
            <ProfileInfo />
            <Wall />
        </Box>
    )
}