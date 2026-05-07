import { useState } from "react";

import Navbar from "../components/Navbar";
import { apiFetch } from "../services/api";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    async function login() {

        try {

            const response = await apiFetch(
                "/Auth/login",
                {
                    method: "POST",

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            if (!response.ok) {
                setMessage("Hibás bejelentkezés");
                return;
            }

            const data = await response.json();

            console.log(data);

            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );

            setMessage("Sikeres login");

            window.location.href = "/";

        }
        catch (error) {

            setMessage("Szerver hiba");
        }
    }

    return (
        <>
            <Navbar />

            <div className="container">

                <div className="form-container">

                    <h2>Bejelentkezés</h2>

                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Jelszó"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button onClick={login}>
                        Belépés
                    </button>

                    <p>{message}</p>

                </div>

            </div>
        </>
    );  
}

export default Login;