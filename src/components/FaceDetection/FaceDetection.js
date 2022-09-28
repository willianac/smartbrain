import React from "react";
import './FaceDetection.css'

const FaceDetection = ({ imageURL, box }) => {
     return (
        <div className="imgConteiner">
            <div style={{position : 'absolute'}}>
                <img src={imageURL} alt="" id="image" />
                <div className="bounding-box"
                style={{top : box.topRow, right : box.rightCol, bottom : box.bottomRow, left : box.leftCol}}>
                </div>
            </div>
        </div>
    )
}

export default FaceDetection;