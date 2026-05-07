function ProductCard({ product }) {

    return (
        <div className="product-card">

            <img
                src={product.image}
                alt={product.title}
            />

            <div className="product-info">

                <h3>{product.title}</h3>

                <p>{product.description}</p>

                <h2>{product.price} Ft</h2>

                <button>
                    Megtekintés
                </button>

            </div>

        </div>
    );
}

export default ProductCard;