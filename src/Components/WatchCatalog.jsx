import React, { useState, useEffect, useMemo } from "react";
import { Search, ShoppingCart } from "lucide-react";
import "../assets/css/ipod.css";
import { useNavigate } from "react-router-dom";
const watches = [
  // Apple Watch Ultra
  {
    id: 1,
    name: "Apple Watch Ultra 2",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop",
    specs:
      "S9 SiP, 49mm titanium case, Always-On Retina display, Action button",
    storage: "64GB",
    colors: ["Natural Titanium"],
    year: 2024,
  },
  {
    id: 2,
    name: "Apple Watch Ultra",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop",
    specs: "S8 SiP, 49mm titanium case, Always-On Retina display",
    storage: "32GB",
    colors: ["Titanium"],
    year: 2022,
  },
  // Apple Watch Series 9
  {
    id: 3,
    name: "Apple Watch Series 9 (45mm)",
    price: 429,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    specs:
      "S9 SiP, Always-On Retina display, Double Tap gesture, ECG, Blood Oxygen",
    storage: "64GB",
    colors: ["Midnight", "Starlight", "Silver", "Pink", "Red"],
    year: 2024,
  },
  {
    id: 4,
    name: "Apple Watch Series 9 (41mm)",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    specs:
      "S9 SiP, Always-On Retina display, Double Tap gesture, ECG, Blood Oxygen",
    storage: "64GB",
    colors: ["Midnight", "Starlight", "Silver", "Pink", "Red"],
    year: 2024,
  },
  // Apple Watch Series 8
  {
    id: 5,
    name: "Apple Watch Series 8 (45mm)",
    price: 379,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    specs:
      "S8 SiP, Always-On Retina display, Temperature sensing, ECG, Blood Oxygen",
    storage: "32GB",
    colors: ["Midnight", "Starlight", "Silver", "Red"],
    year: 2022,
  },
  {
    id: 6,
    name: "Apple Watch Series 8 (41mm)",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    specs:
      "S8 SiP, Always-On Retina display, Temperature sensing, ECG, Blood Oxygen",
    storage: "32GB",
    colors: ["Midnight", "Starlight", "Silver", "Red"],
    year: 2022,
  },
  // Apple Watch SE
  {
    id: 7,
    name: "Apple Watch SE (44mm) 2nd gen",
    price: 279,
    image:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop",
    specs: "S8 SiP, Retina display, Crash Detection, Fall Detection",
    storage: "32GB",
    colors: ["Midnight", "Starlight", "Silver"],
    year: 2023,
  },
  {
    id: 8,
    name: "Apple Watch SE (40mm) 2nd gen",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop",
    specs: "S8 SiP, Retina display, Crash Detection, Fall Detection",
    storage: "32GB",
    colors: ["Midnight", "Starlight", "Silver"],
    year: 2023,
  },
  {
    id: 9,
    name: "Apple Watch SE (44mm) 1st gen",
    price: 229,
    image:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop",
    specs: "S5 SiP, Retina display, Fall Detection",
    storage: "32GB",
    colors: ["Space Gray", "Silver", "Gold"],
    year: 2020,
  },
  {
    id: 10,
    name: "Apple Watch SE (40mm) 1st gen",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop",
    specs: "S5 SiP, Retina display, Fall Detection",
    storage: "32GB",
    colors: ["Space Gray", "Silver", "Gold"],
    year: 2020,
  },
  // Apple Watch Series 7
  {
    id: 11,
    name: "Apple Watch Series 7 (45mm)",
    price: 329,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    specs: "S7 SiP, Always-On Retina display, ECG, Blood Oxygen",
    storage: "32GB",
    colors: ["Midnight", "Starlight", "Green", "Blue", "Red"],
    year: 2021,
  },
  {
    id: 12,
    name: "Apple Watch Series 7 (41mm)",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    specs: "S7 SiP, Always-On Retina display, ECG, Blood Oxygen",
    storage: "32GB",
    colors: ["Midnight", "Starlight", "Green", "Blue", "Red"],
    year: 2021,
  },
];
export default function WatchCatalog() {
  const navigate = useNavigate();

  // ✅ Check Apple session instead of old loggedIn
  useEffect(() => {
    const session = sessionStorage.getItem("appleSession");

    if (!session) {
      navigate("/login");
      return;
    }

    const data = JSON.parse(session);
    const current = Date.now();

    if (!data.status || current > data.expiresAt) {
      sessionStorage.removeItem("appleSession");
      navigate("/login");
    }
  }, [navigate]);

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [selectedYear, setSelectedYear] = useState("all");
  const [message, setMessage] = useState("");

  const years = ["all", 2024, 2023, 2022, 2021, 2020];

  const filtered = useMemo(() => {
    return watches.filter((watch) => {
      const matchesSearch =
        watch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        watch.specs.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = selectedYear === "all" || watch.year === selectedYear;
      return matchesSearch && matchesYear;
    });
  }, [searchTerm, selectedYear]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const addToCart = (watch) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(watch);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart);
    showMessage(`${watch.name} added to cart!`);
  };

  const buyNow = (watch) => {
    localStorage.setItem("cart", JSON.stringify([watch]));
    showMessage(`Proceeding to checkout with ${watch.name}`);
    setTimeout(() => navigate("/payment"), 1000);
  };

  return (
    <div className="apple-container">
      <div className="apple-max-width">
        
        {/* Header */}
        <header className="apple-header">
          <h1 className="apple-title">Apple Watch Collection</h1>
          <p className="apple-subtitle">A healthy leap ahead</p>
        </header>

        {/* Search */}
        <div className="apple-search-container">
          <div className="apple-search-wrapper">
            <Search className="apple-search-icon" size={20} />
            <input
              type="text"
              className="apple-search-input"
              placeholder="Search for Apple Watch models..."
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

        {/* Results */}
        <div className="apple-results-wrapper">
          <p className="apple-results-count">
            Showing {filtered.length} of {watches.length} models
          </p>
        </div>

        {/* Grid */}
        <div className="apple-grid">
          {filtered.map((watch) => (
            <div key={watch.id} className="apple-card">
              <div className="apple-card-image">
                <img src={watch.image} alt={watch.name} />
                <span className="apple-year-badge">{watch.year}</span>
              </div>

              <div className="apple-card-content">
                <h3 className="apple-card-title">{watch.name}</h3>
                <p className="apple-card-specs">{watch.specs}</p>

                <div className="apple-spec-section">
                  <span className="apple-spec-label">Storage</span>
                  <span className="apple-spec-value">{watch.storage}</span>
                </div>

                <div className="apple-spec-section">
                  <span className="apple-colors-label">Available Colors</span>
                  <div className="apple-colors-container">
                    {watch.colors.slice(0, 3).map((color) => (
                      <span key={color} className="apple-color-badge">
                        {color}
                      </span>
                    ))}
                    {watch.colors.length > 3 && (
                      <span
                        className="apple-color-badge-more"
                        title={watch.colors.join(", ")}
                      >
                        +{watch.colors.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="apple-price-wrapper">
                  <span className="apple-price">${watch.price}</span>
                </div>

                <div className="apple-button-container">
                  <button
                    onClick={() => addToCart(watch)}
                    className="apple-btn apple-btn-secondary"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button
                    onClick={() => buyNow(watch)}
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
        {filtered.length === 0 && (
          <div className="apple-no-results">
            <p className="apple-no-results-text">
              No Apple Watches found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Toast */}
      {message && <div className="apple-toast">{message}</div>}
    </div>
  );
}