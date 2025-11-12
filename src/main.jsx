import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import LibraryPage from "./pages/LibraryPage";
import AddGamePage from "./pages/AddGamePage";
import ReviewsPage from "./pages/ReviewsPage";
import "./styles/app.css";
import StatsPage from "./pages/StatsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, AuthContext } from "./AuthContext";
import { useContext } from "react";

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" replace />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={<PrivateRoute><LibraryPage /></PrivateRoute>}
          />
          <Route
            path="/add"
            element={<PrivateRoute><AddGamePage /></PrivateRoute>}
          />
          <Route
            path="/reviews/:id"
            element={<PrivateRoute><ReviewsPage /></PrivateRoute>}
          />
          <Route
            path="/stats"
            element={<PrivateRoute><StatsPage /></PrivateRoute>}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
  );