import React from "react";
import "./Rank.css"

const Rank = ({User}) => {
    const {name, entries} = User
    return (
        <div className="rankText">
            <div>{`${name}, your current entry count is...`}</div>
            <div>{`${entries}`}</div>
        </div>
    )
}

export default Rank;
