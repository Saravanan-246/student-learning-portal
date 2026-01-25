import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./Login.css";
=======
import { useTheme } from "../context/ThemeContext.jsx";
import { apiFetch } from "../services/api";
>>>>>>> 2998704494a0122a38f10f26cd56485dd4f55de8

export default function Login() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("students")) || [];

    const user = users.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    login(user);
    navigate("/dashboard");
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
        <form className="login-box" onSubmit={handleSubmit}>
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
=======
  /* AUTO REDIRECT */
  useEffect(() => {
    if (localStorage.getItem("studentToken")) {
      navigate("/exams", { replace: true });
    }
  }, [navigate]);

  /* INPUT HANDLER */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  /* VALIDATION */
  const validate = () => {
    if (!form.email.trim() || !form.password.trim())
      return "Email and password are required";

    if (!/\S+@\S+\.\S+/.test(form.email))
      return "Enter a valid email address";

    return null;
  };

  /* LOGIN */
  const handleLogin = async (e) => {
    e.preventDefault();

    const msg = validate();
    if (msg) return setError(msg);

    setLoading(true);

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email.toLowerCase().trim(),
          password: form.password,
        }),
      });

      if (!data?.token) throw new Error("Invalid login response");

      localStorage.setItem("studentToken", data.token);

      if (data.user) {
        localStorage.setItem("studentUser", JSON.stringify(data.user));
      }

      navigate("/exams");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .page {
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:${
            darkMode
              ? "radial-gradient(circle at top,#1b1f2a,#0b0f15)"
              : "linear-gradient(135deg,#ffe5ec,#fcd5ce,#fae1dd)"
          };
        }

        .card {
          width:360px;
          padding:36px;
          border-radius:18px;
          background:${
            darkMode
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.75)"
          };
          backdrop-filter: blur(14px);
          box-shadow:0 20px 50px rgba(0,0,0,.25);
          animation:fade .35s ease;
        }

        @keyframes fade {
          from { opacity:0; transform:scale(.96); }
          to { opacity:1; transform:scale(1); }
        }

        h1 {
          text-align:center;
          margin-bottom:26px;
          color:${darkMode ? "#fff" : "#E63946"};
        }

        .group { margin-bottom:20px; }

        input {
          width:100%;
          padding:14px;
          border-radius:12px;
          border:1px solid transparent;
          background:${darkMode ? "#101522" : "#fff"};
          color:${darkMode ? "#fff" : "#111"};
          font-size:15px;
        }

        input:focus {
          outline:none;
          border-color:#E63946;
          box-shadow:0 0 0 3px rgba(230,57,70,.25);
        }

        .error {
          text-align:center;
          color:#E63946;
          font-size:14px;
          margin-bottom:14px;
        }

        button {
          width:100%;
          padding:14px;
          border:none;
          border-radius:14px;
          background:linear-gradient(135deg,#E63946,#ff758f);
          color:#fff;
          font-size:16px;
          cursor:pointer;
          transition:.25s;
        }

        button:hover { transform: translateY(-1px); }
        button:disabled { opacity:.7; cursor:not-allowed; }

        .footer {
          margin-top:20px;
          text-align:center;
          font-size:14px;
          color:${darkMode ? "#bbb" : "#444"};
        }

        a {
          color:#E63946;
          font-weight:600;
          text-decoration:none;
        }
      `}</style>

      <div className="page">
        <form className="card" onSubmit={handleLogin}>
          <h1>Welcome Back</h1>

          {error && <div className="error">{error}</div>}

          <div className="group">
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>

          <div className="group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <button disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>

          <div className="footer">
            No account? <Link to="/signup">Create one</Link>
          </div>
>>>>>>> 2998704494a0122a38f10f26cd56485dd4f55de8
        </form>
      </div>
    </div>
  );
}
