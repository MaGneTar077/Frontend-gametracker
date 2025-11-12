import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token") || "");

    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenData);
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    useEffect(() => {
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, setUser, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
