import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FiActivity } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
function StatsCards({ user }) {
  const navigate = useNavigate();
  return (
    <div
      className="statscard"
      onClick={() => {
        navigate(`/profile/${user.id}`);
      }}
    >
      <div className="statscontent">
        <div className="img">
          <Image objectFit={"cover"} src={user.imageUrl} alt="img"></Image>
          {/* <img src={user.imageUrl}></img> */}
        </div>

        <Flex className="count">
          <FiActivity
            filter="drop-shadow(0px 0px 15px #2094FF)"
            color="#2094FF"
            fontSize="1.2rem"
          />
          <Text className="count-txt" fontWeight={700}>
            {user.votes} vote{user.votes > 1 ? "s" : ""}
          </Text>
        </Flex>

        <Box fontWeight={700} lineHeight={"2.4rem"} className="name">
          <h1>{user.name}</h1>
        </Box>
        <div className="bitsid">
          <h3>
            {user.bitsId} |{" "}
            {user.bitsId.indexOf("PS") === -1
              ? user.bitsId.slice(4, 8)
              : user.bitsId[4] + user.bitsId[5]}
          </h3>
        </div>
        <div className="pollqn">
          <h2>{user.pollQuestion}</h2>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
