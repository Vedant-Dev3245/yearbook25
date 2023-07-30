import React, { useState, useEffect } from "react";
import PollsCards from "./PollsCards";
import "./Polls.css";
import axios from "axios";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
// import Masonry from "react-masonry-css"

export default function Polls(props) {
  const [pollsData, setPollsData] = useState([]);
  const [isSmallerThan800] = useMediaQuery("(max-width:800px)");
  // const breakpointColumnsObj = {
  //   default: 3,
  //   700: 2,
  //   500: 1
  // };

  React.useEffect(() => {
    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/polls`,
    })
      .then(function (response) {
        setPollsData(response.data.questions);
        console.log(response.data.questions);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  //   React.useEffect(()=>{
  //     setPollsData(props.questions)
  // })

  const pollsCards = pollsData.map((questions, index) => {
    const number = (index + 1).toString().padStart(2, "0");
    return (
      <PollsCards
        key={questions._id}
        number={number}
        id={questions._id}
        pollqn={questions.ques}
      />
    );
  });

  return (
    <div className="polls">
      <Box
        ml={isSmallerThan800 ? "1rem" : "5rem"}
        fontSize={isSmallerThan800 ? "1.5rem" : "3rem"}
        fontWeight="800"
      >
        let your friends know{" "}
        <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic">
          that you know
        </Text>
      </Box>

      <Box mt={"2rem"} className="pollscards">{pollsCards}</Box>
    </div>
  );
}
