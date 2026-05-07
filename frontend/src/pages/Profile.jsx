import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import Navbar from "../components/Navbar";

function Profile() {

    const [email, setEmail] = useState("");

    const [fullName, setFullName] = useState("");

    const [phone, setPhone] = useState("");

    const [address, setAddress] = useState("");

    const [city, setCity] = useState("");

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [message, setMessage] = useState("");

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {
        //console.log(user);
        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (!user) {
                window.location.href = "/login";
                return;
            }

            const response = await apiFetch(
                "/profile"
            );

            if (!response.ok) {
                setMessage("Hiba történt");
                return;
            }

            const data = await response.json();

            setEmail(data.email || "");
            setFullName(data.fullName || "");
            setPhone(data.phone || "");
            setAddress(data.address || "");
            setCity(data.city || "");

        }
        catch {

            setMessage("Szerver hiba");
        }
    }

    async function updateProfile() {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            const response = await apiFetch(
                "/profile",
                {
                    method: "PUT",

                    body: JSON.stringify({
                        fullName,
                        phone,
                        address,
                        city
                    })
                }
            );

            if (!response.ok) {
                setMessage("Mentés sikertelen");
                return;
            }

            setMessage("Profil frissítve");

        }
        catch {

            setMessage("Szerver hiba");
        }
    }

    async function changePassword() {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            const response = await apiFetch(
                "/profile/change-password",
                {
                    method: "POST",

                    body: JSON.stringify({
                        currentPassword,
                        newPassword
                    })
                }
            );

            if (!response.ok) {
                setMessage("Jelszó módosítás sikertelen");
                return;
            }

            setMessage("Jelszó módosítva");

        }
        catch {

            setMessage("Szerver hiba");
        }
    }

    return (
        <>
            <Navbar />

            <div className="container">

                <h1>Profil</h1>

                <h2>Adatok</h2>

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    disabled
                />

                <input
                    type="text"
                    placeholder="Teljes név"
                    value={fullName}
                    onChange={(e) =>
                        setFullName(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Telefonszám"
                    value={phone}
                    onChange={(e) =>
                        setPhone(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Cím"
                    value={address}
                    onChange={(e) =>
                        setAddress(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Város"
                    value={city}
                    onChange={(e) =>
                        setCity(e.target.value)
                    }
                />

                <button onClick={updateProfile}>
                    Mentés
                </button>

                <hr />

                <h2>Jelszó módosítás</h2>

                <input
                    type="password"
                    placeholder="Jelenlegi jelszó"
                    value={currentPassword}
                    onChange={(e) =>
                        setCurrentPassword(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Új jelszó"
                    value={newPassword}
                    onChange={(e) =>
                        setNewPassword(e.target.value)
                    }
                />

                <button onClick={changePassword}>
                    Jelszó módosítás
                </button>

                <p>{message}</p>

            </div>
        </>
    );
}

export default Profile;