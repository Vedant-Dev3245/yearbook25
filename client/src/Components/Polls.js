import React, { useState, useEffect } from "react";
import PollsCards from "./PollsCards";
import "./Polls.css";
import axios from "axios";


export default function Polls() {
    const [pollsData, setPollsData] = useState([]);

    useEffect(() => {
      fetchPollsData()
        .then((data) => setPollsData(data))
        .catch((error) => console.log(error));
    }, []);
  
    function fetchPollsData() {
        return axios({
          method: 'GET',
          url: `${process.env.REACT_APP_BACKEND_URL}/polls`,
        })
        .then((response) => response.data);
      }

  return (
    <div className="polls">
      <div className="pollscards">
        {pollsData.map((poll) => (
          <PollsCards
            key={poll.number}
            number={poll.number}
            pollqn={poll.question}
          />
        ))}
        {/* <PollsCards number="1" pollqn="some chiggy wiggy thing it is an amazing song  i really like sarc bro i love doing sarc work hahhahahahahah"/>
        <PollsCards number="2" pollqn="some chiggy wiggy thing it is an amazing song  i really like sarc bro i love doing sarc work hahhahahahahah"/>
        <PollsCards number="3" pollqn="some chiggy wiggy thing it is an amazing song  i really like sarc bro i love doing sarc work hahhahahahahah"/>
        <PollsCards number="4" pollqn="some chiggy wiggy thing it is an amazing song  i really like sarc bro i love doing sarc work hahhahahahahah"/> */}
      </div>
      
    </div>
  );
}
