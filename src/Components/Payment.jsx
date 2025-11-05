import React, { useState, useEffect } from "react";
import "../assets/css/Payment.css";

export default function Payment() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  // Credit card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const USD_TO_INR = 88.66; // current USD conversion rate

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  // Calculate total amount in USD
  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  };

  // Remove item from cart
  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod === "Credit / Debit Card") {
      if (!cardNumber || !cardName || !expiry || !cvv) {
        alert("Please fill in all credit card details");
        return;
      }
    }

    setPaymentStatus("Processing...");
    setTimeout(() => {
      setPaymentStatus("Payment Successful ✅");
      localStorage.removeItem("cart");
      setCartItems([]);
      setTotal(0);
    }, 2000);
  };

  // UPI QR Code with INR amount
  const upiAmount = (total * USD_TO_INR).toFixed(2);
  const upiString = `upi://pay?pa=iamabjunior@okicici&pn=Example+Store&am=${upiAmount}&cu=INR`;
  const upiQR = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    upiString
  )}&size=200x200`;

  return (
    <div className="payment-container">
      <h1 className="payment-title">Checkout</h1>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h2>Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">₹ {(item.price * USD_TO_INR).toFixed(2)}</p>
                </div>
                <button className="remove-btn" onClick={() => removeItem(index)}>
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-total">
          <h3>Total: ₹ {(total * USD_TO_INR).toFixed(2)}</h3>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-methods">
        <h2>Select Payment Method</h2>

        <label>
          <input
            type="radio"
            name="payment"
            value="Credit / Debit Card"
            checked={paymentMethod === "Credit / Debit Card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Credit / Debit Card
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="UPI (Google Pay, PhonePe, Paytm)"
            checked={paymentMethod === "UPI (Google Pay, PhonePe, Paytm)"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI (Google Pay, PhonePe, Paytm)
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="Apple Wallet"
            checked={paymentMethod === "Apple Wallet"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Apple Wallet
        </label>
      </div>

      {/* Credit Card Form */}
      {paymentMethod === "Credit / Debit Card" && (
        <div className="credit-card-form">
          <h3>Enter Card Details</h3>
          <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          <input type="text" placeholder="Cardholder Name" value={cardName} onChange={(e) => setCardName(e.target.value)} />
          <input type="text" placeholder="Expiry MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
          <input type="password" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
        </div>
      )}

      {/* UPI Payment */}
      {paymentMethod === "UPI (Google Pay, PhonePe, Paytm)" && (
        <div className="upi-payment">
          <h3>Scan to Pay via UPI</h3>
          <p><strong>UPI ID:</strong> iamabjunior@okicici</p>
          <img src={upiQR} alt="UPI QR Code" />
        </div>
      )}

      {/* Apple Wallet Coming Soon */}
      {paymentMethod === "Apple Wallet" && (
        <div className="apple-wallet-payment">
          <h3>Pay via Apple Wallet</h3>
          <p
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#777",
              textAlign: "center",
            }}
          >
            🚧 Apple Wallet Payment Coming Soon <br /> (Under Development)
          </p>
        </div>
      )}

      <button className="pay-now-btn" onClick={handlePayment}>
        Pay Now
      </button>

      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
    </div>
  );
}
