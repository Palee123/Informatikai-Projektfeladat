import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import Navbar from "../components/Navbar";

function Profile() {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                window.location.href = "/login";
                return;
            }

            const response = await apiFetch("/profile");
            if (!response.ok) {
                setMessage("Hiba történt az adatok betöltésekor");
                return;
            }

            const data = await response.json();
            setEmail(data.email || "");
            setFullName(data.fullName || "");
            setPhone(data.phone || "");
            setAddress(data.address || "");
            setCity(data.city || "");
        } catch {
            setMessage("Szerver hiba");
        }
    }

    async function updateProfile() {
        try {
            const response = await apiFetch("/profile", {
                method: "PUT",
                body: JSON.stringify({ email, fullName, phone, address, city })
            });

            if (!response.ok) {
                setMessage("Mentés sikertelen");
                return;
            }
            setMessage("Profil sikeresen frissítve!");
        } catch {
            setMessage("Szerver hiba");
        }
    }

    async function changePassword() {
        try {
            const response = await apiFetch("/profile/change-password", {
                method: "PUT",
                body: JSON.stringify({ currentPassword, newPassword })
            });

            if (!response.ok) {
                setMessage("Jelszó módosítás sikertelen");
                return;
            }
            setMessage("Jelszó sikeresen módosítva!");
            setCurrentPassword("");
            setNewPassword("");
        } catch {
            setMessage("Szerver hiba");
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Fiókom beállításai</h1>
                
                {message && (
                    <div className={`message ${message.includes("sikeresen") ? "success" : ""}`}>
                        {message}
                    </div>
                )}

                <div className="profile-grid">
                    {/* 1. Kártya: Személyes adatok */}
                    <div className="profile-card">
                        <h2>Személyes adatok</h2>
                        
                        <label className="input-label">E-mail cím</label>
                        <input type="text" value={email} disabled style={{ backgroundColor: "#eaeaea", color: "#666" }} />

                        <label className="input-label">Teljes név</label>
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

                        <label className="input-label">Telefonszám</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

                        <label className="input-label">Város</label>
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

                        <label className="input-label">Utca, házszám</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

                        <button onClick={updateProfile} style={{ marginTop: "20px", width: "100%" }}>Adatok mentése</button>
                    </div>

                    {/* 2. Kártya: Jelszó módosítás */}
                    <div className="profile-card">
                        <h2>Biztonság</h2>
                        
                        <label className="input-label">Jelenlegi jelszó</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />

                        <label className="input-label">Új jelszó</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <button onClick={changePassword} style={{ marginTop: "20px", width: "100%", backgroundColor: "#28a745" }}>
                            Jelszó módosítása
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;