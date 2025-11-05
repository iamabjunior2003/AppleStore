import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/AppleHomePage.css";

export default function AppleHomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
    // Check session status every minute
    const interval = setInterval(checkLoginStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkLoginStatus = () => {
    const sessionData = sessionStorage.getItem("appleSession");
    if (sessionData) {
      const data = JSON.parse(sessionData);
      if (new Date().getTime() < data.expiresAt) {
        setIsLoggedIn(true);
        setUserInfo(data.user);
      } else {
        handleLogout();
      }
    } else {
      setIsLoggedIn(false);
      setUserInfo(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("appleSession");
    setIsLoggedIn(false);
    setUserInfo(null);
    setShowProfileMenu(false);
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const getInitials = () => {
    if (userInfo) {
      if (userInfo.firstName && userInfo.lastName) {
        return `${userInfo.firstName[0]}${userInfo.lastName[0]}`.toUpperCase();
      } else if (userInfo.email) {
        return userInfo.email[0].toUpperCase();
      } else if (userInfo.mobile) {
        return "M";
      }
    }
    return "U";
  };

  const getDisplayName = () => {
    if (userInfo) {
      if (userInfo.firstName && userInfo.lastName) {
        return `${userInfo.firstName} ${userInfo.lastName}`;
      } else if (userInfo.email) {
        return userInfo.email;
      } else if (userInfo.mobile) {
        return userInfo.mobile;
      }
    }
    return "User";
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  return (
    <div className="homepage-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">

          {/* Left Section */}
          <div className="navbar-left">
            {/* Apple Logo */}
            <div className="apple-logo">
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path d="M38.71 20.07C37.35 18.24 35.28 17 33 17c-2.76 0-3.93 1.32-5.87 1.32-2 0-3.53-1.32-5.96-1.32-2.84 0-5.53 1.74-7.36 4.47-2.55 3.81-2.11 10.99 2.02 16.76 1.67 2.33 3.91 4.95 6.8 4.98 2.49.02 3.22-1.6 6.02-1.62 2.8-.01 3.46 1.64 5.95 1.61 2.89-.03 5.27-2.93 6.94-5.26 1.19-1.66 1.63-2.5 2.55-4.41-6.7-2.57-7.79-12.18-3.38-15.46zM31 14.5c1.34-1.59 2.24-3.79 1.99-6-.01-.11-.02-.22-.03-.33-1.93.08-4.25 1.29-5.64 2.93-1.32 1.55-2.47 4.02-2.04 6.39 2.31.17 4.67-1.17 5.72-2.99z" />
              </svg>
            </div>

            {/* Nav Links */}
            <div className="nav-links">
              <Link to="/store" className="nav-link">Store</Link>
              <Link to="/mac" className="nav-link">Mac</Link>
              <Link to="/ipad" className="nav-link">iPad</Link>
              <Link to="/iphone" className="nav-link">iPhone</Link>
              <Link to="/watch" className="nav-link">Watch</Link>
              <Link to="/airpods" className="nav-link">AirPods</Link>
              <Link to="/tv-home" className="nav-link">TV & Home</Link>
              <Link to="/entertainment" className="nav-link">Entertainment</Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="navbar-right">
            <button className="icon-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" strokeWidth="2" />
              </svg>
            </button>

            <button className="icon-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeWidth="2" />
                <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2" />
                <path d="M16 10a4 4 0 0 1-8 0" strokeWidth="2" />
              </svg>
            </button>

            {isLoggedIn ? (
              <div className="profile-menu-container">
                <button
                  className="profile-circle"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  {getInitials()}
                </button>

                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <div className="profile-header">
                      <div className="profile-circle-large">{getInitials()}</div>
                      <div className="profile-info">
                        <div className="profile-name">{getDisplayName()}</div>
                        {userInfo?.email && <div className="profile-email">{userInfo.email}</div>}
                        {userInfo?.mobile && <div className="profile-email">{userInfo.mobile}</div>}
                      </div>
                    </div>

                    <div className="profile-divider"></div>
                    <button className="profile-menu-item">Account Settings</button>
                    <button className="profile-menu-item">Privacy & Security</button>
                    <button className="profile-menu-item">Help & Support</button>
                    <div className="profile-divider"></div>

                    <button className="profile-menu-item logout-button" onClick={handleLogout}>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="signin-button" onClick={handleSignIn}>Sign In</button>
            )}
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">iPhone 16 Pro</h1>
        <p className="hero-subtitle">Hello, Apple Intelligence.</p>
        <div className="hero-links">
          <button className="hero-link">Learn more →</button>
          <button className="hero-link">Buy →</button>
        </div>
        <div className="hero-visual-container">
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-notch"></div>
              <div className="phone-screen"></div>
            </div>
          </div>
        </div>
      </section>

      {/* MacBook Section */}
      <section className="product-section product-section-light">
        <h2 className="product-title">MacBook Air</h2>
        <p className="product-subtitle">Lean. Mean. M3 machine.</p>
        <div className="product-links">
          <button className="product-link">Learn more →</button>
          <button className="product-link">Buy →</button>
        </div>
        <div className="product-visual-container">
          <div className="macbook-visual">
            <div className="macbook-container">
              <div className="macbook-screen">
                <div className="macbook-display">
                  <div className="macbook-wallpaper"></div>
                </div>
              </div>
              <div className="macbook-base"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Apple Watch Section */}
      <section className="product-section product-section-white">
        <h2 className="product-title">Apple Watch Series 10</h2>
        <p className="product-subtitle">Thinstant classic.</p>
        <div className="product-links">
          <button className="product-link">Learn more →</button>
          <button className="product-link">Buy →</button>
        </div>
        <div className="product-visual-container">
          <div className="watch-visual">
            <div className="watch-container">
              <div className="watch-body">
                <div className="watch-screen"></div>
                <div className="watch-button"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <div className="product-grid">
        <div className="product-card product-card-dark">
          <h3 className="card-title">AirPods 4</h3>
          <p className="card-subtitle card-subtitle-dark">Iconic. Now supersonic.</p>
          <div className="card-links">
            <button className="card-link-dark">Learn more →</button>
            <button className="card-link-dark">Buy →</button>
          </div>
        </div>
        <div className="product-card product-card-light">
          <h3 className="card-title">iPad Pro</h3>
          <p className="card-subtitle card-subtitle-light">Unbelievably thin. Incredibly powerful.</p>
          <div className="card-links">
            <button className="card-link-light">Learn more →</button>
            <button className="card-link-light">Buy →</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-column">
              <h4>Shop and Learn</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item"><button>Store</button></li>
                <li className="footer-link-item"><button>Mac</button></li>
                <li className="footer-link-item"><button>iPad</button></li>
                <li className="footer-link-item"><button>iPhone</button></li>
                <li className="footer-link-item"><button>Watch</button></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Services</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item"><button>Apple Music</button></li>
                <li className="footer-link-item"><button>Apple TV+</button></li>
                <li className="footer-link-item"><button>Apple Fitness+</button></li>
                <li className="footer-link-item"><button>iCloud</button></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Apple Store</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item"><button>Find a Store</button></li>
                <li className="footer-link-item"><button>Genius Bar</button></li>
                <li className="footer-link-item"><button>Today at Apple</button></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>For Business</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item"><button>Apple and Business</button></li>
                <li className="footer-link-item"><button>Shop for Business</button></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>About Apple</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item"><button>Newsroom</button></li>
                <li className="footer-link-item"><button>Careers</button></li>
                <li className="footer-link-item"><button>Contact Us</button></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright © 2024 Apple Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}