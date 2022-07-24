import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FiFeather, FiAnchor, FiBell, FiActivity } from "react-icons/fi"
import Wall from "./Wall";
import Nominate from "./Nominate";
import Notifs from "./Notifs"
import Stats from "./Stats";

export default function Interact() {
    
    // const [wallActive, setWallActive] = React.useState(true)
    // const [nominateActive, setNominateActive] = React.useState(false)
    // const [notifActive, setNotifActive] = React.useState(false)
    // const [statsActive, setStatsActive] = React.useState(false)
    return (
        <Box>
            <Flex  mb="4rem" mt="3rem" w="90%" marginInline={"auto"} justifyContent="flex-start" borderBottom="1px solid rgba(217, 217, 217, 0.1)">
                <Flex cursor="pointer" alignItems="center" p="1rem" className="active">
                    <FiFeather filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
                    <Text ml="1rem" fontWeight="600" fontSize="1.1rem">your wall</Text>
                </Flex>
                <Flex cursor="pointer" alignItems="center" p="1rem" >
                    <FiAnchor filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
                    <Text ml="1rem" fontWeight="600" fontSize="1.1rem">nominate your frens</Text>
                </Flex>
                <Flex cursor="pointer" alignItems="center" p="1rem" >
                    <FiBell filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
                    <Text ml="1rem" fontWeight="600" fontSize="1.1rem">notifications</Text>
                </Flex>
                <Flex cursor="pointer" alignItems="center" p="1rem" >
                    <FiActivity filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
                    <Text ml="1rem" fontWeight="600" fontSize="1.1rem">stats</Text>
                </Flex>

            </Flex>
            {/* <Wall/> */}
            {/* <Nominate/> */}
            <Notifs/>
            {/* <Stats/> */}

        </Box>

    )
}