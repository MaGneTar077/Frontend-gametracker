import React, { useEffect, useState } from "react";
import API from "../api";

export default function StatsPage() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const loadGames = async () => {
            const res = await API.get("/games");
            setGames(res.data);
        };
        loadGames();
    }, []);

    // ✅ Estadísticas calculadas
    const totalHours = games.reduce((sum, g) => sum + (g.hoursPlayed || 0), 0);
    const completedGames = games.filter(g => g.completed).length;
    const averageRating = games.length
        ? (games.reduce((sum, g) => sum + (g.rating || 0), 0) / games.length).toFixed(2)
        : 0;

    const mostPlayed = [...games].sort(
        (a, b) => (b.hoursPlayed || 0) - (a.hoursPlayed || 0)
    )[0];

    return (
        <main className="container-main">
            <h2>Estadísticas personales</h2>

            <div className="grid">
                <div className="card stat-card">
                    <h3>Horas totales jugadas</h3>
                    <p className="stat-number">{totalHours} h</p>
                </div>

                <div className="card stat-card">
                    <h3>Juegos completados</h3>
                    <p className="stat-number">{completedGames}</p>
                </div>

                <div className="card stat-card">
                    <h3>Promedio de calificación</h3>
                    <p className="stat-number">{averageRating} ★</p>
                </div>

                <div className="card stat-card">
                    <h3>Juego más jugado</h3>
                    {mostPlayed ? (
                        <>
                            <p className="stat-game">{mostPlayed.title}</p>
                            <p className="small">{mostPlayed.hoursPlayed} h</p>
                        </>
                    ) : (
                        <p className="small">No hay juegos registrados</p>
                    )}
                </div>
            </div>
        </main>
    );
}
