import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await API.post("/users/register", { email, password });
        alert("✅ Registro exitoso. Ahora inicia sesión.");
        navigate("/login");
        } catch (err) {
        alert("❌ Error al registrarse. Intenta de nuevo.");
        }
    };

    return (
        <main className="container-main">
        <h2>Crear cuenta</h2>
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
            <button className="btn" type="submit">Registrarse</button>
        </form>
        </main>
    );
    }
