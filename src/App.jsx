import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Összes");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState("products");

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    isUsed: false,
    userId: 1,
    categoryId: 1,
    imageUrl: "",
    Meret: "",
    type: ""
  });

  useEffect(() => {
    fetch("https://localhost:7200/api/Products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Hiba:", err));
  }, []);

  function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    setCart(
      cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } else {
    setCart([...cart, { ...product, quantity: 1 }]);
  }
}

  function removeFromCart(indexToRemove) {
    setCart(cart.filter((item, index) => index !== indexToRemove));
  }

  function loginAsAdmin(e) {
    e.preventDefault();

    if (adminPassword === "admin123") {
      setIsAdmin(true);
    } else {
      alert("Hibás jelszó!");
    }
  }


  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;

    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : value
    });
  }

  function addProduct(e) {
  e.preventDefault();

  const productToSend = {
    ...newProduct,
    price: Number(newProduct.price),
    createdAt: new Date().toISOString()
  };

  fetch("https://localhost:7200/api/Products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productToSend)
  })
    .then(async res => {
      if (!res.ok) {
        const error = await res.text();
        console.error(error);
        alert("Hiba történt a termék hozzáadásakor!");
        return null;
      }

      return res.json();
    })
    .then(data => {
      if (!data) return;

      setProducts([...products, data]);

      setNewProduct({
        title: "",
        description: "",
        price: "",
        isUsed: false,
        userId: 1,
        categoryId: 1,
        imageUrl: "",
        Meret: "",
        type: ""
      });
    })
    .catch(err => console.error("Hiba:", err));
}

  function getProductImage(product) {
    const title = product.title.toLowerCase();

    if (title.includes("póló")) return "/images/polo.jpg";
    if (title.includes("nadrág")) return "/images/nadrag.jpg";
    if (title.includes("cipő")) return "/images/cipo.jpg";
    if (title.includes("kabát")) return "/images/kabat.jpg";
    if (title.includes("ruha")) return "/images/ruha.jpg";

    return "/images/default.jpg";
  }

  function getProductCategory(product) {
    const title = product.title.toLowerCase();

    if (title.includes("póló")) return "Pólók";
    if (title.includes("nadrág")) return "Nadrágok";
    if (title.includes("cipő")) return "Cipők";
    if (title.includes("kabát")) return "Kabátok";
    if (title.includes("ruha")) return "Ruhák";

    return "Egyéb";
  }

  const filteredProducts = products.filter(product => {
  const categoryMatch =
    selectedCategory === "Összes" ||
    getProductCategory(product) === selectedCategory;

  const searchMatch =
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase());

  return categoryMatch && searchMatch;
});

  return (
    <div className="page">
      <nav className="navbar">
        <div className="logo">Fashion Store</div>

        <input
  type="text"
  className="searchInput"
  placeholder="Keresés..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

        <div className="navLinks">
          <button className="navButton" onClick={() => setCurrentPage("products")}>
  Termékek
</button>

<button className="navButton" onClick={() => setCurrentPage("cart")}>
  Kosár
</button>

<button className="navButton" onClick={() => setCurrentPage("login")}>
  Bejelentkezés
</button>
        </div>
      </nav>

      <header className="hero">
        <h1>Fashion Store</h1>
        <p>Divatos ruhák kedvező áron</p>
        <p className="cart">🛒 Kosár: {cart.length} db</p>
      </header>

      {currentPage === "products" && (
  <>
      <div className="filters">
        {["Összes", "Pólók", "Nadrágok", "Cipők", "Kabátok", "Ruhák"].map(category => (
          <button
            key={category}
            className={selectedCategory === category ? "filterButton active" : "filterButton"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <main className="products">
        {filteredProducts.map(product => (
          <div className="card" key={product.id}>
            <div className="imageBox">
              <img
  src={product.imageUrl || getProductImage(product)}
  alt={product.title}
/>
            </div>

            <div className="cardBody">
              <h2>{product.title}</h2>
              <p className="desc">{product.description}</p>
              <p className="price">{product.price} Ft</p>

              <button onClick={() => addToCart(product)}>
                Kosárba
              </button>
            </div>
          </div>
        ))}
      </main>
        </>
)}
      {currentPage === "cart" && (
  <section className="cartPage">
    <h2>🛒 Kosár</h2>

    {cart.length === 0 ? (
      <p>A kosár üres.</p>
    ) : (
      cart.map((item, index) => (
        <div className="cartItem" key={index}>
          <span>{item.title} × {item.quantity}</span>
          <span>{item.price * item.quantity} Ft</span>
          <button className="removeButton" onClick={() => removeFromCart(index)}>
            Törlés
          </button>
        </div>
      ))
    )}

    {cart.length > 0 && (
      <h3 className="total">
        Összesen: {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} Ft
      </h3>
    )}
  </section>
)}
<section className="adminSection">
  {!isAdmin ? (
    <>
      <h2>Admin belépés</h2>

      <form onSubmit={loginAsAdmin} className="adminForm">
        <input
          type="password"
          placeholder="Admin jelszó"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />

        <button type="submit">Belépés</button>
      </form>
    </>
  ) : (
    <>
      <h2>Admin termékfeltöltés</h2>

      <form onSubmit={addProduct} className="adminForm">
        <input
          type="text"
          name="title"
          placeholder="Termék neve"
          value={newProduct.title}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Leírás"
          value={newProduct.description}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Ár"
          value={newProduct.price}
          onChange={handleInputChange}
          required
        />

        <input
  type="text"
  name="Meret"
  placeholder="Méret pl. S, M, L, XL"
  value={newProduct.Meret}
  onChange={handleInputChange}
  required
/>

<input
  type="text"
  name="type"
  placeholder="Típus pl. póló, nadrág, cipő"
  value={newProduct.type}
  onChange={handleInputChange}
  required
/>

        <input
          type="text"
          name="imageUrl"
          placeholder="Kép URL"
          value={newProduct.imageUrl}
          onChange={handleInputChange}
        />

        <label>
          <input
            type="checkbox"
            name="isUsed"
            checked={newProduct.isUsed}
            onChange={handleInputChange}
          />
          Használt termék
        </label>

        <button type="submit">Termék hozzáadása</button>
      </form>
    </>
  )}
</section>

    </div>
  );
}

export default App;