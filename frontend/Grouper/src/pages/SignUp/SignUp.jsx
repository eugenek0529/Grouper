import React, {useState} from 'react'
import './signup.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true; 



function SignUp() {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();



    const handleSignup = async (e) => {
        e.preventDefault(); 
        try {
            const res = await axios.post(`http://localhost:8000/api/auth/signup`, {fullname, username, password});
            if (res.status === 200) {
                alert('Sign up successful')
                setFullname('')
                setUsername('')
                setPassword('')
                navigate('/login'); 
                
            }
            
        } catch (error) {
            setError(error.response?.data?.error || "Error occurred during signup");
        }
    }

  return (
    <div className='signup'>
        <div className="left">
            <h1>Grouper</h1>
            <div className="slogan">Discover New Projects, Meet New People, Make an Impact</div>
        </div>

        <div className="divider"></div>

        <div className="right">
            <h2>Create Account</h2>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder='Full Name' value={fullname} name='' onChange={e => setFullname(e.target.value)} />
                <input type="text" placeholder='Username' value={username} name='' onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder='Password' value={password} name='' onChange={e => setPassword(e.target.value)} />
                <button type='submit'>Register</button>
            </form>
            <NavLink to={'/login'}>Already have an account? Login -&gt;</NavLink>
        </div>
        
            
      
    </div>
  )
}

export default SignUp
