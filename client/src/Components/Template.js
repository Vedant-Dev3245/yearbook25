import React from "react";


export default function Template(props){
     
    const templateStyle={
        backgroundColor : "linear-gradient(138deg, #050505 0%, #07111B 24.96%, #130D1F 46.35%, #130C1E 79.69%, #020202 89.58%);"
    }


    return(
        <div
        style={templateStyle}>
            <h1>{props.caption}hello my boii its time to rock</h1>
        </div>
    )
}