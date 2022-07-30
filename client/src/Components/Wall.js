import React from "react"
import Masonry from "react-masonry-css"
import Cards from "./Cards"
import {Box, useMediaQuery, Text, Link} from "@chakra-ui/react"

export default function Wall(props){
    const [isSmallerThan800] = useMediaQuery('(max-width: 800px')
    const [capt,setCapt] = React.useState([])
    const [title, setTitle] = React.useState(false)
    const breakpointColumnsObj = {
        default: 3,
        700: 2,
        500: 1
      };
    const cards = Array.from(capt).map(person => {
        return <Cards name={person.name} caption={person.caption} key={person.id}/>
    })
    React.useEffect(()=>{
        setCapt(props.captions)
    })
    React.useEffect(()=>{
        if(capt.length === 0){
            setTitle(true)
        }
        else{
            setTitle(false)
        }
    })
    return(
        
<Box w="90%" marginInline="auto" pb="4rem">
            <Box fontSize={isSmallerThan800 ? "1.5rem" : "3rem"} display={props.ownProfile && title ? "block" : "none"} fontWeight="800">no worries, if your wall is empty <br/> <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic" textDecoration={"underline"} cursor="pointer" onClick={props.makeNominActive} >nominate</Text>  your friends to write a caption for you</Box>
            <Box fontSize={isSmallerThan800 ? "1.5rem" : "3rem"} display={!props.ownProfile && title ? "block" : "none"} fontWeight="800">hey, you should write a <Text display={"inline"} fontFamily="EB Garamond" fontStyle="italic" >caption</Text>  for your friend!</Box>

            <Masonry width="90%" marginInline="auto" breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
        {cards}
        </Masonry>
        </Box>
    )
}