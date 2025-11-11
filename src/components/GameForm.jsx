import React, { useState } from "react";
import API from "../api";

export default function GameForm({ onAdded }) {
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");
    const [coverUrl, setCoverUrl] = useState("");
    const [hoursPlayed, setHoursPlayed] = useState(0); // ✅ NUEVO
    const [rating, setRating] = useState(0);


    const submit = async (e) => {
        e.preventDefault();

        const res = await API.post('/games', {
            title,
            platform,
            coverUrl,
            hoursPlayed, // ✅ NUEVO
            rating
        });

        // ✅ Reiniciar campos
        setTitle('');
        setPlatform('');
        setCoverUrl('');
        setHoursPlayed(0);
        setRating(0);

        onAdded(res.data);
    };

    return (
        <form className="card" onSubmit={submit}>

            <div className="form-row">
                <input
                    className="input"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Título"
                    required
                />
            </div>

            <div className="form-row">
                <input
                    className="input"
                    value={platform}
                    onChange={e => setPlatform(e.target.value)}
                    placeholder="Plataforma"
                />
            </div>

            <div className="form-row">
                <input
                    className="input"
                    value={coverUrl}
                    onChange={e => setCoverUrl(e.target.value)}
                    placeholder="URL de portada (opcional)"
                />
            </div>

            {/* ✅ NUEVO CAMPO: Horas jugadas */}
            <div className="form-row">
                <input
                    className="input"
                    type="number"
                    min="0"
                    value={hoursPlayed}
                    onChange={e => setHoursPlayed(Number(e.target.value))}
                    placeholder="Horas jugadas (opcional)"
                />
            </div>
            {/* ⭐ Estrellas para seleccionar rating */}
            <div className="stars-input">
                {[1, 2, 3, 4, 5].map((n) => (
                    <span
                        key={n}
                        className={n <= rating ? "star selected" : "star"}
                        onClick={() => setRating(n)}
                    >
                        ★
                    </span>
                ))}
            </div>

            <button className="btn" type="submit">Agregar juego</button>
        </form>
    );
}


