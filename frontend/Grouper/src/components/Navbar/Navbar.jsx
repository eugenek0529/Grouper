import React from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
        <h1>
            <Link to="/" className='logo'>
                Grouper
            </Link>
        </h1>
        <div className="right-section">
            <ul className='nav-menu'>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="portfolio">Portfolio</Link></li>
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
