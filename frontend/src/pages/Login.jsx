import { useState } from "react";
import Navbar from "../components/Navbar";
import { apiFetch } from "../services/api";
import { Link } from "react-router";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function login() {
        try {
            const response = await apiFetch("/Auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                setMessage("Hibás bejelentkezés");
                return;
            }

            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
            setMessage("Sikeres login");
            window.location.href = "/";
        } catch (error) {
            setMessage("Szerver hiba");
        }
    }

    return (
        <>
            <Navbar />
            {/* Középre igazít */}
            <div className="container" style={{ minHeight: "calc(100vh - 150px)", display: "flex", alignItems: "center" }}>
                <div className="form-container">
                    <h2 style={{ textAlign: "center", color: "#111", marginBottom: "20px" }}>Bejelentkezés</h2>

                    <label className="input-label">E-mail cím</label>
                    <input
                        type="text"
                        placeholder="pelda@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="input-label">Jelszó</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={login} style={{ marginTop: "20px" }}>Belépés</button>

                    {message && (
                        <div className={`message ${message === "Sikeres login" ? "success" : ""}`} style={{ marginTop: "20px" }}>
                            {message}
                        </div>
                    )}

                    {/* Reg link */}
                    <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#666" }}>
                        Még nincs fiókod? <Link to="/register" style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}>Regisztrálj itt!</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;