import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import ReviewForm from "../components/ReviewForm";
import React from "react";


export default function ReviewsPage() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [game, setGame] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const r = await API.get(`/reviews/game/${id}`);
            setReviews(r.data);

            const g = await API.get(`/games`);
            setGame(g.data.find((x) => x._id === id));
        };

        fetchData();
    }, [id]);

    const onAdded = (review) => setReviews(prev => [review, ...prev]);

    const handleDelete = async (reviewId) => {
        if (window.confirm("¿Seguro que quieres eliminar esta reseña?")) {
            try {
                await API.delete(`/reviews/${reviewId}`);
                setReviews(reviews.filter(r => r._id !== reviewId));
            } catch (error) {
                alert("No se pudo eliminar la reseña. Intenta de nuevo.");
            }
        }
    };

    return (
        <main className="container-main">
            <h2>Reseñas {game ? `— ${game.title}` : ""}</h2>

            <div className="reviews-container">
                <ReviewForm gameId={id} onAdded={onAdded} />

                <div>
                    {reviews.map((r) => (
                        <div key={r._id} className="review-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>
                                        {r.author}
                                        <span className="review-stars">
                                            {' '}{Array(r.stars).fill('★').join('')}
                                        </span>
                                    </div>
                                    <div className="small">
                                        {new Date(r.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(r._id)}
                                    className="btn"
                                    style={{
                                        padding: '4px 8px',
                                        minWidth: 'auto',
                                        fontSize: '14px',
                                        background: 'var(--bg-soft)',
                                        color: 'var(--text-muted)'
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                            <p>{r.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

