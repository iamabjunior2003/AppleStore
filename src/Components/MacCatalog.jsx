import React, { useEffect, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import "../assets/css/ipod.css";
import { useNavigate } from "react-router-dom";

const macs = [
  // MacBook Pro
  {
    id: 1,
    name: 'MacBook Pro 16" (M3 Max)',
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    specs: "M3 Max chip with 16-core CPU, 40-core GPU, 48GB unified memory",
    storage: "1TB SSD",
    colors: ["Space Black", "Silver"],
    year: 2024,
  },
  {
    id: 2,
    name: 'MacBook Pro 16" (M3 Pro)',
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    specs: "M3 Pro chip with 12-core CPU, 18-core GPU, 18GB unified memory",
    storage: "512GB SSD",
    colors: ["Space Black", "Silver"],
    year: 2024,
  },
  {
    id: 3,
    name: 'MacBook Pro 14" (M3 Max)',
    price: 3099,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    specs: "M3 Max chip with 14-core CPU, 30-core GPU, 36GB unified memory",
    storage: "1TB SSD",
    colors: ["Space Black", "Silver"],
    year: 2024,
  },
  {
    id: 4,
    name: 'MacBook Pro 14" (M3 Pro)',
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    specs: "M3 Pro chip with 11-core CPU, 14-core GPU, 18GB unified memory",
    storage: "512GB SSD",
    colors: ["Space Black", "Silver"],
    year: 2024,
  },
  {
    id: 5,
    name: 'MacBook Pro 14" (M3)',
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    specs: "M3 chip with 8-core CPU, 10-core GPU, 8GB unified memory",
    storage: "512GB SSD",
    colors: ["Space Gray", "Silver"],
    year: 2024,
  },
  // MacBook Air
  {
    id: 6,
    name: 'MacBook Air 15" (M3)',
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop",
    specs: 'M3 chip with 8-core CPU, 10-core GPU, 15.3" Liquid Retina display',
    storage: "256GB SSD",
    colors: ["Midnight", "Starlight", "Space Gray", "Silver"],
    year: 2024,
  },
  {
    id: 7,
    name: 'MacBook Air 13" (M3)',
    price: 1099,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop",
    specs: 'M3 chip with 8-core CPU, 10-core GPU, 13.6" Liquid Retina display',
    storage: "256GB SSD",
    colors: ["Midnight", "Starlight", "Space Gray", "Silver"],
    year: 2024,
  },
  {
    id: 8,
    name: 'MacBook Air 13" (M2)',
    price: 999,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop",
    specs: 'M2 chip with 8-core CPU, 10-core GPU, 13.6" Liquid Retina display',
    storage: "256GB SSD",
    colors: ["Midnight", "Starlight", "Space Gray", "Silver"],
    year: 2023,
  },
  {
    id: 9,
    name: 'MacBook Air 13" (M1)',
    price: 699,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop",
    specs: 'M1 chip with 8-core CPU, 7-core GPU, 13.3" Retina display',
    storage: "256GB SSD",
    colors: ["Space Gray", "Silver", "Gold"],
    year: 2020,
  },
  {
    id: 10,
    name: 'iMac 24" (M3)',
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=400&h=400&fit=crop",
    specs: "M3 chip with 8-core CPU, 10-core GPU, 4.5K Retina display",
    storage: "512GB SSD",
    colors: ["Blue", "Green", "Pink", "Silver", "Yellow", "Orange", "Purple"],
    year: 2024,
  },
  {
    id: 11,
    name: 'iMac 24" (M3)',
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=400&h=400&fit=crop",
    specs: "M3 chip with 8-core CPU, 8-core GPU, 4.5K Retina display",
    storage: "256GB SSD",
    colors: ["Blue", "Green", "Pink", "Silver"],
    year: 2024,
  },
  {
    id: 12,
    name: "Mac mini (M2 Pro)",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=400&h=400&fit=crop",
    specs: "M2 Pro chip with 10-core CPU, 16-core GPU, 16GB unified memory",
    storage: "512GB SSD",
    colors: ["Silver"],
    year: 2023,
  },
  {
    id: 13,
    name: "Mac mini (M2)",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=400&h=400&fit=crop",
    specs: "M2 chip with 8-core CPU, 10-core GPU, 8GB unified memory",
    storage: "256GB SSD",
    colors: ["Silver"],
    year: 2023,
  },
  {
    id: 14,
    name: "Mac Studio (M2 Ultra)",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=400&h=400&fit=crop",
    specs: "M2 Ultra chip with 24-core CPU, 60-core GPU, 64GB unified memory",
    storage: "1TB SSD",
    colors: ["Silver"],
    year: 2023,
  },
  {
    id: 15,
    name: "Mac Studio (M2 Max)",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=400&h=400&fit=crop",
    specs: "M2 Max chip with 12-core CPU, 30-core GPU, 32GB unified memory",
    storage: "512GB SSD",
    colors: ["Silver"],
    year: 2023,
  },
  {
    id: 16,
    name: "Mac Pro (M2 Ultra)",
    price: 6999,
    image:
      "https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=400&h=400&fit=crop",
    specs: "M2 Ultra chip with 24-core CPU, 76-core GPU, 64GB unified memory",
    storage: "1TB SSD",
    colors: ["Silver"],
    year: 2023,
  },
];
export default function MacCatalog() {
  const navigate = useNavigate();

  // ✅ Session-based protection
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
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [selectedYear, setSelectedYear] = useState("all");

  const years = ["all", 2024, 2023, 2020];

  const filteredMacs = macs.filter((mac) => {
    const matchSearch =
      mac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mac.specs.toLowerCase().includes(searchTerm.toLowerCase());

    const matchYear = selectedYear === "all" || mac.year === selectedYear;

    return matchSearch && matchYear;
  });

  const addToCart = (mac) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(mac);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart);
    alert(`${mac.name} added to cart!`);
  };

  const buyNow = (mac) => {
    localStorage.setItem("cart", JSON.stringify([mac]));
    alert(`Proceeding to checkout with ${mac.name}`);
    setTimeout(() => navigate("/payment"), 1000);
  };

  return (
    <div className="apple-container">
      <div className="apple-max-width">
        
        {/* Header */}
        <header className="apple-header">
          <h1 className="apple-title">Mac Collection</h1>
          <p className="apple-subtitle">Supercharged by Apple Silicon</p>
        </header>

        {/* Search & Filter */}
        <div className="apple-search-container">
          <div className="apple-search-wrapper">
            <Search className="apple-search-icon" size={20} />
            <input
              type="text"
              className="apple-search-input"
              placeholder="Search Mac models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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

        {/* Mac Grid */}
        <div className="apple-grid">
          {filteredMacs.map((mac) => (
            <div key={mac.id} className="apple-card">
              <div className="apple-card-image">
                <img src={mac.image} alt={mac.name} />
                <div className="apple-year-badge">{mac.year}</div>
              </div>

              <div className="apple-card-content">
                <h3 className="apple-card-title">{mac.name}</h3>
                <p className="apple-card-specs">{mac.specs}</p>
                <p className="apple-spec-value">{mac.storage}</p>

                <div className="apple-price-wrapper">
                  <span className="apple-price">${mac.price}</span>
                </div>

                <div className="apple-button-container">
                  <button
                    onClick={() => addToCart(mac)}
                    className="apple-btn apple-btn-secondary"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button
                    onClick={() => buyNow(mac)}
                    className="apple-btn apple-btn-primary"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMacs.length === 0 && (
          <div className="apple-no-results">
            <p className="apple-no-results-text">No Macs found matching your search.</p>
          </div>
        )}

      </div>
    </div>
  );
}