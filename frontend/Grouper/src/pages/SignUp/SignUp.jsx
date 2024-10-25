import React, {useState} from 'react'
import './signup.css'
import { NavLink } from 'react-router-dom';

function SignUp() {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



  return (
    <div className='signup'>
        <div className="left">
            <h1>Grouper</h1>
            <div className="slogan">Discover New Projects, Meet New People, Make an Impact</div>
        </div>

        <div className="divider"></div>

        <div className="right">
            <h2>Create Account</h2>
            <form>
                <input type="text" placeholder='Full Name' value={fullname} name='' onChange={e => setFullname(e.target.value)} />
                <input type="text" placeholder='Username' value={username} name='' onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder='Password' value={password} name='' onChange={e => setPassword(e.target.value)} />
                <button>Register</button>
            </form>
            <NavLink to={'/login'}>Already have an account? Login -&gt;</NavLink>
        </div>
        
            
      
    </div>
  )
}

export default SignUp
