// AirPodsCatalog.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Search, ShoppingCart } from "lucide-react";
import "../assets/css/ipod.css";
import { useNavigate } from "react-router-dom";

const airpods = [
  {
    id: 1,
    name: "AirPods Pro 2nd Gen",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1592595896550-cb1b2f52d34f?w=400&h=400&fit=crop",
    specs: "Active Noise Cancellation, Transparency Mode, Spatial Audio",
    storage: "N/A",
    colors: ["White"],
    year: 2022,
  },
  {
    id: 2,
    name: "AirPods 3rd Gen",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1592595896550-7e5b9b6b8e2f?w=400&h=400&fit=crop",
    specs: "Spatial Audio, Adaptive EQ, MagSafe Charging",
    storage: "N/A",
    colors: ["White"],
    year: 2021,
  },
  {
    id: 3,
    name: "AirPods Max",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1592595896550-d5b3c5f9f9b1?w=400&h=400&fit=crop",
    specs: "Over-Ear, Active Noise Cancellation, Spatial Audio",
    storage: "N/A",
    colors: ["Silver", "Space Gray", "Sky Blue", "Green", "Pink"],
    year: 2020,
  },
  {
    id: 4,
    name: "AirPods Pro 1st Gen",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1592595896550-cb1b2f52d34f?w=400&h=400&fit=crop",
    specs: "Active Noise Cancellation, Transparency Mode",
    storage: "N/A",
    colors: ["White"],
    year: 2019,
  },
  {
    id: 5,
    name: "AirPods 2nd Gen",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1592595896550-7e5b9b6b8e2f?w=400&h=400&fit=crop",
    specs: "Wireless Charging, Siri Integration",
    storage: "N/A",
    colors: ["White"],
    year: 2019,
  },
  {
    id: 6,
    name: "AirPods Pro Case",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1592595896550-4a1f2b6c7d5f?w=400&h=400&fit=crop",
    specs: "Protective Silicone Case",
    storage: "N/A",
    colors: ["Black", "White", "Pink", "Blue"],
    year: 2022,
  },
  {
    id: 7,
    name: "AirPods Max Smart Case",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1592595896550-d5b3c5f9f9b1?w=400&h=400&fit=crop",
    specs: "Lightweight magnetic case for AirPods Max",
    storage: "N/A",
    colors: ["Black", "White"],
    year: 2021,
  },
  {
    id: 8,
    name: "AirPods Charging Case",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1592595896550-4a1f2b6c7d5f?w=400&h=400&fit=crop",
    specs: "Wireless MagSafe Charger Compatible",
    storage: "N/A",
    colors: ["White"],
    year: 2021,
  },
  {
    id: 9,
    name: "AirPods Ear Tips (Pro)",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1592595896550-7e5b9b6b8e2f?w=400&h=400&fit=crop",
    specs: "Replacement silicone tips for AirPods Pro",
    storage: "N/A",
    colors: ["White"],
    year: 2020,
  },
  {
    id: 10,
    name: "AirPods 3rd Gen MagSafe Case",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1592595896550-4a1f2b6c7d5f?w=400&h=400&fit=crop",
    specs: "Protective MagSafe Case for AirPods 3rd Gen",
    storage: "N/A",
    colors: ["White", "Blue", "Pink", "Black"],
    year: 2022,
  },
  {
    id: 11,
    name: "AirPods Max Ear Cushions",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1592595896550-d5b3c5f9f9b1?w=400&h=400&fit=crop",
    specs: "Replacement memory foam ear cushions",
    storage: "N/A",
    colors: ["Gray", "Black", "Pink", "Blue"],
    year: 2021,
  },
  {
    id: 12,
    name: "AirPods Pro Silicone Covers",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1592595896550-4a1f2b6c7d5f?w=400&h=400&fit=crop",
    specs: "Protective silicone cover for AirPods Pro case",
    storage: "N/A",
    colors: ["Red", "Black", "White", "Blue"],
    year: 2023,
  },
  {
    id: 13,
    name: "AirPods Pro Wireless Charger",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1592595896550-cb1b2f52d34f?w=400&h=400&fit=crop",
    specs: "Fast wireless charging for AirPods Pro",
    storage: "N/A",
    colors: ["White"],
    year: 2023,
  },
  {
    id: 14,
    name: "AirPods 2nd Gen Lightning Cable",
    price: 19,
    image:
      "https://images.unsplash.com/photo-1592595896550-7e5b9b6b8e2f?w=400&h=400&fit=crop",
    specs: "Original Apple Lightning Cable",
    storage: "N/A",
    colors: ["White"],
    year: 2020,
  },
  {
    id: 15,
    name: "AirPods Pro Ear Tips 3 Pack",
    price: 39,
    image:
      "https://images.unsplash.com/photo-1592595896550-4a1f2b6c7d5f?w=400&h=400&fit=crop",
    specs: "Replacement silicone tips for AirPods Pro",
    storage: "N/A",
    colors: ["White"],
    year: 2022,
  },
];
export default function AirPodsCatalog() {
  const navigate = useNavigate();

  // ✅ Session-based login check
  useEffect(() => {
    const session = sessionStorage.getItem("appleSession");
    if (!session) return navigate("/login");

    const data = JSON.parse(session);
    if (!data.status || Date.now() > data.expiresAt) {
      sessionStorage.removeItem("appleSession");
      navigate("/login");
    }
  }, [navigate]);

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedYear, setSelectedYear] = useState("all");
  const [message, setMessage] = useState("");

  const years = ["all", 2023, 2022, 2021, 2020, 2019];

  const filteredProducts = useMemo(() => {
    return airpods.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.specs.toLowerCase().includes(searchTerm.toLowerCase());
      const matchYear = selectedYear === "all" || product.year === selectedYear;
      return matchSearch && matchYear;
    });
  }, [searchTerm, selectedYear]);

  const showMessage = (txt) => {
    setMessage(txt);
    setTimeout(() => setMessage(""), 2000);
  };

  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    showMessage(`${product.name} added to cart!`);
  };

  const buyNow = (product) => {
    localStorage.setItem("cart", JSON.stringify([product]));
    showMessage(`Proceeding to checkout...`);
    setTimeout(() => navigate("/payment"), 1000);
  };

  return (
    <div className="apple-container">
      <div className="apple-max-width">
        {/* Header */}
        <header className="apple-header">
          <h1 className="apple-title">AirPods Collection</h1>
          <p className="apple-subtitle">Wireless audio and accessories</p>
        </header>

        {/* Search Bar */}
        <div className="apple-search-container">
          <div className="apple-search-wrapper">
            <Search size={20} className="apple-search-icon" />
            <input
              type="text"
              placeholder="Search AirPods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="apple-search-input"
            />
          </div>
        </div>

        {/* Year Filter */}
        <div className="apple-filter-container">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`apple-filter-btn ${
                selectedYear === year
                  ? "apple-filter-btn-active"
                  : "apple-filter-btn-inactive"
              }`}
            >
              {year === "all" ? "All Years" : year}
            </button>
          ))}
        </div>

        {/* Cart Info */}
        <div className="apple-cart-wrapper">
          <div className="apple-cart-counter">
            <ShoppingCart size={20} className="apple-cart-icon" />
            <span className="apple-cart-count">{cart.length} items</span>
          </div>
          <button
            className="apple-go-payment-btn"
            onClick={() => navigate("/payment")}
            disabled={cart.length === 0}
          >
            Go to Payment
          </button>
        </div>

        {/* Result Count */}
        <div className="apple-results-wrapper">
          <p className="apple-results-count">
            Showing {filteredProducts.length} of {airpods.length} products
          </p>
        </div>

        {/* Product Grid */}
        <div className="apple-grid">
          {filteredProducts.map((product) => (
            <div className="apple-card" key={product.id}>
              <div className="apple-card-image">
                <img src={product.image} alt={product.name} />
                <div className="apple-year-badge">{product.year}</div>
              </div>

              <div className="apple-card-content">
                <h3 className="apple-card-title">{product.name}</h3>
                <p className="apple-card-specs">{product.specs}</p>

                <div className="apple-spec-section">
                  <span className="apple-spec-label">Storage</span>
                  <span className="apple-spec-value">{product.storage}</span>
                </div>

                <div className="apple-spec-section">
                  <span className="apple-colors-label">Available Colors</span>
                  <div className="apple-colors-container">
                    {product.colors.slice(0, 3).map((color, i) => (
                      <span key={i} className="apple-color-badge">
                        {color}
                      </span>
                    ))}
                    {product.colors.length > 3 && (
                      <span className="apple-color-badge-more">
                        +{product.colors.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="apple-price-wrapper">
                  <span className="apple-price">${product.price}</span>
                </div>

                <div className="apple-button-container">
                  <button
                    className="apple-btn apple-btn-secondary"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button
                    className="apple-btn apple-btn-primary"
                    onClick={() => buyNow(product)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="apple-no-results">
            <p className="apple-no-results-text">
              No products found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {message && <div className="apple-toast">{message}</div>}
    </div>
  );
}