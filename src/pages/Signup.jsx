import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import { apiFetch } from "../services/api";

export default function Signup() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* AUTO LOGIN CHECK */
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
    if (Object.values(form).some(v => !v.trim()))
      return "All fields are required";

    if (!/\S+@\S+\.\S+/.test(form.email))
      return "Invalid email address";

    if (form.password.length < 6)
      return "Password must be at least 6 characters";

    if (form.password !== form.confirm)
      return "Passwords do not match";

    return null;
  };

  /* SUBMIT */
  const handleSignup = async (e) => {
    e.preventDefault();

    const msg = validate();
    if (msg) return setError(msg);

    setLoading(true);

    try {
      const data = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.toLowerCase().trim(),
          password: form.password,
        }),
      });

      if (!data?.token) throw new Error("Registration failed");

      localStorage.setItem("studentToken", data.token);
      if (data.user)
        localStorage.setItem("studentUser", JSON.stringify(data.user));

      navigate(data.user?.role === "admin" ? "/admin/dashboard" : "/exams");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body { margin:0 }

        .page {
          min-height: 100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background: ${
            darkMode
              ? "radial-gradient(circle at top,#1b1f2a,#0b0f15)"
              : "linear-gradient(135deg,#ffe5ec,#fcd5ce,#fae1dd)"
          };
        }

        .card {
          width:360px;
          padding:36px;
          border-radius:18px;
          background: ${
            darkMode
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.75)"
          };
          backdrop-filter: blur(14px);
          box-shadow: 0 20px 50px rgba(0,0,0,.25);
          animation: pop .4s ease;
        }

        @keyframes pop {
          from { transform: scale(.95); opacity:0 }
          to { transform: scale(1); opacity:1 }
        }

        h1 {
          text-align:center;
          margin-bottom:26px;
          color:${darkMode ? "#fff" : "#E63946"};
        }

        .group {
          margin-bottom:20px;
        }

        input {
          width:100%;
          padding:14px;
          border-radius:10px;
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
          margin-bottom:14px;
          font-size:14px;
        }

        button {
          width:100%;
          padding:14px;
          border:none;
          border-radius:12px;
          background:linear-gradient(135deg,#E63946,#ff758f);
          color:#fff;
          font-size:16px;
          cursor:pointer;
          transition:.3s;
        }

        button:hover { transform: translateY(-1px); }
        button:disabled { opacity:.7; cursor:not-allowed }

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
        <form className="card" onSubmit={handleSignup}>
          <h1>Create Account</h1>

          {error && <div className="error">{error}</div>}

          <div className="group">
            <input name="name" placeholder="Full Name" onChange={handleChange} />
          </div>

          <div className="group">
            <input name="email" placeholder="Email" onChange={handleChange} />
          </div>

          <div className="group">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          </div>

          <div className="group">
            <input type="password" name="confirm" placeholder="Confirm Password" onChange={handleChange} />
          </div>

          <button disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="footer">
            Already registered? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
}
