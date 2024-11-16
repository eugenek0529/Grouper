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
                <li><NavLink to="/projects">Projects</NavLink></li>
                <li><NavLink to="/groups">Groups</NavLink></li>
                <li><NavLink to="/portfolio">Portfolio</NavLink></li>
            </ul> 

            <div className="user-section">
                { user ? (
                    <>
                
                    <p>Hello {user.fullname}</p>
                    
                    <button className='logout-btn' onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                    <button className='signup-btn'>
                        <NavLink to="/signup">Sign up</NavLink>
                    </button>
                    <button className='login-btn'>
                        <NavLink to="/login">Login</NavLink>
                    </button>
                    </>
                )}

                
            </div>

        </div>
        

    </nav>
  )
}

export default Navbar
