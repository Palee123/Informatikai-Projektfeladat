import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const demoProducts =
            JSON.parse(localStorage.getItem("demoProducts")) || [];

        const foundProduct = demoProducts.find(
            item => item.id === Number(id)
        );

        setProduct(foundProduct);
    }, [id]);

    function addToCart(product) {
        const storedCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = storedCart.find(
            item => item.id === product.id
        );

        let updatedCart;

        if (existingProduct) {
            updatedCart = storedCart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [
                ...storedCart,
                { ...product, quantity: 1 }
            ];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="container">
                    <h2>A termék nem található.</h2>
                    <Link to="/">Vissza a főoldalra</Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container">
                <div className="product-details">
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="details-image"
                    />

                    <div className="details-info">
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>

                        <p>
                            <strong>Kategória:</strong>{" "}
                            {product.categoryName}
                        </p>

                        <p>
                            <strong>Méret:</strong>{" "}
                            {product.meret}
                        </p>

                        <p>
                            <strong>Állapot:</strong>{" "}
                            {product.isUsed ? "Használt" : "Új"}
                        </p>

                        <h2>{product.price} Ft</h2>

                        <button onClick={() => addToCart(product)}>
                            Kosárba
                        </button>

                        <Link to="/" className="back-link">
                            Vissza a termékekhez
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;