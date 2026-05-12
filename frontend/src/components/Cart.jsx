function Cart({
    cart,
    removeFromCart
}) {

    const totalPrice = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    return (
        <div className="cart">

            <h2>
                 Kosár
            </h2>

            {cart.length === 0 ? (

                <p>
                    A kosár üres.
                </p>

            ) : (

                <>
                    {cart.map((item, index) => (

                        <div
                            className="cart-item"
                            key={index}
                        >

                            <div>

                                <h4>
                                    {item.title}
                                </h4>

                                <p>
                                    {item.quantity} db
                                </p>

                            </div>

                            <div>

                                <p>
                                    {
                                        item.price *
                                        item.quantity
                                    } Ft
                                </p>

                                <button
                                    onClick={() =>
                                        removeFromCart(index)
                                    }
                                >
                                    Törlés
                                </button>

                            </div>

                        </div>

                    ))}

                    <h3>
                        Összesen:
                        {" "}
                        {totalPrice}
                        {" "}
                        Ft
                    </h3>
                </>

            )}

        </div>
    );
}

export default Cart;