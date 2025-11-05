import React, { useState, useMemo, useEffect } from "react";
import { Search, ShoppingCart } from "lucide-react";
import "../assets/css/ipod.css";
import { useNavigate } from "react-router-dom";

const iPads = [
  {
    id: 1,
    name: 'iPad Pro 12.9" (M2)',
    price: 1099,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    specs: 'M2 chip, 12.9" Liquid Retina XDR display, ProMotion, Face ID',
    storage: "128GB",
    colors: ["Space Gray", "Silver"],
    year: 2024,
  },
  {
    id: 2,
    name: 'iPad Pro 11" (M2)',
    price: 799,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    specs: 'M2 chip, 11" Liquid Retina display, ProMotion, Face ID',
    storage: "128GB",
    colors: ["Space Gray", "Silver"],
    year: 2024,
  },
  {
    id: 3,
    name: 'iPad Pro 12.9" (M1)',
    price: 999,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    specs: 'M1 chip, 12.9" Liquid Retina XDR display, ProMotion',
    storage: "128GB",
    colors: ["Space Gray", "Silver"],
    year: 2022,
  },
  {
    id: 4,
    name: 'iPad Pro 11" (M1)',
    price: 699,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    specs: 'M1 chip, 11" Liquid Retina display, ProMotion',
    storage: "128GB",
    colors: ["Space Gray", "Silver"],
    year: 2022,
  },
  {
    id: 5,
    name: "iPad Air (M2)",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop",
    specs: 'M2 chip, 10.9" Liquid Retina display, Touch ID',
    storage: "64GB",
    colors: ["Space Gray", "Starlight", "Pink", "Purple", "Blue"],
    year: 2024,
  },
  {
    id: 6,
    name: "iPad Air (M1)",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop",
    specs: 'M1 chip, 10.9" Liquid Retina display, Touch ID',
    storage: "64GB",
    colors: ["Space Gray", "Starlight", "Pink", "Purple", "Blue"],
    year: 2022,
  },
  {
    id: 7,
    name: "iPad (10th gen)",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1585790050230-5dd28404f8db?w=400&h=400&fit=crop",
    specs: 'A14 Bionic chip, 10.9" Liquid Retina display, Touch ID',
    storage: "64GB",
    colors: ["Silver", "Blue", "Pink", "Yellow"],
    year: 2022,
  },
  {
    id: 8,
    name: "iPad (9th gen)",
    price: 329,
    image:
      "https://images.unsplash.com/photo-1585790050230-5dd28404f8db?w=400&h=400&fit=crop",
    specs: 'A13 Bionic chip, 10.2" Retina display, Touch ID',
    storage: "64GB",
    colors: ["Space Gray", "Silver"],
    year: 2021,
  },
  {
    id: 9,
    name: "iPad mini (6th gen)",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=400&h=400&fit=crop",
    specs: 'A15 Bionic chip, 8.3" Liquid Retina display, Touch ID',
    storage: "64GB",
    colors: ["Space Gray", "Pink", "Purple", "Starlight"],
    year: 2021,
  },
  {
    id: 10,
    name: "iPad mini (5th gen)",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=400&h=400&fit=crop",
    specs: 'A12 Bionic chip, 7.9" Retina display, Touch ID',
    storage: "64GB",
    colors: ["Space Gray", "Silver", "Gold"],
    year: 2019,
  },
];

export default function IPadCatalog() {
  const navigate = useNavigate();

  // ✅ Session Login Check (instead of old loggedIn localStorage)
  useEffect(() => {
    const session = sessionStorage.getItem("appleSession");

    if (!session) {
      navigate("/login");
      return;
    }

    const data = JSON.parse(session);

    // Check expired session
    if (!data.status || Date.now() > data.expiresAt) {
      sessionStorage.removeItem("appleSession");
      navigate("/login");
    }
  }, [navigate]);

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [selectedYear, setSelectedYear] = useState("all");
  const [message, setMessage] = useState("");

  const years = ["all", 2024, 2022, 2021, 2019];

  const filtered = useMemo(() => {
    return iPads.filter((ipad) => {
      const matchSearch =
        ipad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ipad.specs.toLowerCase().includes(searchTerm.toLowerCase());

      const matchYear = selectedYear === "all" || ipad.year === selectedYear;
      return matchSearch && matchYear;
    });
  }, [searchTerm, selectedYear]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const addToCart = (ipad) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(ipad);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart);
    showMessage(`${ipad.name} added to cart!`);
  };

  const buyNow = (ipad) => {
    localStorage.setItem("cart", JSON.stringify([ipad]));
    showMessage(`Proceeding to checkout with ${ipad.name}`);
    setTimeout(() => navigate("/payment"), 1000);
  };

  return (
    <div className="apple-container">
      <div className="apple-max-width">
        
        {/* Header */}
        <header className="apple-header">
          <h1 className="apple-title">iPad Collection</h1>
          <p className="apple-subtitle">Your next computer is not a computer</p>
        </header>

        {/* Search */}
        <div className="apple-search-container">
          <div className="apple-search-wrapper">
            <Search className="apple-search-icon" size={20} />
            <input
              type="text"
              className="apple-search-input"
              placeholder="Search for iPad models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filter */}
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

        {/* Cart */}
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

        {/* Results count */}
        <div className="apple-results-wrapper">
          <p className="apple-results-count">
            Showing {filtered.length} of {iPads.length} models
          </p>
        </div>

        {/* Grid Display */}
        <div className="apple-grid">
          {filtered.map((ipad) => (
            <div key={ipad.id} className="apple-card">
              <div className="apple-card-image">
                <img src={ipad.image} alt={ipad.name} />
                <span className="apple-year-badge">{ipad.year}</span>
              </div>

              <div className="apple-card-content">
                <h3 className="apple-card-title">{ipad.name}</h3>
                <p className="apple-card-specs">{ipad.specs}</p>

                <div className="apple-spec-section">
                  <span className="apple-spec-label">Storage</span>
                  <span className="apple-spec-value">{ipad.storage}</span>
                </div>

                <div className="apple-spec-section">
                  <span className="apple-colors-label">Available Colors</span>
                  <div className="apple-colors-container">
                    {ipad.colors.slice(0, 3).map((color) => (
                      <span key={color} className="apple-color-badge">
                        {color}
                      </span>
                    ))}
                    {ipad.colors.length > 3 && (
                      <span
                        className="apple-color-badge-more"
                        title={ipad.colors.join(", ")}
                      >
                        +{ipad.colors.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="apple-price-wrapper">
                  <span className="apple-price">${ipad.price}</span>
                </div>

                <div className="apple-button-container">
                  <button
                    onClick={() => addToCart(ipad)}
                    className="apple-btn apple-btn-secondary"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button
                    onClick={() => buyNow(ipad)}
                    className="apple-btn apple-btn-primary"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="apple-no-results">
            <p className="apple-no-results-text">No iPads found matching your search.</p>
          </div>
        )}
      </div>

      {/* Toast */}
      {message && <div className="apple-toast">{message}</div>}
    </div>
  );
}