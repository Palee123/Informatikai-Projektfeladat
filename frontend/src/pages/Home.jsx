import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import { apiFetch } from "../services/api";

function Home() {

    //TESZTHEZ CSAK
    const demoProducts = [
        {
            id: 1,
            title: "test2",
            description: "Polótest2.",
            price: 450000,
            image:
                "https://localhost:7200/images/products/tshirt1.jpg"
        },

        {
            id: 2,
            title: "test1",
            description: "test1.",
            price: 35000,
            image:
                "https://localhost:7200/images/products/tshirt1.jpg"
        },

        {
            id: 3,
            title: "test3",
            description: "test3",
            price: 90000,
            image:
                "https://localhost:7200/images/products/tshirt1.jpg"
        }
    ];




    const [products, setProducts] = useState([]);

    useEffect(() => {

        loadProducts();

    }, []);

    async function loadProducts() {

        try {

            const response = await apiFetch(
                "/Products"
            );

            if (!response.ok) {
                return;
            }

            const data = await response.json();

            setProducts(data);
            //test
            console.log(data);

        }
        catch (error) {

            console.log(error);
        }
    }

    return (
        <>
            <Navbar />

            <div className="container">

                <div className="hero">

                    <h1>
                        Üdvözöllek a Webshopban
                    </h1>

                </div>

                <div className="products-grid">

                    {demoProducts.map(product => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))}

                </div>

            </div>
        </>
    );
}
export default Home;