// EntertainmentCatalog.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Search, ShoppingCart } from "lucide-react";
import "../assets/css/ipod.css";
import { useNavigate } from "react-router-dom";

const entertainment = [
  {
    id: 1,
    name: "Apple TV+ Subscription",
    price: 6.99,
    image:
      "https://images.unsplash.com/photo-1611262583565-b1a3f5cbd7e6?w=400&h=400&fit=crop",
    specs: "Access to Apple Original shows and movies",
    storage: "N/A",
    colors: ["N/A"],
    year: 2023,
  },
  {
    id: 2,
    name: "Apple Music Subscription",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1589830536789-6e9f1e5c3a1a?w=400&h=400&fit=crop",
    specs: "Stream millions of songs ad-free",
    storage: "N/A",
    colors: ["N/A"],
    year: 2023,
  },
  {
    id: 3,
    name: "Apple Arcade Subscription",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1611078486072-9f5f8f5f8f5f?w=400&h=400&fit=crop",
    specs: "Unlimited access to 200+ games",
    storage: "N/A",
    colors: ["N/A"],
    year: 2023,
  },
  {
    id: 4,
    name: "Apple Fitness+ Subscription",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1610437882027-8f5f9c8f5f5f?w=400&h=400&fit=crop",
    specs: "Workout classes guided by expert trainers",
    storage: "N/A",
    colors: ["N/A"],
    year: 2023,
  },
  {
    id: 5,
    name: "Apple One Individual",
    price: 16.95,
    image:
      "https://images.unsplash.com/photo-1610437882027-8f5f9c8f5f5f?w=400&h=400&fit=crop",
    specs: "Apple Music, TV+, Arcade, iCloud 50GB",
    storage: "N/A",
    colors: ["N/A"],
    year: 2023,
  },
  {
    id: 6,
    name: "Apple One Family",
    price: 22.95,
    image:
      "https://images.unsplash.com/photo-1611078486072-9f5f8f5f8f5f?w=400&h=400&fit=crop",
    specs: "Apple Music, TV+, Arcade, iCloud 200GB for family",
    storage: "N/A",
    colors: ["N/A"],
    year: 2023,
  },
  {
    id: 7,
    name: "Apple One Premier",
    price: 32.95,
    image:
      "https://images.unsplash.com/photo-1611262583565-b1a3f5cbd7e6?w=400&h=400&fit=crop",
    specs: "Apple Music, TV+, Arcade, Fitness+, iCloud 2TB",
    storage: "N/A",
    colors: ["N/A"],
    year: 2023,
  },
  {
    id: 8,
    name: "Apple TV 4K 32GB",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1601924572241-3f8c8c8c8c8c?w=400&h=400&fit=crop",
    specs: "4K HDR, A15 Bionic chip, Siri Remote",
    storage: "32GB",
    colors: ["Black"],
    year: 2022,
  },
  {
    id: 9,
    name: "Apple TV 4K 64GB",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1601924572241-3f8c8c8c8c8c?w=400&h=400&fit=crop",
    specs: "4K HDR, A15 Bionic chip, Siri Remote",
    storage: "64GB",
    colors: ["Black"],
    year: 2022,
  },
  {
    id: 10,
    name: "Apple TV 4K HDMI Cable",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1611262583565-b1a3f5cbd7e6?w=400&h=400&fit=crop",
    specs: "High-speed HDMI cable for Apple TV",
    storage: "N/A",
    colors: ["Black"],
    year: 2021,
  },
  {
    id: 11,
    name: "Apple TV Remote Cover",
    price: 19,
    image:
      "https://images.unsplash.com/photo-1611078486072-9f5f8f5f8f5f?w=400&h=400&fit=crop",
    specs: "Silicone protective cover for Apple TV remote",
    storage: "N/A",
    colors: ["Black", "White", "Blue", "Red"],
    year: 2022,
  },
  {
    id: 12,
    name: "Apple HomePod mini",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1610437882027-8f5f9c8f5f5f?w=400&h=400&fit=crop",
    specs: "Smart speaker with Siri, Intercom, 360° sound",
    storage: "N/A",
    colors: ["White", "Space Gray"],
    year: 2023,
  },
  {
    id: 13,
    name: "Apple HomePod mini Bundle",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1610437882027-8f5f9c8f5f5f?w=400&h=400&fit=crop",
    specs: "Two HomePod mini smart speakers",
    storage: "N/A",
    colors: ["White", "Space Gray"],
    year: 2023,
  },
  {
    id: 14,
    name: "Apple Music Gift Card",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1589830536789-6e9f1e5c3a1a?w=400&h=400&fit=crop",
    specs: "Redeemable for Apple Music subscription",
    storage: "N/A",
    colors: ["N/A"],
    year: 2022,
  },
  {
    id: 15,
    name: "Apple TV+ Gift Card",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1611262583565-b1a3f5cbd7e6?w=400&h=400&fit=crop",
    specs: "Redeemable for Apple TV+ subscription",
    storage: "N/A",
    colors: ["N/A"],
    year: 2022,
  },
];
export default function EntertainmentCatalog() {
  const navigate = useNavigate();

  // ✅ Apple session check
  useEffect(() => {
    const session = sessionStorage.getItem("appleSession");
    if (!session) {
      navigate("/login");
      return;
    }

    const data = JSON.parse(session);
    if (!data.status || Date.now() > data.expiresAt) {
      sessionStorage.removeItem("appleSession");
      navigate("/login");
    }
  }, [navigate]);

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedYear, setSelectedYear] = useState("all");
  const [message, setMessage] = useState("");

  const years = ["all", 2023, 2022, 2021, 2020];

  const filteredProducts = useMemo(() => {
    return entertainment.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.specs.toLowerCase().includes(searchTerm.toLowerCase());

      const matchYear = selectedYear === "all" || product.year === selectedYear;
      return matchSearch && matchYear;
    });
  }, [searchTerm, selectedYear]);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setMessage(""), 2500);
  };

  const buyNow = (product) => {
    localStorage.setItem("cart", JSON.stringify([product]));
    setMessage(`Proceeding to checkout with ${product.name}`);
    setTimeout(() => navigate("/payment"), 1000);
  };

  return (
    <div className="apple-container">
      <div className="apple-max-width">
        
        {/* Header */}
        <div className="apple-header">
          <h1 className="apple-title">Entertainment Collection</h1>
          <p className="apple-subtitle">Apple TV, Music, Arcade & more</p>
        </div>

        {/* Search */}
        <div className="apple-search-container">
          <div className="apple-search-wrapper">
            <Search className="apple-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search Entertainment products..."
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

        {/* Cart Bar */}
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

        {/* Results Count */}
        <div className="apple-results-wrapper">
          <p className="apple-results-count">
            Showing {filteredProducts.length} of {entertainment.length} products
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
                  <p className="apple-spec-value">{product.storage}</p>
                </div>

                <div className="apple-spec-section">
                  <span className="apple-colors-label">Available Colors</span>
                  <div className="apple-colors-container">
                    {product.colors.slice(0, 3).map((color, idx) => (
                      <span key={idx} className="apple-color-badge">{color}</span>
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

        {/* No results */}
        {filteredProducts.length === 0 && (
          <div className="apple-no-results">
            <p className="apple-no-results-text">No products found matching search.</p>
          </div>
        )}
      </div>

      {/* Toast */}
      {message && <div className="apple-toast">{message}</div>}
    </div>
  );
}