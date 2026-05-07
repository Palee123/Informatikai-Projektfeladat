import { useState } from "react";
import { apiFetch } from "../services/api";
import Navbar from "../components/Navbar";

function Register() {

    const [email, setEmail] = useState("");

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    async function register() {

        try {

            const response = await apiFetch(
                "/Auth/register",
                {
                    method: "POST",

                    body: JSON.stringify({
                        email,
                        username,
                        password
                    })
                }
            );;

            if (!response.ok) {
                setMessage("Sikertelen regisztráció");
                return;
            }

            setMessage("Sikeres regisztráció");

            window.location.href = "/login";

        }
        catch (error) {

            setMessage("Szerver hiba");
        }
    }

    return (
        <>
            <Navbar />

            <div className="container">

                <h2>Regisztráció</h2>

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
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

                <button onClick={register}>
                    Regisztráció
                </button>

                <p>{message}</p>

            </div>
        </>
    );
}

export default Register;