import React from "react";
import './ImageFormLink.css'

const ImageFormLink = ({ onInputChange, onSubmit }) => {
    return (
        <div className="conteiner">
            <p id="textIntro">The Magic Brain will detect faces in your pictures.</p>
            <div className="form">
                <input type="text" onChange={onInputChange}></input>
                <button onClick={onSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageFormLink;