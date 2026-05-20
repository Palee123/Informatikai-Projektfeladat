import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { apiFetch } from "../services/api";
import CategoryFilter from "../components/CategoryFilter";

function Home() {
    const [selectedCategory, setSelectedCategory] = useState("Összes");
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");

    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    const isAdmin = currentUser?.role === "Admin";

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        try {
            const response = await apiFetch("/Products");

            if (!response.ok) {
                setMessage("Nem sikerült betölteni a termékeket.");
                return;
            }

            const data = await response.json();
            setProducts(data);
            localStorage.setItem("demoProducts", JSON.stringify(data));
        } catch (error) {
            console.log(error);
            setMessage("Nem sikerült betölteni a termékeket.");
        }
    }

    function addToCart(product) {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = storedCart.find((item) => item.id === product.id);

        let updatedCart;

        if (existingProduct) {
            updatedCart = storedCart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [
                ...storedCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    async function deleteProduct(productId) {
        const confirmed = window.confirm("Biztosan törölni szeretnéd ezt a terméket?");
        if (!confirmed) {
            return;
        }

        try {
            const response = await apiFetch(`/Products/${productId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                setMessage("A törlés nem sikerült.");
                return;
            }

            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );
            setMessage("A termék törölve lett.");
        } catch (error) {
            console.log(error);
            setMessage("Szerver hiba történt törlés közben.");
        }
    }

    const categoryNames = Array.from(
        new Set(
            products
                .map((product) => product.categoryName)
                .filter(Boolean)
        )
    );

    const filteredProducts = products.filter((product) => {
        const categoryMatch =
            selectedCategory === "Összes" ||
            product.categoryName === selectedCategory;

        const searchMatch =
            product.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            product.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        return categoryMatch && searchMatch;
    });

    return (
        <>
            <Navbar />

            <div className="container">
                <div className="hero">
                    <h1>Üdvözöllek a Webshopban</h1>
                    <p>Divatos termékek kedvező áron</p>
                </div>

                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <CategoryFilter
                    categories={categoryNames}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                {message && (
                    <div className={`message ${message.includes("törölve") ? "success" : ""}`}>
                        {message}
                    </div>
                )}

                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                            canDelete={isAdmin}
                            onDelete={deleteProduct}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
