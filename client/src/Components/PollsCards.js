import React from "react";
import axios from "axios";
// import { Box, Flex, Text } from "@chakra-ui/react";
import Searchpolls from "./Searchpolls"
import "./Polls.css";


export default function PollsCards(props){
    const handleNameSelection = (selectedName) => {
        //selected name to the backend
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/polls`, {
            // send bits id 
          })
          
          .catch((error) => {
            console.log(error);
          });
      };
    return(
        
        <div className="pollscardsprops">
             <div className="number">
                {props.number}
             </div>
             <div className="pollsqns">
                {props.pollqn}
             </div>
             <div className="dropdownpolls">
                <Searchpolls onNameSelect={handleNameSelection} />
             </div>
        </div>
    )
}