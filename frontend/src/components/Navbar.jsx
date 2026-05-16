import { Link, useLocation } from "react-router";

function Navbar() {
    const user = localStorage.getItem("user");
    const location = useLocation();

    function logout() {
        localStorage.removeItem("user");
        window.location.reload();
    }

    return (
        <div className="header">
            <Link to="/" className="logo" style={{ textDecoration: 'none', color: '#222' }}>
                🛍️ Webshop
            </Link>

            <div className="nav">
                {}
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
                        <button onClick={logout}>
                            Kilépés
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;