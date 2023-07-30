import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FiActivity } from "react-icons/fi";

function StatsCards({ user }) {
  return (
    <div className="statscard">
      <div className="statscontent">
        <div className="img">
          <Image
            objectFit={"cover"}
            src="../images/shwetabh.png"
            alt="img"
          ></Image>
          {/* <img src={user.imageUrl}></img> */}
        </div>

        <Flex className="count">
          <FiActivity
            filter="drop-shadow(0px 0px 15px #2094FF)"
            color="#2094FF"
            fontSize="1.2rem"
          />
          <Text className="count-txt" fontWeight={600}>
            {user.totalCount} votes
          </Text>
        </Flex>

        <Box fontWeight={700} className="name">
          <h1>{user.name}</h1>
          <h1>shwetabh</h1>
        </Box>
        <div className="bitsid">
          <h3>2022A8PS1264P | A8</h3>
          {/* <h3>{user.bitsId} | {user.bitsId.indexOf('PS') === -1 ? user.bitsId.slice(4, 8) : user.bitsId[4] + user.bitsId[5]}</h3> */}
        </div>
        <div className="pollqn">
          <h2>holoooo hahahah letsgoo some random shit here lite</h2>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
