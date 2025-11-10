import { useState } from "react";
import API from "../api";
import React from "react";

export default function ReviewForm({ gameId, onAdded }) {
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");
    const [stars, setStars] = useState(5);

    const submit = async (e) => {
        e.preventDefault();
        const res = await API.post("/reviews", {
            gameId,
            author: author || "Anónimo",
            text,
            stars,
        });

        setAuthor("");
        setText("");
        setStars(5);

        onAdded(res.data);
    };

    return (
        <form className="card" onSubmit={submit}>
            <input
                className="input"
                placeholder="Tu nombre (opcional)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            <textarea
                className="input"
                placeholder="Escribe tu reseña"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />

            <div className="form-row">
                <select
                    value={stars}
                    onChange={(e) => setStars(Number(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={4}>4</option>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
                    <option value={0}>0</option>
                </select>

                <button className="btn" type="submit">
                    Enviar reseña
                </button>
            </div>
        </form>
    );
}
