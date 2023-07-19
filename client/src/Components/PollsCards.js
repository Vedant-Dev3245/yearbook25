import React from "react";
import axios from "axios";
// import { Box, Flex, Text } from "@chakra-ui/react";
import Searchpolls from "./Searchpolls"
import "./Polls.css";


export default function PollsCards(props){
    
    return(
        
        <div className="pollscardsprops">
             <div className="pollsnumber">
                {props.number}
             </div>
             <div className="pollsqns">
                {props.pollqn}
             </div>
             <div className="dropdownpolls">
                <Searchpolls />
             </div>
        </div>
    )
}