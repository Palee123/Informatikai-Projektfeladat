import {
    BrowserRouter,
    Routes,
    Route
} from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import FavoritesPage from "./pages/FavoritesPage";
import Checkout from "./pages/Checkout";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/cart" element={<CartPage />} />

                <Route path="/product/:id" element={<ProductDetails />} />

                <Route path="/favorites" element={<FavoritesPage />} />

                <Route path="/checkout" element={<Checkout />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;