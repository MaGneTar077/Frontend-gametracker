import React from "react";
import { Link } from "react-router-dom";

export default function GameCard({ game, onDelete, onToggleCompleted, onAddHour }) {
    return (
        <div className={`card ${game.completed ? 'completed' : ''}`}>
            <div className="card-content">
                <div className="cover-wrapper">
                    <img
                        className="game-cover"
                        src={game.coverUrl || "https://via.placeholder.com/640x360?text=Sin+Imagen"}
                        alt={game.title}
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/640x360?text=Error+de+Imagen";
                        }}
                    />
                </div>
                <div className="game-title">{game.title}</div>
                <div className="small">{game.platform}</div>
                
                {/* ⭐ Estrellas de rating */}
                <div className="stars-display">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <span
                            key={n}
                            className={n <= game.rating ? "star filled" : "star empty"}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>
            <div className="card-actions">
                <button
                    className={`btn ${game.completed ? 'btn-completed' : 'btn-secondary'}`}
                    onClick={() => onToggleCompleted(game)}
                    title={game.completed ? "Marcar como no completado" : "Marcar como completado"}
                >
                    {game.completed ? '✓ Completado' : 'Marcar completado'}
                </button>
                <Link to={`/reviews/${game._id}`} className="btn">Reseñas</Link>
                <button className="btn" onClick={() => onDelete(game._id)}>Eliminar</button>
                <div className="hours-row">
                    <span className="hours-text">⏱ {game.hoursPlayed || 0} horas</span>
                    <button
                        className="btn-hour"
                        onClick={() => onAddHour(game)}
                    >
                        +1 hora
                    </button>
                </div>
            </div>
        </div>
    );
}
