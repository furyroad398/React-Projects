import React from "react";
import '../css/Home.css'
import { Link } from "react-router-dom";
import logo from '../Images/wallpaperflare.com_wallpaper.jpg'

function Navbar() {
    return (
        <div className="navbox">
            <div className='leftside'>
                <img src={logo} alt="" />
            </div>
            <div className='rightside'>
                <span><Link to="signup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="login" className='navlink'>LOGIN</Link></span>
            </div>
        </div>
    )
}

export default Navbar;

