import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValue = email.trim().toLowerCase();
    const passwordValue = password;

    if (!emailValue || !passwordValue) {
      setError("Email and password are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("students")) || [];

    const user = users.find(
      (u) => u.email === emailValue && u.password === passwordValue
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    // ✅ Persist logged-in user
    localStorage.setItem("studentUser", JSON.stringify(user));
    login(user);

    // ✅ Go to dashboard and stay there
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className={`login-wrapper ${darkMode ? "dark" : ""}`}>
      {/* LEFT SECTION */}
      <div className="login-left">
        <h1>Welcome to Dev Portal</h1>
        <p>
          Secure access for students and administrators.
          Build, test, and manage your platform with confidence.
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="login-right">
        <form className="login-box" onSubmit={handleSubmit} autoComplete="off">
          <h2>Sign in to your account</h2>
          <p className="subtitle">Enter your credentials to continue</p>

          {error && <div className="error">{error}</div>}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          <button type="submit">Continue</button>

          <p className="signup-link">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
