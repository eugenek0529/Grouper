import { useState } from 'react';
import './login.css'
import { NavLink } from 'react-router-dom';


export default function Login() {

  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div className='login'>

        <div className="left">
            <h1>Grouper</h1>
            <div className="slogan">Discover New Projects, Meet New People, Make an Impact</div>
        </div>

        <div className="divider"></div>

        <div className="right">
            <h2>User Login</h2>
            <form>
                <input type="text" placeholder='Username' value={username} name='' onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder='Password' value={password} name='' onChange={e => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
            <NavLink to={'/signup'}>New to Grouper? Create your account -&gt;</NavLink>
        </div>
        
    </div>
  )
}
