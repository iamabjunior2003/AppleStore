import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/AppleLogin.css";

export default function AppleLogin() {
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'mobile'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Create Account States
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Forgot Password States
  const [resetEmail, setResetEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [resetOtpSent, setResetOtpSent] = useState(false);
  const [resetGeneratedOtp, setResetGeneratedOtp] = useState("");
  const [newResetPassword, setNewResetPassword] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);

  const navigate = useNavigate();

  // Initialize users in React state instead of localStorage
  const [users, setUsers] = useState([
    { email: "abc@apple.com", password: "abc@123", firstName: "Demo", lastName: "User" }
  ]);

  // Check session expiry every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const sessionData = sessionStorage.getItem("appleSession");
      if (sessionData) {
        const data = JSON.parse(sessionData);
        if (new Date().getTime() > data.expiresAt) {
          sessionStorage.removeItem("appleSession");
        }
      }
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase().trim() === email.toLowerCase().trim() &&
        user.password.trim() === password.trim()
    );

    if (matchedUser) {
      const expiryTime = new Date().getTime() + 15 * 60 * 1000; // 15 minutes
      sessionStorage.setItem(
        "appleSession",
        JSON.stringify({ 
          status: true, 
          expiresAt: expiryTime,
          user: {
            email: matchedUser.email,
            firstName: matchedUser.firstName,
            lastName: matchedUser.lastName
          }
        })
      );
      navigate("/");
    } else {
      alert("Invalid Apple ID or password.");
    }
  };

  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    alert(`Your OTP is: ${otp} (In production, this would be sent via SMS)`);
  };

  const handleMobileLogin = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      const expiryTime = new Date().getTime() + 15 * 60 * 1000;
      sessionStorage.setItem(
        "appleSession",
        JSON.stringify({ 
          status: true, 
          expiresAt: expiryTime,
          user: {
            mobile: mobile,
            firstName: "Mobile",
            lastName: "User"
          }
        })
      );
      navigate("/");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    const emailExists = users.find(user => user.email.toLowerCase() === newEmail.toLowerCase());
    if (emailExists) {
      alert("An account with this email already exists");
      return;
    }

    const newUser = {
      email: newEmail,
      password: newPassword,
      firstName: firstName,
      lastName: lastName
    };

    setUsers([...users, newUser]);
    alert("Account created successfully! Please sign in.");
    setShowCreateAccount(false);
    setNewEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  };

  const handleSendResetOtp = () => {
    const userExists = users.find(user => user.email.toLowerCase() === resetEmail.toLowerCase());
    if (!userExists) {
      alert("No account found with this email address");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setResetGeneratedOtp(otp);
    setResetOtpSent(true);
    alert(`Reset OTP: ${otp} (In production, this would be sent via email)`);
  };

  const handleVerifyResetOtp = (e) => {
    e.preventDefault();
    if (resetOtp === resetGeneratedOtp) {
      setShowResetPassword(true);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newResetPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    const updatedUsers = users.map(user => {
      if (user.email.toLowerCase() === resetEmail.toLowerCase()) {
        return { ...user, password: newResetPassword };
      }
      return user;
    });

    setUsers(updatedUsers);
    alert("Password reset successfully! Please sign in with your new password.");
    setShowForgotPassword(false);
    setResetEmail("");
    setResetOtp("");
    setResetOtpSent(false);
    setNewResetPassword("");
    setShowResetPassword(false);
  };

  if (showCreateAccount) {
    return (
      <div className="login-container">
        <div className="login-wrapper">
          <div className="apple-logo">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <path d="M38.71 20.07C37.35 18.24 35.28 17 33 17c-2.76 0-3.93 1.32-5.87 1.32-2 0-3.53-1.32-5.96-1.32-2.84 0-5.53 1.74-7.36 4.47-2.55 3.81-2.11 10.99 2.02 16.76 1.67 2.33 3.91 4.95 6.8 4.98 2.49.02 3.22-1.6 6.02-1.62 2.8-.01 3.46 1.64 5.95 1.61 2.89-.03 5.27-2.93 6.94-5.26 1.19-1.66 1.63-2.5 2.55-4.41-6.7-2.57-7.79-12.18-3.38-15.46zM31 14.5c1.34-1.59 2.24-3.79 1.99-6-.01-.11-.02-.22-.03-.33-1.93.08-4.25 1.29-5.64 2.93-1.32 1.55-2.47 4.02-2.04 6.39 2.31.17 4.67-1.17 5.72-2.99z" />
            </svg>
          </div>

          <h1 className="login-title">Create Apple ID</h1>
          <p className="login-subtitle">Fill in your details to get started</p>

          <form className="login-form" onSubmit={handleCreateAccount}>
            <div className="name-row">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="form-input form-input-half"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="form-input form-input-half"
                required
              />
            </div>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email"
              className="form-input"
              required
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
              className="form-input"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="form-input"
              required
            />
            <button type="submit" className="continue-button">
              Create Account
            </button>
          </form>

          <div className="login-links">
            <button className="link-button" onClick={() => setShowCreateAccount(false)}>
              Already have an Apple ID? Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showForgotPassword) {
    return (
      <div className="login-container">
        <div className="login-wrapper">
          <div className="apple-logo">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <path d="M38.71 20.07C37.35 18.24 35.28 17 33 17c-2.76 0-3.93 1.32-5.87 1.32-2 0-3.53-1.32-5.96-1.32-2.84 0-5.53 1.74-7.36 4.47-2.55 3.81-2.11 10.99 2.02 16.76 1.67 2.33 3.91 4.95 6.8 4.98 2.49.02 3.22-1.6 6.02-1.62 2.8-.01 3.46 1.64 5.95 1.61 2.89-.03 5.27-2.93 6.94-5.26 1.19-1.66 1.63-2.5 2.55-4.41-6.7-2.57-7.79-12.18-3.38-15.46zM31 14.5c1.34-1.59 2.24-3.79 1.99-6-.01-.11-.02-.22-.03-.33-1.93.08-4.25 1.29-5.64 2.93-1.32 1.55-2.47 4.02-2.04 6.39 2.31.17 4.67-1.17 5.72-2.99z" />
            </svg>
          </div>

          <h1 className="login-title">Reset Password</h1>
          <p className="login-subtitle">Enter your email to receive a reset code</p>

          {!showResetPassword ? (
            <form className="login-form" onSubmit={handleVerifyResetOtp}>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Email"
                className="form-input"
                required
                disabled={resetOtpSent}
              />
              
              {resetOtpSent && (
                <input
                  type="text"
                  value={resetOtp}
                  onChange={(e) => setResetOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="form-input"
                  maxLength="6"
                  required
                />
              )}
              
              {!resetOtpSent ? (
                <button type="button" onClick={handleSendResetOtp} className="continue-button">
                  Send Reset Code
                </button>
              ) : (
                <button type="submit" className="continue-button">
                  Verify Code
                </button>
              )}
            </form>
          ) : (
            <form className="login-form" onSubmit={handleResetPassword}>
              <input
                type="password"
                value={newResetPassword}
                onChange={(e) => setNewResetPassword(e.target.value)}
                placeholder="New Password"
                className="form-input"
                required
              />
              <button type="submit" className="continue-button">
                Reset Password
              </button>
            </form>
          )}

          <div className="login-links">
            <button className="link-button" onClick={() => {
              setShowForgotPassword(false);
              setResetEmail("");
              setResetOtp("");
              setResetOtpSent(false);
              setShowResetPassword(false);
            }}>
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="apple-logo">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <path d="M38.71 20.07C37.35 18.24 35.28 17 33 17c-2.76 0-3.93 1.32-5.87 1.32-2 0-3.53-1.32-5.96-1.32-2.84 0-5.53 1.74-7.36 4.47-2.55 3.81-2.11 10.99 2.02 16.76 1.67 2.33 3.91 4.95 6.8 4.98 2.49.02 3.22-1.6 6.02-1.62 2.8-.01 3.46 1.64 5.95 1.61 2.89-.03 5.27-2.93 6.94-5.26 1.19-1.66 1.63-2.5 2.55-4.41-6.7-2.57-7.79-12.18-3.38-15.46zM31 14.5c1.34-1.59 2.24-3.79 1.99-6-.01-.11-.02-.22-.03-.33-1.93.08-4.25 1.29-5.64 2.93-1.32 1.55-2.47 4.02-2.04 6.39 2.31.17 4.67-1.17 5.72-2.99z" />
          </svg>
        </div>

        <h1 className="login-title">Sign in to Apple</h1>
        <p className="login-subtitle">Use your Apple ID to continue</p>

        {/* Login Method Toggle */}
        <div className="login-method-toggle">
          <button
            className={`toggle-button ${loginMethod === "email" ? "active" : ""}`}
            onClick={() => setLoginMethod("email")}
          >
            Email
          </button>
          <button
            className={`toggle-button ${loginMethod === "mobile" ? "active" : ""}`}
            onClick={() => setLoginMethod("mobile")}
          >
            Mobile
          </button>
        </div>

        {/* Email Login */}
        {loginMethod === "email" && (
          <form className="login-form" onSubmit={handleEmailLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Apple ID"
              className="form-input"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-input"
              required
            />
            <button type="submit" className="continue-button">
              Continue
            </button>
          </form>
        )}

        {/* Mobile Login */}
        {loginMethod === "mobile" && (
          <form className="login-form" onSubmit={handleMobileLogin}>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Mobile Number"
              className="form-input"
              maxLength="10"
              required
              disabled={otpSent}
            />
            
            {otpSent && (
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter OTP"
                className="form-input"
                maxLength="6"
                required
              />
            )}
            
            {!otpSent ? (
              <button type="button" onClick={handleSendOtp} className="continue-button">
                Send OTP
              </button>
            ) : (
              <button type="submit" className="continue-button">
                Verify & Continue
              </button>
            )}
          </form>
        )}

        <div className="login-links">
          <button className="link-button" onClick={() => setShowForgotPassword(true)}>
            Forgot Apple ID or password?
          </button>
          <button className="link-button" onClick={() => setShowCreateAccount(true)}>
            Don't have an Apple ID? Create yours now.
          </button>
        </div>

        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">Other sign in options</span>
        </div>

        <div className="alternative-signin">
          <button className="signin-option">
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path d="M38.71 20.07C37.35 18.24 35.28 17 33 17c-2.76 0-3.93 1.32-5.87 1.32-2 0-3.53-1.32-5.96-1.32-2.84 0-5.53 1.74-7.36 4.47-2.55 3.81-2.11 10.99 2.02 16.76 1.67 2.33 3.91 4.95 6.8 4.98 2.49.02 3.22-1.6 6.02-1.62 2.8-.01 3.46 1.64 5.95 1.61 2.89-.03 5.27-2.93 6.94-5.26 1.19-1.66 1.63-2.5 2.55-4.41-6.7-2.57-7.79-12.18-3.38-15.46zM31 14.5c1.34-1.59 2.24-3.79 1.99-6-.01-.11-.02-.22-.03-.33-1.93.08-4.25 1.29-5.64 2.93-1.32 1.55-2.47 4.02-2.04 6.39 2.31.17 4.67-1.17 5.72-2.99z" />
            </svg>
            Sign in with Apple
          </button>
          <button className="signin-option">
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.9 2.9l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
              <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.7 1.1 7.9 2.9l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.6 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.2-7.2 2.2-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.2 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.2 5.2c-.4.4 6.6-4.8 6.6-14.7 0-1.3-.1-2.6-.4-3.9z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="login-footer">
          <div className="footer-links">
            <button className="footer-link">Privacy Policy</button>
            <button className="footer-link">Terms of Service</button>
            <button className="footer-link">Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}