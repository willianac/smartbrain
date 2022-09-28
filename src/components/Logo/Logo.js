import React from "react";
import Tilt from 'react-parallax-tilt'
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
    return (
        <div>
             <Tilt
                className="parallax-effect-glare-scale"
                perspective={500}
                glareEnable={true}
                glareMaxOpacity={0.45}
                scale={1.02}
            >
                <div className="inner-element">
                <div><img alt="logo" src={brain} style={{width : '100px'}} /></div>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;