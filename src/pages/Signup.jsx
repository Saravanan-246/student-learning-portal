import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./Signup.css";

export default function Signup() {
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("students")) || [];

    if (users.some((u) => u.email === form.email.trim())) {
      setError("Email already exists");
      return;
    }

    const newUser = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    localStorage.setItem("students", JSON.stringify([...users, newUser]));
    login(newUser);
    navigate("/dashboard");
  };

  return (
    <div className={`signup-wrap ${darkMode ? "dark" : ""}`}>
      <form className="signup-panel" onSubmit={handleSignup}>
        <span className="badge">CREATE</span>
        <h2>Create Account</h2>
        <p className="hint">Join Dev Portal and get started</p>

        {error && <div className="error">{error}</div>}

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          required
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            setError("");
          }}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          required
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
            setError("");
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
            setError("");
          }}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirm}
          required
          onChange={(e) => {
            setForm({ ...form, confirm: e.target.value });
            setError("");
          }}
        />

        <button type="submit">Create Account</button>

        <p className="footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
