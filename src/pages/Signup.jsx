import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
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

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const confirm = form.confirm;

    if (!name || !email || !password || !confirm) {
      setError("All fields are required ❗");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match ❌");
      return;
    }

    const users = JSON.parse(localStorage.getItem("students")) || [];

    if (users.some((u) => u.email === email)) {
      setError("This email already exists ⚠");
      return;
    }

    const newUser = { name, email, password };

    // ✅ Save users list
    localStorage.setItem("students", JSON.stringify([...users, newUser]));

    // ✅ Persist logged-in user
    localStorage.setItem("studentUser", JSON.stringify(newUser));
    login(newUser);

    // ✅ Redirect to dashboard and stay there
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className={`wrapper ${darkMode ? "dark" : ""}`}>
      <form className="form-box" onSubmit={handleSignup} autoComplete="off">
        <h1 className="title">Create Account</h1>

        {error && <p className="error">{error}</p>}

        <div className="field">
          <input
            className="input"
            type="text"
            placeholder=" "
            value={form.name}
            required
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setError("");
            }}
          />
          <label className="label">Full Name</label>
          <span className="base-line"></span>
          <span className="underline"></span>
        </div>

        <div className="field">
          <input
            className="input"
            type="email"
            placeholder=" "
            value={form.email}
            required
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              setError("");
            }}
          />
          <label className="label">Email</label>
          <span className="base-line"></span>
          <span className="underline"></span>
        </div>

        <div className="field">
          <input
            className="input"
            type="password"
            placeholder=" "
            value={form.password}
            required
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              setError("");
            }}
          />
          <label className="label">Password</label>
          <span className="base-line"></span>
          <span className="underline"></span>
        </div>

        <div className="field">
          <input
            className="input"
            type="password"
            placeholder=" "
            value={form.confirm}
            required
            onChange={(e) => {
              setForm({ ...form, confirm: e.target.value });
              setError("");
            }}
          />
          <label className="label">Confirm Password</label>
          <span className="base-line"></span>
          <span className="underline"></span>
        </div>

        <button className="btn" type="submit">
          Sign Up
        </button>

        <p className="footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
