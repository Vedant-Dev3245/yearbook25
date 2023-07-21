import { FiActivity } from "react-icons/fi"
import React from 'react'
import "./Stats.css";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Stats() {

    const params =useParams()
    const [user, setUser]= React.useState({
        imageUrl:"",
        bitsId: "",
        totalCount:"",
        name:""
    })
    React.useEffect(()=>{
        axios({
            method: 'GET',
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            },
            url: `${process.env.REACT_APP_BACKEND_URL}/polls/${params.id}/leaderboard`,
        })
        .then(function (response) {
            setUser(response.data.user)
            console.log(response.data.user)
            
            if (params.id === window.localStorage.getItem("user")) {
                window.localStorage.setItem("userName", response.data.user.name)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [params.id])

    return (
        <div className='stats'>
            <div className='topvbox'>
                <div className='topvoted'>
                    <h1>TOP VOTED</h1>
                </div>
            </div>
            <div className='statscard'>
                <div className='statscontent'>
                    <div className='img-count'>
                        <div className='img'>
                            <img src="../images/shwetabh.png"></img>
                            {/* <img src={user.imageUrl}></img> */}
                        </div>

                        <div className='count'>
                            <FiActivity filter="drop-shadow(0px 0px 15px #2094FF" fontSize="1.2rem" />
                            <div className="number-count">
                                <h3>4 votes</h3>
                            </div>
                        </div>
                    </div>
                    <div className="name">
                        <h1>{user.name}</h1>
                        <h1>shwetabh</h1>
                    </div>
                    <div className="bitsid">
                        <h3>2022A8PS1264P | A8</h3>
                        {/* <h3>{user.bitsId} | {user.bitsId.indexOf('PS') === -1 ? user.bitsId.slice(4, 8) : user.bitsId[4] + user.bitsId[5]}</h3> */}
                    </div>
                    <div className="pollqn">
                        <h2>holoooo hahahah letsgoo some random shit here lite</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}