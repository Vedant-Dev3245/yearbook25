import React from "react";

const Template = (props) => {
    
    const styleMainMain = {
        backgroundImage: "linear-gradient(45deg, #050505, #07111B, #130D1F, #130C1E, #020202)",
    }
    const styleMain = {
        marginTop: "-80%"
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
        marginTop: "-65%",
        marginRight:"20%"
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
        fontSize: "40px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal",
        marginLeft: "40%",
        marginTop: "-20px"
    }
    const styleContentBoxBox={
        padding: "12%",
        paddingTop: "5%",
        paddingBottom: "10%",
    }
    const styleContentBox = {
        gridTemplateColumns: "1fr 1fr",
        borderRadius: "7.2px",
        backgroundColor: "rgba(21,21,21,0.3)",
        boxShadow: "1px 1px 1px rgb(255, 255, 255, 0.5)",
        border: "solid 1px rgb(255, 255, 255, 0.1)",
    }
    const styleContent = {
        display: "grid",
        gridGap: "0px",
    }
    const styleAncientImage = {
        width: "30px",
        marginLeft: "30%",
        marginTop: "30%"
    }
    const stylepDiv = {
        marginTop: "60%",
        marginRight: "30%"
    }
    const styleLogo = {
        width: "28px",
        gridColumnStart: "2",
        gridRowStart: "2",
        marginLeft: "60%",
        marginBottom: "10%"
    }
    const stylePlaceHolder = {
        color: "rgba(250, 250, 250, 0.75)",
        textAlign: "center",
        fontFamily: "Gilmer",
        fontSize: "10px",
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: "90.02%",
        padding: "10%",
    }
    const ellipseTop = {
        position: "top left",
        width: "100px"
    }
    const ellipseMid = {
        width: "100px",
        zIndex: "-1"

    }
    const ellipseBottom = {
        width: "100px",
        marginLeft: "60%",
        marginTop: "1%"
    }
    const styleNameImage = {
        display: "flex",
        alignItems: "center",
      }
      const styleNameImageImage = {
        height: "2rem",
        width: "2rem",
        borderRadius: "50%",
        marginRight: "0.5rem",
        marginLeft:"1.5rem"
      }
      const styleNameImageImageimg = {
        height: "2rem",
        width: "2rem",
        borderRadius: "50%",
        marginRight: "0.5rem",
      }
      const styleNameImageNameBitsID = {
        display: "flex",
        flexDirection: "column",
      }
      const styleNameImageName = {
        fontSize: "12px",
        textTransform: "lowercase",
        margin: "0",
      }
      const styleNameImageBitsID = {
        margin: "0", 
      }

     
    return (
        <div className="template" style={styleMainMain}>

            <div className="ellipse1" style={ellipseTop}>
                <img src="../images/ellipsetop.png" alt="ellipsetop"></img>
            </div>
            <div className="ellipse1" style={ellipseBottom}>
                <img src="../images/ellipsebottom.png" alt="ellipsetop"></img>
            </div>
            <div className="ellipse1" style={ellipseMid}>
                <img src="../images/ellipsemid.png" alt="ellipsemid"></img>
            </div>

            <div className="templateSmall" style={styleMain}>
                <div className="yearbook-title" style={styleTitle} >
                    <h1 style={styleYearbook}>yearbook</h1>
                    <h1 style={styleQuote}>quotes</h1>
                </div>
                <link
                    href="https://fonts.googleapis.com/css2?family=Imperial+Script&display=swap"
                    rel="stylesheet"
                />
                <div style={styleContentBoxBox}>
                <div style={styleContentBox}>
                <div className="name-image" style={styleNameImage}>
                            <div className="image" style={styleNameImageImage}>
                                    <img style={styleNameImageImageimg} src={props.img}></img>
                                    {/* <img style={styleNameImageImageimg} src="../images/shwetabh.png"></img> */}
                            </div>
                            <div className="name" style={styleNameImageNameBitsID}>
                                <div className="namename" style={styleNameImageName}>
                                    <p>{props.name}</p>
                                </div>
                                <div className="namebitsId" style={styleNameImageBitsID}>
                                    <p>{props.bitsId}</p>
                                    <p style={{fontSize:"10px",marginTop:"-18px",color:"grey"}}>2022A8PS1264P</p>
                                </div>
                            </div>
                        </div>
                    <div className="theactualquote" style={styleContent}>
                        <div className="ancientImage" style={styleAncientImage}>
                            <img src="../images/imageancient.png" alt="immgancient"></img>
                        </div>
                        <div className="quotesss" style={stylepDiv}>
                            <p style={stylep}>{props.caption}</p>
                        </div>
                        <div className="logo" style={styleLogo}>
                            <img src="../images/sarclogoimg.png" alt="logo"></img>
                        </div>
                    </div>
                </div>
                </div>
                <div className="placeHolder" style={stylePlaceHolder}>
                    <h3>opt in for your physical copy of the yearbook now!</h3>
                </div>
            </div>
        </div>
    );
};

export default Template;
