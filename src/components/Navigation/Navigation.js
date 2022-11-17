import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Navigation.css'
import ranking from "./ranking.png"

const Navigation = ({ displayRank }) => {
    const location = useLocation()

    if(location.pathname === '/smartbrain' || location.pathname === '/ranking') {
    return (
        <div className="navbar">
            <Link to='/ranking'><img src={ranking} className='rankingImg' onClick={displayRank}/></Link>
            <Link className="button button-5" onClick={() => localStorage.clear()} to='/signin'>Sign Out</Link>
        </div>
    )
    } else {
        return (
            <div className="navbar">
                <Link className="button button-5" to='/register'>Register</Link>
                <Link className="button button-5" to='/signin'>Sign In</Link>
            </div>
        )
    }
}

export default Navigation;