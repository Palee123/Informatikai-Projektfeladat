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
    const [role, setRole] = useState("User");
    const [categories, setCategories] = useState([]);
    const [productForm, setProductForm] = useState({
        title: "",
        description: "",
        price: "",
        isUsed: false,
        categoryId: "",
        imageUrl: "",
        meret: "",
        type: ""
    });

    useEffect(() => {
        loadProfile();
        loadCategories();
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
            setRole(data.role || "User");

            localStorage.setItem("user", JSON.stringify({
                ...user,
                role: data.role || "User"
            }));
        } catch {
            setMessage("Szerver hiba");
        }
    }

    async function loadCategories() {
        try {
            const response = await apiFetch("/Categories");
            if (!response.ok) {
                return;
            }

            const data = await response.json();
            setCategories(data);
        } catch {
            setCategories([]);
        }
    }

    async function updateProfile() {
        try {
            const response = await apiFetch("/profile", {
                method: "PUT",
                body: JSON.stringify({ email, fullName, phone, address, city, role })
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

    function handleProductFieldChange(field, value) {
        setProductForm((prev) => ({
            ...prev,
            [field]: value
        }));
    }

    async function createProduct() {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await apiFetch("/Products", {
                method: "POST",
                body: JSON.stringify({
                    title: productForm.title,
                    description: productForm.description,
                    price: Number(productForm.price),
                    isUsed: productForm.isUsed,
                    userId: user.userId,
                    categoryId: Number(productForm.categoryId),
                    imageUrl: productForm.imageUrl || null,
                    meret: productForm.meret,
                    type: productForm.type
                })
            });

            if (!response.ok) {
                setMessage("Termék létrehozása sikertelen");
                return;
            }

            setProductForm({
                title: "",
                description: "",
                price: "",
                isUsed: false,
                categoryId: "",
                imageUrl: "",
                meret: "",
                type: ""
            });
            setMessage("Termék sikeresen létrehozva!");
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
                    <div className={`message ${message.includes("sikeresen") || message.includes("létrehozva") ? "success" : ""}`}>
                        {message}
                    </div>
                )}

                <div className="profile-grid">
                    <div className="profile-card">
                        <h2>Személyes adatok</h2>

                        <label className="input-label">E-mail cím</label>
                        <input type="text" value={email} disabled style={{ backgroundColor: "#eaeaea", color: "#666" }} />

                        <label className="input-label">Szerepkör</label>
                        <input type="text" value={role} disabled style={{ backgroundColor: "#eaeaea", color: "#666" }} />

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

                    {role === "Admin" && (
                        <div className="profile-card">
                            <h2>Admin termékfeltöltés</h2>

                            <label className="input-label">Termék neve</label>
                            <input
                                type="text"
                                value={productForm.title}
                                onChange={(e) => handleProductFieldChange("title", e.target.value)}
                            />

                            <label className="input-label">Leírás</label>
                            <input
                                type="text"
                                value={productForm.description}
                                onChange={(e) => handleProductFieldChange("description", e.target.value)}
                            />

                            <label className="input-label">Ár</label>
                            <input
                                type="number"
                                min="1"
                                value={productForm.price}
                                onChange={(e) => handleProductFieldChange("price", e.target.value)}
                            />

                            <label className="input-label">Típus</label>
                            <input
                                type="text"
                                value={productForm.type}
                                onChange={(e) => handleProductFieldChange("type", e.target.value)}
                            />

                            <label className="input-label">Méret</label>
                            <input
                                type="text"
                                value={productForm.meret}
                                onChange={(e) => handleProductFieldChange("meret", e.target.value)}
                            />

                            <label className="input-label">Kép URL</label>
                            <input
                                type="text"
                                value={productForm.imageUrl}
                                onChange={(e) => handleProductFieldChange("imageUrl", e.target.value)}
                            />

                            <label className="input-label">Kategória</label>
                            <select
                                value={productForm.categoryId}
                                onChange={(e) => handleProductFieldChange("categoryId", e.target.value)}
                            >
                                <option value="">Válassz kategóriát</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            <label className="checkbox-row">
                                <input
                                    type="checkbox"
                                    checked={productForm.isUsed}
                                    onChange={(e) => handleProductFieldChange("isUsed", e.target.checked)}
                                />
                                <span>Használt termék</span>
                            </label>

                            <button onClick={createProduct} style={{ marginTop: "20px", width: "100%" }}>
                                Termék hozzáadása
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Profile;
