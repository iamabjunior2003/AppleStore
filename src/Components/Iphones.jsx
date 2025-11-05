import React, { useEffect, useMemo, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import "../assets/css/Iphones.css";
import { useNavigate } from "react-router-dom";
const iPhones = [
  // iPhone 16 Series (2024)
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1696446702403-72e04bc91b0e?w=400&h=400&fit=crop",
    specs: 'A18 Pro chip, 6.9" display, 48MP Fusion camera',
    storage: "256GB",
    colors: [
      "Natural Titanium",
      "Desert Titanium",
      "White Titanium",
      "Black Titanium",
    ],
    year: 2024,
  },
  {
    id: 2,
    name: "iPhone 16 Pro",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    specs: 'A18 Pro chip, 6.3" display, 48MP Fusion camera',
    storage: "128GB",
    colors: [
      "Natural Titanium",
      "Desert Titanium",
      "White Titanium",
      "Black Titanium",
    ],
    year: 2024,
  },
  {
    id: 3,
    name: "iPhone 16 Plus",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    specs: 'A18 chip, 6.7" display, 48MP Fusion camera',
    storage: "128GB",
    colors: ["Black", "White", "Pink", "Teal", "Ultramarine"],
    year: 2024,
  },
  {
    id: 4,
    name: "iPhone 16",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    specs: 'A18 chip, 6.1" display, 48MP Fusion camera',
    storage: "128GB",
    colors: ["Black", "White", "Pink", "Teal", "Ultramarine"],
    year: 2024,
  },
  // iPhone 15 Series (2023)
  {
    id: 5,
    name: "iPhone 15 Pro Max",
    price: 1099,
    image:
      "https://images.unsplash.com/photo-1696446702403-72e04bc91b0e?w=400&h=400&fit=crop",
    specs: 'A17 Pro chip, 6.7" display, 48MP Main camera',
    storage: "256GB",
    colors: [
      "Natural Titanium",
      "Blue Titanium",
      "White Titanium",
      "Black Titanium",
    ],
    year: 2023,
  },
  {
    id: 6,
    name: "iPhone 15 Pro",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    specs: 'A17 Pro chip, 6.1" display, 48MP Main camera',
    storage: "128GB",
    colors: [
      "Natural Titanium",
      "Blue Titanium",
      "White Titanium",
      "Black Titanium",
    ],
    year: 2023,
  },
  {
    id: 7,
    name: "iPhone 15 Plus",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    specs: 'A16 Bionic chip, 6.7" display, 48MP Main camera',
    storage: "128GB",
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
    year: 2023,
  },
  {
    id: 8,
    name: "iPhone 15",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    specs: 'A16 Bionic chip, 6.1" display, 48MP Main camera',
    storage: "128GB",
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
    year: 2023,
  },
  // iPhone 14 Series (2022)
  {
    id: 9,
    name: "iPhone 14 Pro Max",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1663499482523-1c0d8c2e8d23?w=400&h=400&fit=crop",
    specs: 'A16 Bionic chip, 6.7" display, 48MP Main camera',
    storage: "128GB",
    colors: ["Deep Purple", "Gold", "Silver", "Space Black"],
    year: 2022,
  },
  {
    id: 10,
    name: "iPhone 14 Pro",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1663499482523-1c0d8c2e8d23?w=400&h=400&fit=crop",
    specs: 'A16 Bionic chip, 6.1" display, 48MP Main camera',
    storage: "128GB",
    colors: ["Deep Purple", "Gold", "Silver", "Space Black"],
    year: 2022,
  },
  {
    id: 11,
    name: "iPhone 14 Plus",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1663499482523-1c0d8c2e8d23?w=400&h=400&fit=crop",
    specs: 'A15 Bionic chip, 6.7" display, 12MP Dual camera',
    storage: "128GB",
    colors: ["Midnight", "Purple", "Starlight", "Blue", "Red"],
    year: 2022,
  },
  {
    id: 12,
    name: "iPhone 14",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1663499482523-1c0d8c2e8d23?w=400&h=400&fit=crop",
    specs: 'A15 Bionic chip, 6.1" display, 12MP Dual camera',
    storage: "128GB",
    colors: ["Midnight", "Purple", "Starlight", "Blue", "Red"],
    year: 2022,
  },
  // iPhone 13 Series (2021)
  {
    id: 13,
    name: "iPhone 13 Pro Max",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1632633173522-c80309c52722?w=400&h=400&fit=crop",
    specs: 'A15 Bionic chip, 6.7" display, 12MP Triple camera',
    storage: "128GB",
    colors: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
    year: 2021,
  },
  {
    id: 14,
    name: "iPhone 13 Pro",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1632633173522-c80309c52722?w=400&h=400&fit=crop",
    specs: 'A15 Bionic chip, 6.1" display, 12MP Triple camera',
    storage: "128GB",
    colors: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
    year: 2021,
  },
  {
    id: 15,
    name: "iPhone 13",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1632633173522-c80309c52722?w=400&h=400&fit=crop",
    specs: 'A15 Bionic chip, 6.1" display, 12MP Dual camera',
    storage: "128GB",
    colors: ["Pink", "Blue", "Midnight", "Starlight", "Red", "Green"],
    year: 2021,
  },
  {
    id: 16,
    name: "iPhone 13 mini",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1632633173522-c80309c52722?w=400&h=400&fit=crop",
    specs: 'A15 Bionic chip, 5.4" display, 12MP Dual camera',
    storage: "128GB",
    colors: ["Pink", "Blue", "Midnight", "Starlight", "Red", "Green"],
    year: 2021,
  },
  // iPhone 12 Series (2020)
  {
    id: 17,
    name: "iPhone 12 Pro Max",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop",
    specs: 'A14 Bionic chip, 6.7" display, 12MP Triple camera',
    storage: "128GB",
    colors: ["Graphite", "Silver", "Gold", "Pacific Blue"],
    year: 2020,
  },
  {
    id: 18,
    name: "iPhone 12 Pro",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop",
    specs: 'A14 Bionic chip, 6.1" display, 12MP Triple camera',
    storage: "128GB",
    colors: ["Graphite", "Silver", "Gold", "Pacific Blue"],
    year: 2020,
  },
  {
    id: 19,
    name: "iPhone 12",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop",
    specs: 'A14 Bionic chip, 6.1" display, 12MP Dual camera',
    storage: "64GB",
    colors: ["Black", "White", "Red", "Green", "Blue", "Purple"],
    year: 2020,
  },
  {
    id: 20,
    name: "iPhone 12 mini",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop",
    specs: 'A14 Bionic chip, 5.4" display, 12MP Dual camera',
    storage: "64GB",
    colors: ["Black", "White", "Red", "Green", "Blue", "Purple"],
    year: 2020,
  },
  // iPhone SE Series
  {
    id: 21,
    name: "iPhone SE (3rd gen)",
    price: 429,
    image:
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=400&fit=crop",
    specs: 'A15 Bionic chip, 4.7" Retina display, 12MP camera',
    storage: "64GB",
    colors: ["Midnight", "Starlight", "Red"],
    year: 2022,
  },
  {
    id: 22,
    name: "iPhone SE (2nd gen)",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=400&fit=crop",
    specs: 'A13 Bionic chip, 4.7" Retina display, 12MP camera',
    storage: "64GB",
    colors: ["Black", "White", "Red"],
    year: 2020,
  },
  // iPhone 11 Series (2019)
  {
    id: 23,
    name: "iPhone 11 Pro Max",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1574755393849-623942496936?w=400&h=400&fit=crop",
    specs: 'A13 Bionic chip, 6.5" display, 12MP Triple camera',
    storage: "64GB",
    colors: ["Gold", "Space Gray", "Silver", "Midnight Green"],
    year: 2019,
  },
  {
    id: 24,
    name: "iPhone 11 Pro",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1574755393849-623942496936?w=400&h=400&fit=crop",
    specs: 'A13 Bionic chip, 5.8" display, 12MP Triple camera',
    storage: "64GB",
    colors: ["Gold", "Space Gray", "Silver", "Midnight Green"],
    year: 2019,
  },
  {
    id: 25,
    name: "iPhone 11",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1574755393849-623942496936?w=400&h=400&fit=crop",
    specs: 'A13 Bionic chip, 6.1" Liquid Retina display, 12MP Dual camera',
    storage: "64GB",
    colors: ["Black", "White", "Yellow", "Green", "Purple", "Red"],
    year: 2019,
  },
  // iPhone XS Series (2018)
  {
    id: 26,
    name: "iPhone XS Max",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    specs: 'A12 Bionic chip, 6.5" OLED display, 12MP Dual camera',
    storage: "64GB",
    colors: ["Gold", "Space Gray", "Silver"],
    year: 2018,
  },
  {
    id: 27,
    name: "iPhone XS",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    specs: 'A12 Bionic chip, 5.8" OLED display, 12MP Dual camera',
    storage: "64GB",
    colors: ["Gold", "Space Gray", "Silver"],
    year: 2018,
  },
  {
    id: 28,
    name: "iPhone XR",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    specs: 'A12 Bionic chip, 6.1" Liquid Retina display, 12MP camera',
    storage: "64GB",
    colors: ["Black", "White", "Blue", "Yellow", "Coral", "Red"],
    year: 2018,
  },
  // iPhone X (2017)
  {
    id: 29,
    name: "iPhone X",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop",
    specs: 'A11 Bionic chip, 5.8" OLED display, 12MP Dual camera',
    storage: "64GB",
    colors: ["Space Gray", "Silver"],
    year: 2017,
  },
  // iPhone 8 Series (2017)
  {
    id: 30,
    name: "iPhone 8 Plus",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=400&h=400&fit=crop",
    specs: 'A11 Bionic chip, 5.5" Retina display, 12MP Dual camera',
    storage: "64GB",
    colors: ["Space Gray", "Silver", "Gold"],
    year: 2017,
  },
  {
    id: 31,
    name: "iPhone 8",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=400&h=400&fit=crop",
    specs: 'A11 Bionic chip, 4.7" Retina display, 12MP camera',
    storage: "64GB",
    colors: ["Space Gray", "Silver", "Gold"],
    year: 2017,
  },
  // iPhone 7 Series (2016)
  {
    id: 32,
    name: "iPhone 7 Plus",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop",
    specs: 'A10 Fusion chip, 5.5" Retina display, 12MP Dual camera',
    storage: "32GB",
    colors: ["Black", "Jet Black", "Silver", "Gold", "Rose Gold", "Red"],
    year: 2016,
  },
  {
    id: 33,
    name: "iPhone 7",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop",
    specs: 'A10 Fusion chip, 4.7" Retina display, 12MP camera',
    storage: "32GB",
    colors: ["Black", "Jet Black", "Silver", "Gold", "Rose Gold", "Red"],
    year: 2016,
  },
];
export default function Iphones() {
  const navigate = useNavigate();

  // ✅ Redirect to login if Apple session expired or missing
  useEffect(() => {
    const session = sessionStorage.getItem("appleSession");

    if (!session) {
      navigate("/login");
      return;
    }

    const data = JSON.parse(session);
    const currentTime = new Date().getTime();

    if (!data.status || currentTime > data.expiresAt) {
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

  const years = ["all", 2024, 2023, 2022, 2021, 2020, 2019];

  const filteredPhones = useMemo(() => {
    return iPhones.filter((phone) => {
      const matchesSearch =
        phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.specs.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = selectedYear === "all" || phone.year === selectedYear;
      return matchesSearch && matchesYear;
    });
  }, [searchTerm, selectedYear]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const addToCart = (phone) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(phone);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart);
    showMessage(`${phone.name} added to cart!`);
  };

  const buyNow = (phone) => {
    localStorage.setItem("cart", JSON.stringify([phone]));
    showMessage(`Proceeding to checkout with ${phone.name}`);
    setTimeout(() => navigate("/payment"), 1000);
  };

  return (
    <div className="catalog-container">
      <div className="catalog-wrapper">
        
        {/* Header */}
        <div className="catalog-header">
          <h1>Complete iPhone Collection</h1>
          <p>Every iPhone model from 2019 to 2024</p>
        </div>

        {/* Search & Filter */}
        <div className="search-filter-section">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search for iPhone models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="year-filter">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`year-button ${
                  selectedYear === year ? "active" : ""
                }`}
              >
                {year === "all" ? "All Years" : year}
              </button>
            ))}
          </div>
        </div>

        {/* Cart + Go to Payment */}
        <div className="cart-wrapper">
          <div className="cart-counter">
            <ShoppingCart className="cart-icon" size={20} />
            <span>{cart.length} items</span>
          </div>
          <button
            className="go-to-payment-btn"
            onClick={() => navigate("/payment")}
            disabled={cart.length === 0}
          >
            Go to Payment
          </button>
        </div>

        {/* Results */}
        <div className="results-count">
          Showing {filteredPhones.length} of {iPhones.length} models
        </div>

        {/* iPhone Grid */}
        <div className="iphone-grid">
          {filteredPhones.map((phone) => (
            <div key={phone.id} className="iphone-card">
              <div className="iphone-image">
                <img src={phone.image} alt={phone.name} />
                <div className="iphone-year">{phone.year}</div>
              </div>

              <div className="iphone-content">
                <h3>{phone.name}</h3>
                <p className="specs">{phone.specs}</p>

                <div className="storage">
                  <span className="label">Storage</span>
                  <p>{phone.storage}</p>
                </div>

                <div className="colors">
                  <span className="label">Available Colors</span>
                  <div className="color-list">
                    {phone.colors.slice(0, 3).map((color, idx) => (
                      <span key={idx} className="color-tag">
                        {color}
                      </span>
                    ))}
                    {phone.colors.length > 3 && (
                      <span className="color-tag">
                        +{phone.colors.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="price">${phone.price}</div>

                <div className="buttons">
                  <button
                    onClick={() => addToCart(phone)}
                    className="add-to-cart"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  <button onClick={() => buyNow(phone)} className="buy-now">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPhones.length === 0 && (
          <div className="no-results">
            No iPhones found matching your search.
          </div>
        )}
      </div>

      {/* Toast Message */}
      {message && <div className="toast">{message}</div>}
    </div>
  );
}