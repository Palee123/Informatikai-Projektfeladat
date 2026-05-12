function ProductCard({
    product,
    addToCart
}) {

    return (
        <div className="product-card">

            <div className="product-image">

                <img
                    src={
                        product.imageUrl ||
                        "/images/default.jpg"
                    }
                    alt={product.title}
                />

            </div>

            <div className="product-info">

                <h3>{product.title}</h3>

                <p className="description">
                    {product.description}
                </p>

                <p className="category">
                    {product.categoryName}
                </p>

                <h2>
                    {product.price} Ft
                </h2>

                {product.isUsed && (
                    <span className="used-badge">
                        Használt
                    </span>
                )}

                <button
                    onClick={() => addToCart(product)}
                >
                    Kosárba
                </button>

            </div>

        </div>
    );
}

export default ProductCard;