import React, { useState, useEffect } from "react";
import PollsCards from "./PollsCards";
import "./Polls.css";
import axios from "axios";
// import Masonry from "react-masonry-css"

export default function Polls(props) {
  const [pollsData, setPollsData] = useState([]);
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
        // console.log(response.data)
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
    return <PollsCards key={index} number={number} pollqn={questions.ques} />;
  });

  return (
    <div className="polls">
      <div className="pollscards">{pollsCards}</div>
    </div>
  );
}
