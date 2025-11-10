import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import LibraryPage from "./pages/LibraryPage";
import AddGamePage from "./pages/AddGamePage";
import ReviewsPage from "./pages/ReviewsPage";
import "./styles/app.css";
import StatsPage from "./pages/StatsPage";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<LibraryPage />} />
        <Route path="/add" element={<AddGamePage />} />
        <Route path="/reviews/:id" element={<ReviewsPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

