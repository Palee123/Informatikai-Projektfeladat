import { Link } from "react-router";
import { useEffect, useState } from "react";

function ProductCard({
    product,
    addToCart,
    canDelete = false,
    onDelete
}) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const exists = favorites.find((item) => item.id === product.id);
        setIsFavorite(!!exists);
    }, [product.id]);

    return (
        <Link
            to={`/product/${product.id}`}
            className="product-card-link"
        >
            <div className="product-card">
                <div className="product-image">
                    <img
                        src={product.imageUrl || "/images/default.jpg"}
                        alt={product.title}
                    />
                </div>

                <div className="product-info">
                    <h3>{product.title}</h3>
                    <p className="description">{product.description}</p>
                    <p className="category">{product.categoryName}</p>
                    <h2>{product.price} Ft</h2>

                    {product.isUsed && (
                        <span className="used-badge">Használt</span>
                    )}

                    <button
                        className="favorite-btn"
                        onClick={(e) => {
                            e.preventDefault();

                            const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
                            const exists = favorites.find((item) => item.id === product.id);

                            let updatedFavorites;

                            if (exists) {
                                updatedFavorites = favorites.filter((item) => item.id !== product.id);
                                setIsFavorite(false);
                            } else {
                                updatedFavorites = [...favorites, product];
                                setIsFavorite(true);
                            }

                            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                        }}
                    >
                        {isFavorite ? "❤️" : "🤍"}
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                    >
                        Kosárba
                    </button>

                    {canDelete && (
                        <button
                            className="admin-delete-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                onDelete?.(product.id);
                            }}
                        >
                            Törlés
                        </button>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
