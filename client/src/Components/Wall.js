import React from "react"
import Masonry from "react-masonry-css"
import Cards from "./Cards"

export default function Wall(){
    return(
        <Masonry width="90%" marginInline="auto" breakpointCols={3}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
            </Masonry>
    )
}