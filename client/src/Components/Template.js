import React from "react";

const Template = ({ caption }) => {
    return (
        <div className="template" style={{ visibility: "hidden" }}>
            <p>{caption}</p>
        </div>
    );
};

export default Template;
