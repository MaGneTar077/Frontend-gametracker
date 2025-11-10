import React from "react";
import GameForm from "../components/GameForm";

export default function AddGamePage() {
    return (
        <main className="container-main">
            <h2>Agregar Juego</h2>
            <GameForm onAdded={() => alert("Juego agregado ✅ Ahora ve a la Biblioteca")} />
        </main>
    );
}