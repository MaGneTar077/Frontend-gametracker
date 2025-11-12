import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";
import { AuthContext } from "./AuthContext";
import "./styles/App.css";

export default function App() {
    const [dark, setDark] = useState(false);
    const { token, setToken, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    useEffect(() => {
    if (dark) {
    document.body.classList.add("dark");
    } else {
    document.body.classList.remove("dark");
    }
}, [dark]);

    return (
        <header className="app-header">
            <div className="container">
                <div className="logo-box">
                    <img src={logo} alt="Logo" className="rlz-logo" />
                    <h1 className="rlz-title">RLZ-TRACKER</h1>
                </div>
                <nav>
                    {token && (
                        <>
                            <Link to="/">Biblioteca</Link>
                            <Link to="/add">Agregar</Link>
                            <Link to="/stats">Estadísticas</Link>
                        </>
                    )}
                    {!token ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Registro</Link>
                        </>
                    ) : (
                        <button className="btn" onClick={logout}>
                            Cerrar sesión
                        </button>
                    )}
                    <button
                        className="btn"
                        style={{ marginLeft: "12px" }}
                        onClick={() => setDark(!dark)}
                    >
                        {dark ? "Modo claro" : "Modo galaxia"}
                    </button>
                </nav>
            </div>
        </header>
    );
}
