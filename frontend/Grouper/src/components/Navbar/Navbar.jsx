import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
        <h1>
            <NavLink to="/" className='logo'>
                Grouper
            </NavLink>
        </h1>
        <div className="right-section">
            <ul className='nav-menu'>
                <li><NavLink to="/projects">Projects</NavLink></li>
                <li><NavLink to="/community">Community</NavLink></li>
                <li><NavLink to="portfolio">Portfolio</NavLink></li>
            </ul> 

            <div className="user-section">
                <button className='login-btn'>Login</button>
                <button className='signup-btn'>Sign up</button>
            </div>

        </div>
        

    </nav>
  )
}

export default Navbar
