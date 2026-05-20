import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Checkout() {
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        city: "",
        address: "",

        cardName: "",
        cardNumber: "",
        expiry: "",
        cvc: ""
    });

    useEffect(() => {
        const storedCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        setCart(storedCart);

        const user =
            JSON.parse(localStorage.getItem("user"));

        if (user) {
            setFormData((prev) => ({
                ...prev,
                fullName: user.fullName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                city: user.city || "",
                address: user.address || ""
            }));
        }
    }, []);

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleOrder() {
        //console.log(formData);
        if (
            !formData.fullName ||
            !formData.email ||
            !formData.phoneNumber ||
            !formData.city ||
            !formData.address ||
            !formData.cardName ||
            !formData.cardNumber ||
            !formData.expiry ||
            !formData.cvc
        ) {
            setMessage("Minden mező kitöltése kötelező");
            return;
        }
        
        localStorage.removeItem("cart");

        setCart([]);

        setMessage("Rendelés sikeresen leadva!");
    }

    return (
        <>
            <Navbar />

            <div className="container">
                <h1>Checkout</h1>

                <div className="checkout-layout">

                    <div className="checkout-form">

                        <h2>Szállítási adatok</h2>

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Teljes név"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Telefonszám"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="city"
                            placeholder="Város"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="address"
                            placeholder="Utca, házszám"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                        <h2 className="payment-title">
                            Bankkártya adatok
                        </h2>

                        <input
                            type="text"
                            name="cardName"
                            placeholder="Kártyatulajdonos neve"
                            value={formData.cardName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                        />

                        <div className="card-row">
                            <input
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                value={formData.expiry}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="cvc"
                                placeholder="CVC"
                                value={formData.cvc}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button onClick={handleOrder}>
                            Rendelés leadása
                        </button>

                        {message && <p>{message}</p>}
                    </div>

                    <div className="checkout-summary">
                        <h2>Összegzés</h2>

                        {cart.map((item) => (
                            <div key={item.id}>
                                <p>
                                    {item.title} x {item.quantity}
                                </p>

                                <p>
                                    {item.price * item.quantity} Ft
                                </p>
                            </div>
                        ))}

                        <hr />

                        <h3>Végösszeg: {totalPrice} Ft</h3>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Checkout;