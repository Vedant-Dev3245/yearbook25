import React from "react"
import Masonry from "react-masonry-css"
import Cards from "./Cards"

export default function Wall(props){
    const capt = props.captions
    const breakpointColumnsObj = {
        default: 3,
        700: 2,
        500: 1
      };
    const cards = Array.from(capt).map(person => {
        return <Cards name={person.name} caption={person.caption} key={person.id}/>
    })
    return(
        <Masonry width="90%" marginInline="auto" breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
        {cards}
        </Masonry>
    )
}