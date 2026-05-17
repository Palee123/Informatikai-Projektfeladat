import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { apiFetch } from "../services/api";
import CategoryFilter from "../components/CategoryFilter";
import Cart from "../components/Cart";

function Home() {

    //TESZTHEZ CSAK
    const demoProducts = [
        {
            id: 1,
            title: "Fehér Sneaker",
            description: "Modern fehér utcai cipő.",
            meret: "42",
            price: 24990,
            categoryName: "Cipők",
            isUsed: false,
            imageUrl:
                "https://localhost:7200/images/products/cipo.jpg"
        },

        {
            id: 2,
            title: "Bézs Kabát",
            description: "Elegáns hosszú bézs kabát.",
            meret: "M",
            price: 39990,
            categoryName: "Kabátok",
            isUsed: false,
            imageUrl:
                "https://localhost:7200/images/products/kabat.jpg"
        },

        {
            id: 3,
            title: "Cargo Nadrág",
            description: "Kényelmes zöld cargo nadrág.",
            meret: "38",
            price: 18990,
            categoryName: "Nadrágok",
            isUsed: true,
            imageUrl:
                "https://localhost:7200/images/products/nadrag.jpg"
        },

        {
            id: 4,
            title: "Fekete Póló",
            description: "Minimalista fekete póló.",
            meret: "M",
            price: 8990,
            categoryName: "Pólók",
            isUsed: false,
            imageUrl:
                "https://localhost:7200/images/products/polo.jpg"
        },

        {
            id: 5,
            title: "Nyári Ruha",
            description: "Könnyű nyári ruha mintával.",
            meret: "S",
            price: 15990,
            categoryName: "Ruhák",
            isUsed: false,
            imageUrl:
                "https://localhost:7200/images/products/ruha.jpg"
        },

        {
            id: 6,
            title: "Fekete Tshirt",
            description: "Egyszerű fekete basic póló.",
            meret: "XL",
            price: 6990,
            categoryName: "Pólók",
            isUsed: true,
            imageUrl:
                "https://localhost:7200/images/products/tshirt1.jpg"
        }
    ];

    
    const [selectedCategory, setSelectedCategory] = useState("Összes");
    const [searchTerm, setSearchTerm] = useState("");


    const [products, setProducts] = useState([]);

    useEffect(() => {

        loadProducts();

        localStorage.setItem("demoProducts", JSON.stringify(demoProducts));

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

    //CART LOGIKA
    function addToCart(product) {

        const storedCart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        const existingProduct =
            storedCart.find(
                item => item.id === product.id
            );

        let updatedCart;

        if (existingProduct) {

            updatedCart = storedCart.map(item =>

                item.id === product.id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
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

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    }

    

    // products.filter DE EGYENLŐRE TESZTELÉSHEZ demoProducts
    const filteredProducts =    demoProducts.filter(product => {

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

                    <h1>
                        Üdvözöllek a Webshopban
                    </h1>

                    <p>
                        Divatos termékek kedvező áron
                    </p>

                </div>

                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <CategoryFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={
                        setSelectedCategory
                    }
                />


                <div className="products-grid">

                    
                    {filteredProducts.map(product => (

                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                        />

                    ))} 

                </div>



            </div>
        </>
    );
}
export default Home;