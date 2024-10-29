import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext(); 

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null); //store token in memory (stete, not local storage)
    const [user, setUser] = useState(null); 

    // login - authenticate user & receive token
    const login = async (username, password) => {
        try {
            const res = await axios.post('http://localhost:8000/api/auth/login', { username, password })
            const token = res.data; 
            const userData = res.data.fullname
            
            setToken(token); 
            setUser(userData); 
            console.log(res.data)
            return true; 
        } catch (error) {
            console.log("Login failed: ", error.response?.data?.error || error.message);
        }
    }; 


    // logout - clear user and token
    const logout = () => {
        setToken(null); 
        setUser(null); 
    }


    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}