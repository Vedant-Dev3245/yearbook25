import React, { useState, useEffect } from "react";
import PollsCards from "./PollsCards";
import "./Polls.css";
import axios from "axios";
// import Masonry from "react-masonry-css"


export default function Polls() {
  const [pollsData, setPollsData] = useState([]);
  // const breakpointColumnsObj = {
  //   default: 3,
  //   700: 2,
  //   500: 1
  // };


  React.useEffect(() => {
    axios({
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      url: `${process.env.REACT_APP_BACKEND_URL}/polls`,
    })
      .then(function (response) {
        setPollsData(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  const pollsCards = Array.from(pollsData).map(questions => {
    return <PollsCards key={questions.id} number={questions.id} pollqn={questions.ques}  />
  })


  return (
    <div className="polls">
      <div className="pollscards">
        {pollsCards}
        <PollsCards number="1" pollqn="some chiggy wiggy thing it is an amazing song  i really like sarc bro i love doing sarc work hahhahahahahah" />
        <PollsCards number="2" pollqn="some chiggy wiggy thing it is an amazing song  i really like sarc bro i love doing sarc work hahhahahahahah" />
        <PollsCards number="3" pollqn="some chiggy wiggy thing it is an amazing song  i really like sarc bro i love doing sarc work hahhahahahahah" />
        <PollsCards number="4" pollqn="some chiggy wiggy thing it is an amazing song  i really like sarc bro i love doing sarc work hahhahahahahah" />
      </div>

    </div>
  );
}
