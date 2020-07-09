import React from 'react';
import logo from '../assets/favicon.png';


const Footer = () => {
    return(
        <div className="grid-foot">
            <img className='logo-holder' alt='logo' src={logo}></img>
            <p className="middle">My Budget, Version: 0.1.0</p>
        </div>
    )
}

export default Footer;