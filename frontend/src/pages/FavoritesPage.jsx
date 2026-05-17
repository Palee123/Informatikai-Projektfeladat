import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function FavoritesPage() {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {

        const storedFavorites =
            JSON.parse(
                localStorage.getItem("favorites")
            ) || [];

        setFavorites(storedFavorites);

    }, []);

    return (
        <>
            <Navbar />

            <div className="container">

                <div className="hero">

                    <h1>❤️ Kedvencek</h1>

                    <p>
                        Kedvenc termékeid
                    </p>

                </div>

                <div className="products-grid">

                    {favorites.length === 0 ? (

                        <p>
                            Nincsenek kedvencek.
                        </p>

                    ) : (

                        favorites.map(product => (

                            <ProductCard
                                key={product.id}
                                product={product}
                                addToCart={() => {}}
                            />

                        ))
                    )}

                </div>

            </div>
        </>
    );
}

export default FavoritesPage;