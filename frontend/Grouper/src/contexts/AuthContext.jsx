import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';


export const AuthContext = createContext(); 

export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);

    const verifyToken = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/auth/verify', {
                withCredentials: true,
            });
            setUser(response.data);
            //console.log(response.data)
            return true;
        } catch {
            setUser(null);
            return false;
        }
    };


    // login - authenticate user & receive token
    const login = async (username, password) => {
        
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', { username, password }, { withCredentials: true });
            // const isVerified = await verifyToken();
            // return isVerified;
            // response.data has id, fullname, username
            setUser(response.data);
            return true;
        } catch (error) {
            console.log("Login failed: ", error.response?.data?.error || error.message);
            return false;

        }
    }; 



    useEffect(() => {
        verifyToken();
      }, []);
   


    // logout - clear user and token
    const logout = async () => {
        try {
            await axios.post('http://localhost:8000/api/auth/logout', {}, { withCredentials: true });
            setUser(null); 
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    }




    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}