import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

export default function App() {
    const [dark, setDark] = useState(false);

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
                <h1>GameTracker</h1>
                <nav>
                    <Link to="/">Biblioteca</Link>
                    <Link to="/add">Agregar</Link>
                    <Link to="/stats">Estadísticas</Link>
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
