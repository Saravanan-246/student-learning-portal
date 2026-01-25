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

    if (!form.name || !form.email || !form.password || !form.confirm)
      return setError("All fields required");

    if (form.password !== form.confirm)
      return setError("Passwords do not match");

    const users = JSON.parse(localStorage.getItem("students")) || [];

    if (users.some((u) => u.email === form.email))
      return setError("Email already exists");

    const newUser = {
      name: form.name,
      email: form.email,
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
        <p className="hint">Red themed dev signup</p>

        {error && <div className="error">{error}</div>}

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        />

        <button>Create Account</button>

        <p className="footer">
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
