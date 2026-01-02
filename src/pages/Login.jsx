import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("students") || "[]");

    const exist = users.find(
      (u) => u.email === form.email.trim() && u.password === form.password.trim()
    );

    if (!exist) return setError("Invalid login details ❌");

    login(exist);
    navigate("/dashboard");
  };

  return (
    <>
      <style>{`
        * { -webkit-tap-highlight-color: transparent; }

        input {
          appearance: none;
          outline: none !important;
          border: none;
          background: transparent;
        }

        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          -webkit-text-fill-color: ${darkMode ? "white" : "#222"} !important;
        }

        .wrapper {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: ${darkMode ? "#0B0F15" : "linear-gradient(120deg,#fff,#ffe9ec,#ffd8de)"};
        }

        form {
          width: 320px;
          padding: 35px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          background: ${darkMode ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.35)"};
        }

        .title {
          text-align: center;
          font-size: 30px;
          margin-bottom: 30px;
          color: ${darkMode ? "white" : "#E63946"};
          font-weight: 600;
        }

        .field {
          width: 100%;
          position: relative;
          margin-bottom: 35px;
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
          color: #999;
          font-size: 15px;
          transition: 0.3s;
          pointer-events: none;
        }

        .input:focus + .label,
        .input:not(:placeholder-shown) + .label {
          top: -10px;
          font-size: 12px;
          color: ${darkMode ? "white" : "#E63946"};
        }

        /* Center animation underline */
        .underline {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          width: 0%;
          height: 2px;
          background: ${darkMode ? "#fff" : "#E63946"};
          transition: width 0.35s ease-in-out;
        }

        .input:focus ~ .underline {
          width: 100%;
        }

        /* Static faint underline */
        .base-line {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: ${darkMode ? "#777" : "rgba(0,0,0,0.3)"};
        }

        .btn {
          width: 100%;
          padding: 14px;
          margin-top: 10px;
          background: #E63946;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 17px;
          cursor: pointer;
          transition: 0.25s;
        }

        .btn:hover {
          background: #c92f38;
        }

        .error {
          text-align: center;
          margin-bottom: 10px;
          font-size: 14px;
          color: #E63946;
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
        <form onSubmit={handleLogin} autoComplete="off">
          <h1 className="title">Login</h1>

          {error && <p className="error">{error}</p>}

          {/* EMAIL */}
          <div className="field">
            <input
              className="input"
              type="text"
              placeholder=" "
              autoComplete="new-email"
              name="no-autofill-email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label className="label">Email</label>
            <span className="base-line"></span>
            <span className="underline"></span>
          </div>

          {/* PASSWORD */}
          <div className="field">
            <input
              className="input"
              type="password"
              placeholder=" "
              autoComplete="new-password"
              name="no-autofill-pass"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <label className="label">Password</label>
            <span className="base-line"></span>
            <span className="underline"></span>
          </div>

          <button className="btn">Continue</button>

          <p className="footer">
            No account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </>
  );
}
