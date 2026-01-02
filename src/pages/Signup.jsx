import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

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
      return setError("All fields are required ❗");

    if (form.password !== form.confirm)
      return setError("Passwords do not match ❌");

    const store = JSON.parse(localStorage.getItem("students") || "[]");

    if (store.find((u) => u.email === form.email))
      return setError("This email already exists ⚠");

    const newUser = { name: form.name, email: form.email, password: form.password };

    localStorage.setItem("students", JSON.stringify([...store, newUser]));
    localStorage.setItem("studentUser", JSON.stringify(newUser));

    login(newUser);
    navigate("/dashboard");
  };

  return (
    <>
      <style>{`
        .wrapper {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: ${
            darkMode
              ? "#0B0F15"
              : "linear-gradient(120deg,#fff,#ffe9ec,#ffd8de)"
          };
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }

        input {
          appearance: none;
          outline: none;
          border: none;
          background: transparent;
        }

        .form-box {
          width: 320px;
          padding: 35px;
          backdrop-filter: blur(10px);
          border-radius: 14px;
          background: ${
            darkMode ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.35)"
          };
        }

        .title {
          text-align: center;
          font-size: 28px;
          font-weight: 600;
          color: ${darkMode ? "white" : "#E63946"};
          margin-bottom: 30px;
        }

        .field {
          width: 100%;
          position: relative;
          margin-bottom: 32px;
        }

        .input {
          width: 100%;
          padding: 10px 5px;
          font-size: 16px;
          color: ${darkMode ? "white" : "#222"};
        }

        .label {
          position: absolute;
          left: 5px;
          top: 10px;
          font-size: 15px;
          color: #999;
          pointer-events: none;
          transition: 0.25s;
        }

        .input:focus + .label,
        .input:not(:placeholder-shown) + .label {
          top: -8px;
          font-size: 12px;
          color: #E63946;
        }

        .base-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: ${darkMode ? "#777" : "rgba(0,0,0,0.3)"};
        }

        .underline {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0%;
          transform: translateX(-50%);
          height: 1px;
          background: #E63946;
          transition: width .35s ease-in-out;
        }

        .input:focus ~ .underline {
          width: 100%;
        }

        .btn {
          width: 100%;
          padding: 14px;
          background: #E63946;
          color: white;
          font-size: 17px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 5px;
          transition: .25s;
        }

        .btn:hover {
          background: #c92f38;
        }

        .error {
          color: #E63946;
          text-align: center;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
          color: ${darkMode ? "#ccc" : "#444"};
        }

        .footer a {
          color: #E63946;
          font-weight: 600;
          text-decoration: none;
        }
      `}</style>

      <div className="wrapper">
        <form className="form-box" onSubmit={handleSignup} autoComplete="off">
          <h1 className="title">Create Account </h1>

          {error && <p className="error">{error}</p>}

          {/* Name */}
          <div className="field">
            <input
              className="input"
              type="text"
              placeholder=" "
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <label className="label">Full Name</label>
            <span className="base-line"></span>
            <span className="underline"></span>
          </div>

          {/* Email */}
          <div className="field">
            <input
              className="input"
              type="email"
              placeholder=" "
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label className="label">Email</label>
            <span className="base-line"></span>
            <span className="underline"></span>
          </div>

          {/* Password */}
          <div className="field">
            <input
              className="input"
              type="password"
              placeholder=" "
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <label className="label">Password</label>
            <span className="base-line"></span>
            <span className="underline"></span>
          </div>

          {/* Confirm Password */}
          <div className="field">
            <input
              className="input"
              type="password"
              placeholder=" "
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
            <label className="label">Confirm Password</label>
            <span className="base-line"></span>
            <span className="underline"></span>
          </div>

          <button className="btn">Sign Up</button>

          <p className="footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}
