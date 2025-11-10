import React, { useState, useEffect } from "react";
import API from "../api";
import GameCard from "../components/GameCard";

export default function LibraryPage() {
    const [games, setGames] = useState([]);

    const fetchGames = async () => {
        const res = await API.get("/games");
        setGames(res.data);
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const onDelete = async (id) => {
        await API.delete(`/games/${id}`);
        setGames(prev => prev.filter(g => g._id !== id));
    };

    const onToggleCompleted = async (game) => {
        const updated = await API.put(`/games/${game._id}`, {
            ...game,
            completed: !game.completed,
        });
        setGames(prev => prev.map(g =>
            g._id === updated.data._id ? updated.data : g
        ));
    };

    const onAddHour = async (game) => {
        const updated = await API.put(`/games/${game._id}`, {
            ...game,
            hoursPlayed: (game.hoursPlayed || 0) + 1,
        });
        setGames(prev =>
            prev.map(g => g._id === updated.data._id ? updated.data : g)
        );
    };

    return (
        <main className="container-main">
            <h2>Mi Biblioteca</h2>

            <div className="grid">
                {games.map(g => (
                    <GameCard
                        key={g._id}
                        game={g}
                        onDelete={onDelete}
                        onToggleCompleted={onToggleCompleted}
                        onAddHour={onAddHour}
                    />
                ))}
            </div>
        </main>
    );
}

