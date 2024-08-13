import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../services/api';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    // states
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");
    
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

    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem('jfa_token');
    }

    const tokenVerify = async (data) => {
        return await fetch(url + "/tokenVerify", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
    }

    // Resgatando dados após reabrir app
    useEffect(() => {

        (async () => {

            setLoading(true)
            let tokenStoraged = null;

            try {
                tokenStoraged = await AsyncStorage.getItem('jfa_token');

                if(tokenStoraged){
                    const resp = await tokenVerify({ token: tokenStoraged })
                    const json = await resp.json();

                    if(resp.status !== 200){
                        setAuthError("A sessão expirou.")
                        await logout();
                        return;
                    }

                    setUser(json.data.user)
                    setToken(tokenStoraged);
                }
            } catch (error) {
                setAuthError("A sessão expirou.")
                await logout()
            }finally{
                setLoading(false)
            }
            

        })()

    }, [])

    return (
        <AuthContext.Provider value={{ login, 
                                        register, 
                                        logout, 
                                        user, 
                                        setUser, 
                                        token, 
                                        setToken, 
                                        loading, 
                                        setLoading,
                                        authError,
                                        setAuthError
                                    }}>
            { children }
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}