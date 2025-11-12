import React, { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/users/login", { email, password });
            login(res.data.user, res.data.token); 
            alert("✅ Sesión iniciada correctamente");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("❌ Credenciales incorrectas o error en el login.");
        }
    };

    return (
        <main className="container-main">
            <h2>Iniciar sesión</h2>
            <form className="card" onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="btn" type="submit">
                    Iniciar sesión
                </button>
            </form>
        </main>
    );
}
