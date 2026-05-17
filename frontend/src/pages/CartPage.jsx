import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function CartPage() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        setCart(storedCart);
    }, []);

    function removeFromCart(indexToRemove) {
        const updatedCart = cart.filter(
            (item, index) => index !== indexToRemove
        );

        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    }

    return (
        <>
            <Navbar />

            <div className="container">
                <div className="hero">
                    <h1>🛒 Kosár</h1>
                    <p>A kiválasztott termékeid</p>
                </div>

                <div className="cart-page">
                    {cart.length === 0 ? (
                        <p>A kosár üres.</p>
                    ) : (
                        cart.map((item, index) => (
                            <div className="cart-item" key={index}>
                                <div>
                                    <h3>{item.title} × {item.quantity}</h3>
                                    <p>{item.price * item.quantity} Ft</p>
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(index)}
                                >
                                    Törlés
                                </button>
                            </div>
                        ))
                    )}

                    {cart.length > 0 && (
                        <h2 className="cart-total">
                            Összesen:{" "}
                            {cart.reduce(
                                (sum, item) =>
                                    sum + item.price * item.quantity,
                                0
                            )}{" "}
                            Ft
                        </h2>
                    )}
                </div>
            </div>
        </>
    );
}

export default CartPage;