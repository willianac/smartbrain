import React from "react";
import './Navigation.css'

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn) {
    return (
        <div className="navbar">
           <a className="button button-5" onClick={() => onRouteChange('signout')}>Sign out</a>
        </div>
    )
    } else {
        return (
            <div className="navbar">
                <a className="button button-5" onClick={() => onRouteChange('register')}>Register</a>
                <a className="button button-5" onClick={() => onRouteChange('signin')}>Sign In</a>
            </div>
        )
    }
}

export default Navigation;