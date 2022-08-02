import React from "react";
import {
    Box, Text, VStack, useMediaQuery, Image, Flex
} from "@chakra-ui/react";
import { useState } from "react";
import DevCards from "./DevCards";
import Masonry from "react-masonry-css"


export default function Devs() {
    const [isSmallerThan800] = useMediaQuery('(max-width:800px)')
    const breakpointColumnsObj = {
        default: 3,
        700: 2,
        500: 1
      };
    return (
        <>
            <Masonry width="100%" marginInline="auto" breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column2">
            <DevCards
                    img="../images/shwetabh.png"
                    name="shwetabh aniket"
                    caption="frontend captain | 2021A7PS0532P"
                    twitter=""
                    github=""
                    linkedin=""
                    spotify=""
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform.
                 For example, if you want to buy a token pair, you need to buy a token 
                 and a token pair. The token pair is the one that is traded on the platform."
                />
                <DevCards
                    img="../images/aryan.png"
                    name="aryan bakshi"
                    caption="one man army | 2021A7PS0532P"
                    twitter=""
                    github=""
                    linkedin=""
                    spotify=""
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform.
                 For example, if you want to buy a token pair, you need to buy a token 
                 and a token pair. The token pair is the one that is traded on the platform."
                />
                <DevCards
                    img="../images/patil.png"
                    name="aditya patil"
                    caption="ninja designer | 2021A7PS0532P"
                    twitter=""
                    github=""
                    linkedin=""
                    spotify=""
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform.
                 For example, if you want to buy a token pair, you need to buy a token 
                 and a token pair. The token pair is the one that is traded on the platform."
                />
                <DevCards
                    img="../images/shwetabh.png"
                    name="shwetabh aniket"
                    caption="frontend captain | 2021A7PS0532P"
                    twitter=""
                    github=""
                    linkedin=""
                    spotify=""
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform.
                 For example, if you want to buy a token pair, you need to buy a token 
                 and a token pair. The token pair is the one that is traded on the platform."
                />
                <DevCards
                    img="../images/aryan.png"
                    name="aryan bakshi"
                    caption="one man army | 2021A7PS0532P"
                    twitter=""
                    github=""
                    linkedin=""
                    spotify=""
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform.
                 For example, if you want to buy a token pair, you need to buy a token 
                 and a token pair. The token pair is the one that is traded on the platform."
                />
                <DevCards
                    img="../images/patil.png"
                    name="aditya patil"
                    caption="ninja designer | 2021A7PS0532P"
                    twitter=""
                    github=""
                    linkedin=""
                    spotify=""
                    text="A token is a digital asset that is issued by a company. 
                A token pair is a pair of tokens that are traded on the platform.
                 For example, if you want to buy a token pair, you need to buy a token 
                 and a token pair. The token pair is the one that is traded on the platform."
                />
            </Masonry>

        </>
    )
}
