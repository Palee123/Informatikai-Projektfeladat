import { useState } from "react";
import { apiFetch } from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router";

function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function register() {
        try {
            const response = await apiFetch("/Auth/register", {
                method: "POST",
                body: JSON.stringify({ email, username, password })
            });

            if (!response.ok) {
                setMessage("Sikertelen regisztráció");
                return;
            }

            setMessage("Sikeres regisztráció");
            window.location.href = "/login";
        } catch (error) {
            setMessage("Szerver hiba");
        }
    }

    return (
        <>
            <Navbar />
            <div className="container" style={{ minHeight: "calc(100vh - 150px)", display: "flex", alignItems: "center" }}>
                <div className="form-container">
                    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Regisztráció</h2>

                    <label className="input-label">E-mail cím</label>
                    <input
                        type="text"
                        placeholder="pelda@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="input-label">Felhasználónév</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className="input-label">Jelszó</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={register} style={{ marginTop: "20px" }}>Regisztráció</button>

                    {message && (
                        <div className={`message ${message === "Sikeres regisztráció" ? "success" : ""}`} style={{ marginTop: "20px" }}>
                            {message}
                        </div>
                    )}

                    <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#666" }}>
                        Már van fiókod? <Link to="/login" style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}>Lépj be itt!</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;