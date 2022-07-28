import React from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { FiFeather, FiAnchor, FiBell, FiActivity} from "react-icons/fi"
import Wall from "./Wall";
import Nominate from "./Nominate";
import Notifs from "./Notifs"
// import Stats from "./Stats";
import Footer from "./Footer";

export default function Interact(props) {
    
    const [wallActive, setWallActive] = React.useState(true)
    const [nominateActive, setNominateActive] = React.useState(false)
    const [notifActive, setNotifActive] = React.useState(false)
    // const [statsActive, setStatsActive] = React.useState(false)
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    const [ownProfile, setOwnProfile] = React.useState()
    const barItems = document.querySelectorAll('.barItems')
    
    function removeActive(){
        for(let i=0; i<barItems.length;i++){
            if(document.querySelectorAll('.barItems')[i].classList.contains('active')){
                document.querySelectorAll('.barItems')[i].classList.remove('active')
            }
        }
    }
    let friend = window.localStorage.getItem("friend")
    React.useEffect(()=> {
        if(window.location.href.includes( window.localStorage.getItem("user"))){
            setOwnProfile(true)
        }
        else{
            setOwnProfile(false)
        }
     },[friend] )
    

    function makeWallActive(){
        setWallActive(true);
        setNominateActive(false);
        setNotifActive(false);
        // setStatsActive(false);
        removeActive();
        document.querySelector('.wall').classList.add('active')
    }
    function makeNominActive(){
        setWallActive(false);
        setNominateActive(true);
        setNotifActive(false);
        // setStatsActive(false);
        removeActive();
        document.querySelector('.nomin').classList.add('active')
    }
    function makeNotifActive(){
        setWallActive(false);
        setNominateActive(false);
        setNotifActive(true);
        // setStatsActive(false);
        removeActive();
        document.querySelector('.notif').classList.add('active')
    }
    // function makeStatsActive(){
    //     setWallActive(false);
    //     setNominateActive(false);
    //     setNotifActive(false);
    //     setStatsActive(true);
    //     removeActive();
    //     document.querySelector('.stats').classList.add('active')
    // }
    
    return (
        <Box>
            <Flex  mb="4rem" mt="3rem" w="90%" marginInline={"auto"} justifyContent={isSmallerThan800 ? "center" : "flex-start"}flexWrap="wrap" borderBottom="1px solid rgba(217, 217, 217, 0.1)">
                <Flex onClick={makeWallActive} cursor="pointer" alignItems="center" p="1rem" className="wall active barItems">
                    <FiFeather filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
                    <Text ml="1rem" fontWeight="600" fontSize="1.1rem">{ownProfile ? "your wall" : "wall"}</Text>
                </Flex>
                <Flex display = {ownProfile ? "flex" : "none"} onClick={makeNominActive} cursor="pointer" alignItems="center" p="1rem" className="nomin barItems">
                    <FiAnchor filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
                    <Text ml="1rem" fontWeight="600" fontSize="1.1rem">nominate your frens</Text>
                </Flex>
                <Flex display = {ownProfile ? "flex" : "none"} onClick={makeNotifActive} cursor="pointer" alignItems="center" p="1rem" className="notif barItems">
                    <FiBell filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
                    <Text ml="1rem" fontWeight="600" fontSize="1.1rem">notifications</Text>
                </Flex>
                {/* <Flex display = {ownProfile ? "flex" : "none"} onClick={makeStatsActive} cursor="pointer" alignItems="center" p="1rem" className="stats barItems">
                    <FiActivity filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
                    <Text ml="1rem" fontWeight="600" fontSize="1.1rem">stats</Text>
                </Flex> */}

            </Flex>
            <Box display={wallActive ? "block" : "none"}><Wall captions = {props.captions}/></Box>
            <Box display={nominateActive&&ownProfile ? "block" : "none"}><Nominate  name= {props.name} /></Box>
            <Box display={notifActive&&ownProfile ? "block" : "none"}><Notifs nominatedBy = {props.nominatedby}/></Box>
            {/* <Box display={statsActive ? "block" : "none"}><Stats/></Box> */}
            <Box mt="14rem">
            <Footer/>
            </Box>
        </Box>

    )
}