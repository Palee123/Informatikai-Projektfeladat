import { Link } from "react-router";

function Navbar() {

    const user = localStorage.getItem("user");

    function logout() {
        localStorage.removeItem("user");
        window.location.reload();
    }

    return (
        <div className="header">

            <div className="logo">
                Webshop
            </div>

            <div className="nav">

                <Link to="/">Főoldal</Link>

                {!user && (
                    <>
                        <Link to="/login">Login</Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}

                {user && (
                    <>
                        <Link to="/profile">
                            Profil
                        </Link>

                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                )}

            </div>

        </div>
    );
}

export default Navbar;