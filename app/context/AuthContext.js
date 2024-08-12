import { createContext, useContext, useState } from "react";
import { url } from '../services/api';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    // states
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    
    // functions
    const login = async (data) => {
        return await fetch(url + "/login", {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
    }

    const register = async (data) => {
        return await fetch(url + "/register", {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
    }

    const logout = () => {
        setUser(null)
        setToken(null)
    }

    // useEffect para resgatar dados do async storaged

    return (
        <AuthContext.Provider value={{ login, register, logout, user, setUser, token, setToken }}>
            { children }
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}