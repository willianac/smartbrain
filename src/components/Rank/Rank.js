import React from "react";

const Rank = ({User}) => {
    const {name, entries} = User
    return (
        <div style={{textAlign : 'center', color : 'white', fontSize : '35px', fontFamily : 'Courier New'}}>
            <div>{`${name}, your current entry count is...`}</div>
            <div>{`${entries}`}</div>
        </div>
    )
}

export default Rank;
