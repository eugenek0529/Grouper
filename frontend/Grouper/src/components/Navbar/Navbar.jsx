import React,{ useContext } from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext.jsx';


function Navbar() {

    const { user, logout } = useContext(AuthContext);
  
    

  return (
    <nav>
        <h1>
            <NavLink to="/" className='logo'>
                Grouper
            </NavLink>
        </h1>
        <div className="right-section">
            <ul className='nav-menu'>
                <li>
                    <NavLink 
                    className={({ isActive }) => (isActive ? 'active' : '')} 
                    to="/projects">Projects</NavLink>
                </li>
                <li>
                    <NavLink 
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    to="/groups">Groups</NavLink></li>
                <li>
                    <NavLink 
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    to="/portfolio">Portfolio</NavLink></li>
            </ul> 
            

            <div className="user-section">
                { user ? (
                    <div className='loggedIn'>
                
                    <p>[Hello {user.fullname}]</p>
                    
                    <button className='logout-btn' onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <div className='loggedOut'>
                    <button className='signup-btn'>
                        <NavLink to="/signup">Sign up</NavLink>
                    </button>
                    <button className='login-btn'>
                        <NavLink to="/login">Login</NavLink>
                    </button>
                    </div>
                )}

                
            </div>

        </div>
        

    </nav>
  )
}

export default Navbar
