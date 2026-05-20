import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { apiFetch } from "../services/api";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(undefined);

    useEffect(() => {
        loadProduct();
    }, [id]);

    async function loadProduct() {
        try {
            const response = await apiFetch(`/Products/${id}`);
            if (!response.ok) {
                setProduct(null);
                return;
            }

            const data = await response.json();

            console.log("API RESPONSE:", data);
            console.log("MERET:", data.meret);
            console.log("MERET NAGYBETU:", data.Meret);

            setProduct(data);
        } catch {
            setProduct(null);
        }
    }

    function addToCart(selectedProduct) {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = storedCart.find(
            (item) => item.id === selectedProduct.id
        );

        let updatedCart;

        if (existingProduct) {
            updatedCart = storedCart.map((item) =>
                item.id === selectedProduct.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [
                ...storedCart,
                { ...selectedProduct, quantity: 1 }
            ];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    if (product === undefined) {
        return (
            <>
                <Navbar />
                <div className="container">
                    <h2>Betöltés...</h2>
                </div>
            </>
        );
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
                        src={product.imageUrl || "/images/default.jpg"}
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
                            {product.meret || "-"}
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
