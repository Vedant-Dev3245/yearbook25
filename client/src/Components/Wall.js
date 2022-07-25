import React from "react"
import Masonry from "react-masonry-css"
import Cards from "./Cards"

export default function Wall(props){
    const capt = props.captions

    const cards = Array.from(capt).map(person => {
        return <Cards name={person.name} caption={person.caption} key={person.id}/>
    })
    return(
        <Masonry width="90%" marginInline="auto" breakpointCols={3}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
        {cards}
        </Masonry>
    )
}