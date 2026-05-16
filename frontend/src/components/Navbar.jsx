import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";

function Navbar() {
    const user = localStorage.getItem("user");
    const location = useLocation();
    
    // Tema alap vilagos
    const [theme, setTheme] = useState("light");

    // Mentett tema
    useEffect(() => {
        const savedTheme = localStorage.getItem("app-theme") || "light";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    // Tema valtas
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("app-theme", newTheme);
    };

    function logout() {
        localStorage.removeItem("user");
        window.location.reload();
    }

    return (
        <div className="header">
            {}
            <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'var(--text-heading)' }}>
                🛍️ Webshop
            </Link>

            <div className="nav">
                <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
                    Főoldal
                </Link>

                {!user ? (
                    <>
                        <Link to="/login" className={location.pathname === "/login" ? "active-link" : ""}>
                            Belépés
                        </Link>
                        <Link to="/register" className={location.pathname === "/register" ? "active-link" : ""}>
                            Regisztráció
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" className={location.pathname === "/profile" ? "active-link" : ""}>
                            Profilom
                        </Link>
                        <button onClick={logout} style={{ color: "white" }}>
                            Kilépés
                        </button>
                    </>
                )}

                {/* Sotet/Vilagos */}
                <button 
                    onClick={toggleTheme} 
                    style={{ background: "transparent", color: "var(--text-main)", border: "none", fontSize: "20px", padding: "0", cursor: "pointer", display: "flex", alignItems: "center" }}
                    title="Téma váltása"
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </div>
        </div>
    );
}

export default Navbar;