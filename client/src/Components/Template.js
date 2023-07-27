import React from "react";

const Template = ({ caption }) => {
    const styleMain = {
        backgroundImage: "linear-gradient(45deg, #050505, #07111B, #130D1F, #130C1E, #020202)",
        padding: "1rem",
        borderRadius: "10px",
        color: "#DCEDFB",
        // opacity:"0",
    };

    const stylep = {
        textAlign: "center",
        color: "#DCEDFB",
        fontFamily: "Gilmer",
        fontSize: "15px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
        letterSpacing: "0.48px",
    };

    const styleTitle = {
        textAlign: "center",
        padding:"10%"
    }
    const styleYearbook = {
        color: "#FFF",
        fontFamily: "Gilmer",
        fontSize: "20px",
        fontStyle: "normal",
        fontWeight: "800",
        lineHeight: "normal",
}
const styleQuote = {
    color: "#FFF",
    fontFamily: "Imperial Script",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    marginLeft:"30%"
}
const styleContent ={
    display:"grid",
    gridGap:"0px",
    gridTemplateColumns:"1fr 1fr",
    borderRadius:"7.2px",
    backgroundColor: "rgba(21,21,21,0.3)",
    boxShadow: "1px 1px 1px rgb(255, 255, 255, 0.5)",
    border: "solid 1px rgb(255, 255, 255, 0.1)",
    padding:"10%"
}
const styleAncientImage={
   width:"30px",
   marginLeft:"20%"
}
const stylepDiv={
    marginTop:"40%",
    marginRight:"50%"
}
const styleLogo={
    width:"28px",
    gridColumnStart:"2",
    gridRowStart:"2",
    marginLeft:"70%"
}
const stylePlaceHolder ={
    color: "rgba(250, 250, 250, 0.75)",
    textAlign: "center",
    fontFamily: "Gilmer",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "90.02%",
    padding:"10%",
}

return (
    <div className="template" style={styleMain}>
        <div className="yearbook-title" style={styleTitle} >
            <h1 style={styleYearbook}>yearbook</h1>
            <h1 style={styleQuote}>quotes</h1>
        </div>
        <div className="theactualquote" style={styleContent}>
        <div className="ancientImage" style={styleAncientImage}>
            <img src="../images/imageancient.png" alt="immgancient"></img>
        </div>
        <div className="quotesss" style={stylepDiv}>
          <p style={stylep}>{caption}</p>
        </div>
        <div className="logo" style={styleLogo}>
            <img src="../images/sarclogoimg.png" alt="logo"></img>
        </div>
        </div>
        <div className="placeHolder" style={stylePlaceHolder}>
            <h3>opt in for your physical copy of the yearbook now!</h3>
        </div>    
    </div>
);
};

export default Template;
