// TvHomeCatalog.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import "../assets/css/ipod.css";
import { useNavigate } from "react-router-dom";

const tvHomeProducts = [
  {
    id: 1,
    name: "Apple TV 4K (2024)",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1605713698151-7f3f1b2c1a41?w=400&h=400&fit=crop",
    specs: "4K HDR, A15 Bionic, Siri Remote",
    storage: "32GB",
    colors: ["Black"],
    year: 2024,
  },
  {
    id: 2,
    name: "HomePod 2nd Gen",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1597598243173-9d1765c6c21b?w=400&h=400&fit=crop",
    specs: "360° sound, Siri integration, Spatial Awareness",
    storage: "N/A",
    colors: ["White", "Space Gray"],
    year: 2023,
  },
  {
    id: 3,
    name: "Apple TV 4K (2022)",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1605713698151-7f3f1b2c1a41?w=400&h=400&fit=crop",
    specs: "4K HDR, A12 Bionic, Siri Remote",
    storage: "32GB",
    colors: ["Black"],
    year: 2022,
  },
  {
    id: 4,
    name: "HomePod Mini",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1605713698151-5e2c2d5e6aeb?w=400&h=400&fit=crop",
    specs: "Compact smart speaker, Siri integration",
    storage: "N/A",
    colors: ["White", "Space Gray", "Blue", "Yellow", "Orange"],
    year: 2023,
  },
  {
    id: 5,
    name: "Apple TV HD",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1605713698151-7f3f1b2c1a41?w=400&h=400&fit=crop",
    specs: "1080p HD, Siri Remote",
    storage: "32GB",
    colors: ["Black"],
    year: 2021,
  },
  {
    id: 6,
    name: "Apple AirPlay 2 Receiver",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1605713698151-93c1f4d0c345?w=400&h=400&fit=crop",
    specs: "Stream audio and video to compatible devices",
    storage: "N/A",
    colors: ["Black", "White"],
    year: 2023,
  },
  {
    id: 7,
    name: "Apple TV Remote (Siri Remote)",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1605713698151-7f3f1b2c1a41?w=400&h=400&fit=crop",
    specs: "Rechargeable battery, Touch-enabled clickpad",
    storage: "N/A",
    colors: ["Silver"],
    year: 2024,
  },
  {
    id: 8,
    name: "Apple HomeKit Hub",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1605713698151-2d4c5f5a6b81?w=400&h=400&fit=crop",
    specs: "Control smart home devices remotely",
    storage: "N/A",
    colors: ["White"],
    year: 2023,
  },
  {
    id: 9,
    name: "Apple TV 4K (2021)",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1605713698151-7f3f1b2c1a41?w=400&h=400&fit=crop",
    specs: "4K HDR, A12 Bionic, Siri Remote",
    storage: "32GB",
    colors: ["Black"],
    year: 2021,
  },
  {
    id: 10,
    name: "HomePod Smart Speaker",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1597598243173-9d1765c6c21b?w=400&h=400&fit=crop",
    specs: "360° audio, Voice assistant Siri, Multiroom support",
    storage: "N/A",
    colors: ["White", "Space Gray"],
    year: 2022,
  },
  {
    id: 11,
    name: "Apple TV App Streaming",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1605713698151-93c1f4d0c345?w=400&h=400&fit=crop",
    specs: "Apple TV+ subscription service",
    storage: "N/A",
    colors: ["N/A"],
    year: 2023,
  },
  {
    id: 12,
    name: "Apple AirPlay 2 Receiver 2nd Gen",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1605713698151-93c1f4d0c345?w=400&h=400&fit=crop",
    specs: "Improved streaming to multiple devices",
    storage: "N/A",
    colors: ["Black", "White"],
    year: 2024,
  },
  {
    id: 13,
    name: "HomePod Mini Special Edition",
    price: 109,
    image:
      "https://images.unsplash.com/photo-1605713698151-5e2c2d5e6aeb?w=400&h=400&fit=crop",
    specs: "Limited edition colors, Compact speaker",
    storage: "N/A",
    colors: ["Blue", "Yellow", "Orange", "Gray"],
    year: 2024,
  },
  {
    id: 14,
    name: "Apple TV 4K 2nd Gen",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1605713698151-7f3f1b2c1a41?w=400&h=400&fit=crop",
    specs: "A15 Bionic, HDR 4K, Siri Remote",
    storage: "64GB",
    colors: ["Black"],
    year: 2023,
  },
  {
    id: 15,
    name: "Apple TV HDMI Cable",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1605713698151-93c1f4d0c345?w=400&h=400&fit=crop",
    specs: "High-speed HDMI for 4K Apple TV",
    storage: "N/A",
    colors: ["Black"],
    year: 2022,
  },
];
export default function TvHomeCatalog() {
  const navigate = useNavigate();

  // ✅ Secure login check using appleSession
  useEffect(() => {
    const session = sessionStorage.getItem("appleSession");

    if (!session) {
      navigate("/login");
      return;
    }

    const data = JSON.parse(session);
    const now = Date.now();

    if (!data.status || now > data.expiresAt) {
      sessionStorage.removeItem("appleSession");
      navigate("/login");
    }
  }, [navigate]);

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );
  const [selectedYear, setSelectedYear] = useState("all");
  const [message, setMessage] = useState("");

  const years = ["all", 2024, 2023, 2022, 2021];

  const filteredProducts = useMemo(() => {
    return tvHomeProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.specs.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesYear =
        selectedYear === "all" || product.year === selectedYear;

      return matchesSearch && matchesYear;
    });
  }, [searchTerm, selectedYear]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart);
    showMessage(`${product.name} added to cart!`);
  };

  const buyNow = (product) => {
    localStorage.setItem("cart", JSON.stringify([product]));
    showMessage(`Proceeding to checkout with ${product.name}`);
    setTimeout(() => navigate("/payment"), 1000);
  };

  return (
    <div className="apple-container">
      <div className="apple-max-width">

        {/* Header */}
        <header className="apple-header">
          <h1 className="apple-title">TV & Home Collection</h1>
          <p className="apple-subtitle">
            Entertainment and smart home essentials
          </p>
        </header>

        {/* Search */}
        <div className="apple-search-container">
          <div className="apple-search-wrapper">
            <Search className="apple-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search TV & Home products..."
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

        {/* Cart + Payment */}
        <div className="apple-cart-wrapper">
          <div className="apple-cart-counter">
            <ShoppingCart className="apple-cart-icon" size={20} />
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

        {/* Results */}
        <div className="apple-results-wrapper">
          <p className="apple-results-count">
            Showing {filteredProducts.length} of {tvHomeProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="apple-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="apple-card">
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
                    {product.colors.slice(0, 3).map((color, idx) => (
                      <span key={idx} className="apple-color-badge">
                        {color}
                      </span>
                    ))}
                    {product.colors.length > 3 && (
                      <span
                        className="apple-color-badge-more"
                        title={product.colors.join(", ")}
                      >
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
                    onClick={() => addToCart(product)}
                    className="apple-btn apple-btn-secondary"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button
                    onClick={() => buyNow(product)}
                    className="apple-btn apple-btn-primary"
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

      {/* Toast */}
      {message && <div className="apple-toast">{message}</div>}
    </div>
  );
}