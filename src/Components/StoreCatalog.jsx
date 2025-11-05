import React, { useEffect, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import "../assets/css/ipod.css";
import { useNavigate } from "react-router-dom";

const storeItems = [
  // iPhones
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    price: 1199,
    year: 2024,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone16promax-blue-titanium-select?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1723664334901",
    specs: "A18 Pro chip, 6.9-inch display, 48MP camera, Titanium finish",
    storage: "256GB / 512GB / 1TB",
    colors: ["Blue Titanium", "Natural", "Black Titanium"],
  },
  {
    id: 2,
    name: "iPhone 16",
    price: 899,
    year: 2024,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone16-pink-select?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1723664334901",
    specs: "A18 chip, 6.1-inch display, Dual camera system",
    storage: "128GB / 256GB / 512GB",
    colors: ["Pink", "Blue", "Midnight", "Starlight"],
  },

  // Macs
  {
    id: 3,
    name: "MacBook Pro 14” (M3 Pro)",
    price: 1999,
    year: 2024,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1697293976957",
    specs: "M3 Pro chip, Liquid Retina XDR display, up to 18-hour battery",
    storage: "512GB / 1TB / 2TB SSD",
    colors: ["Space Black", "Silver"],
  },
  {
    id: 4,
    name: "MacBook Air 13” (M3)",
    price: 1199,
    year: 2024,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-m3-midnight?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1706139615316",
    specs: "M3 chip, 13.6-inch display, ultra-thin design",
    storage: "256GB / 512GB SSD",
    colors: ["Midnight", "Silver", "Starlight"],
  },

  // iPads
  {
    id: 5,
    name: "iPad Pro 13” (M4)",
    price: 1299,
    year: 2024,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-m4-13-select-wifi-spaceblack-202405?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1713899330603",
    specs: "M4 chip, Ultra Retina XDR display, Apple Pencil Pro support",
    storage: "256GB / 512GB / 1TB",
    colors: ["Space Black", "Silver"],
  },
  {
    id: 6,
    name: "iPad Air (M2)",
    price: 599,
    year: 2024,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-air-m2-select-wifi-blue-202405?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1713828910437",
    specs: "M2 chip, Liquid Retina display, Touch ID, 5G support",
    storage: "128GB / 256GB / 512GB",
    colors: ["Blue", "Purple", "Starlight"],
  },

  // Apple Watch
  {
    id: 7,
    name: "Apple Watch Ultra 2",
    price: 799,
    year: 2024,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-ultra2-titanium-orange-alpine-loop?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693610806841",
    specs: "49mm Titanium case, S9 SiP, 36-hour battery life",
    storage: "64GB",
    colors: ["Orange Loop", "Blue Loop", "Green Trail"],
  },
  {
    id: 8,
    name: "Apple Watch Series 9",
    price: 399,
    year: 2024,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-s9-stainless-gold-milanese-loop?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693006286106",
    specs: "S9 SiP, Double Tap gesture, Retina display",
    storage: "64GB",
    colors: ["Gold", "Midnight", "Pink"],
  },

  // AirPods
  {
    id: 9,
    name: "AirPods Pro (2nd Gen)",
    price: 249,
    year: 2023,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2nd-gen-usbc-select-202309?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1692908863449",
    specs: "Active Noise Cancellation, Adaptive Audio, USB-C",
    storage: "Case 256GB-equivalent",
    colors: ["White"],
  },
  {
    id: 10,
    name: "AirPods (3rd Gen)",
    price: 179,
    year: 2023,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MME73_AV1?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1632861342000",
    specs: "Spatial Audio, Adaptive EQ, MagSafe Charging Case",
    storage: "Case 256GB-equivalent",
    colors: ["White"],
  },

  // Home & TV
  {
    id: 11,
    name: "Apple TV 4K (3rd Gen)",
    price: 149,
    year: 2023,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/apple-tv-4k-select-202210?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1664896361379",
    specs: "A15 Bionic chip, HDR10+, Dolby Vision, Siri Remote",
    storage: "64GB / 128GB",
    colors: ["Black"],
  },
  {
    id: 12,
    name: "HomePod (2nd Gen)",
    price: 299,
    year: 2023,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-select-midnight-202301?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1672774494527",
    specs: "Room sensing, Spatial Audio, Siri voice control",
    storage: "Wi-Fi Connected",
    colors: ["Midnight", "White"],
  },
  {
    id: 13,
    name: "HomePod Mini",
    price: 99,
    year: 2023,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-yellow-202110?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1632930637000",
    specs: "Compact smart speaker, Siri, Intercom",
    storage: "Wi-Fi Connected",
    colors: ["Blue", "Yellow", "White", "Space Gray"],
  },

  // Accessories
  {
    id: 14,
    name: "MagSafe Charger",
    price: 39,
    year: 2023,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/magsafe-charger-select-202010?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1601495671000",
    specs: "Fast wireless charging for iPhone and AirPods",
    storage: "N/A",
    colors: ["Silver"],
  },
  {
    id: 15,
    name: "AppleCare+ for iPhone",
    price: 199,
    year: 2024,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/applecare-iphone?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1566425123384",
    specs: "2 years of service & accidental damage protection",
    storage: "N/A",
    colors: ["Red", "Blue"],
  },
  {
    id: 16,
    name: "Magic Keyboard for iPad Pro",
    price: 349,
    year: 2024,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MXQU2?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1587460552755",
    specs: "Backlit keys, trackpad, floating design",
    storage: "N/A",
    colors: ["Black", "White"],
  },
  {
    id: 17,
    name: "Apple Pencil (USB-C)",
    price: 79,
    year: 2023,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/apple-pencil-usbc?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1696983244702",
    specs: "Pixel-perfect precision, magnetic attachment",
    storage: "N/A",
    colors: ["White"],
  },
  {
    id: 18,
    name: "MagSafe Battery Pack",
    price: 99,
    year: 2022,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/magsafe-battery-pack-select-202107?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1625174918000",
    specs: "Snap-on wireless charging for iPhone",
    storage: "2920mAh",
    colors: ["White"],
  },
  {
    id: 19,
    name: "Magic Mouse",
    price: 79,
    year: 2023,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MMMQ3?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1645138486301",
    specs: "Rechargeable, Multi-Touch surface, Bluetooth",
    storage: "N/A",
    colors: ["White", "Black"],
  },
  {
    id: 20,
    name: "Magic Trackpad",
    price: 149,
    year: 2023,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MMMP3?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1645138486301",
    specs: "Force Touch technology, glass surface, wireless",
    storage: "N/A",
    colors: ["White", "Black"],
  },
];
export default function StoreCatalog() {
  const navigate = useNavigate();

  // ✅ Session-based login protection
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

  const years = ["all", 2024, 2023, 2022];

  const filteredItems = storeItems.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specs.toLowerCase().includes(searchTerm.toLowerCase());

    const matchYear = selectedYear === "all" || item.year === selectedYear;

    return matchSearch && matchYear;
  });

  const addToCart = (item) => {
    const exists = cart.some((cartItem) => cartItem.id === item.id);
    if (exists) {
      alert(`${item.name} is already in the cart!`);
      return;
    }

    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${item.name} added to cart!`);
  };

  const buyNow = (item) => {
    localStorage.setItem("cart", JSON.stringify([item]));
    alert(`Proceeding to checkout with ${item.name}`);
    setTimeout(() => navigate("/payment"), 1000);
  };

  return (
    <div className="apple-container">
      <div className="apple-max-width">

        {/* Header */}
        <div className="apple-header">
          <h1 className="apple-title">Apple Store</h1>
          <p className="apple-subtitle">
            Explore the latest iPhones, Macs, iPads, and more.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="apple-search-container">
          <div className="apple-search-wrapper">
            <Search className="apple-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search Apple products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="apple-search-input"
            />
          </div>

          <div className="apple-filter-container">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`apple-filter-btn ${
                  selectedYear === year ? "apple-filter-btn-active" : "apple-filter-btn-inactive"
                }`}
              >
                {year === "all" ? "All Years" : year}
              </button>
            ))}
          </div>
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
            Showing {filteredItems.length} of {storeItems.length} products
          </p>
        </div>

        {/* Product Grid */}
        <div className="apple-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="apple-card">
              <div className="apple-card-image">
                <img src={item.image} alt={item.name} />
                <div className="apple-year-badge">{item.year}</div>
              </div>

              <div className="apple-card-content">
                <h3 className="apple-card-title">{item.name}</h3>
                <p className="apple-card-specs">{item.specs}</p>

                <div className="apple-spec-section">
                  <span className="apple-spec-label">Storage</span>
                  <span className="apple-spec-value">{item.storage}</span>
                </div>

                <div className="apple-price-wrapper">
                  <span className="apple-price">${item.price}</span>
                </div>

                <div className="apple-button-container">
                  <button
                    onClick={() => addToCart(item)}
                    className="apple-btn apple-btn-secondary"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button
                    onClick={() => buyNow(item)}
                    className="apple-btn apple-btn-primary"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="apple-no-results">
            <p className="apple-no-results-text">No products found matching your search.</p>
          </div>
        )}

      </div>
    </div>
  );
}