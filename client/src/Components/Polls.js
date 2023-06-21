import React, { useState, useEffect } from "react";
import Footer from "./Footer";
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
          url: `${process.env.REACT_APP_BACKEND_URL}/search?${new URLSearchParams({ question: 'some ques' })}`,
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
      </div>
      <Footer />
    </div>
  );
}
