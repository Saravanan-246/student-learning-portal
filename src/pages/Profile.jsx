import { useTheme } from "../context/ThemeContext.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  // 🔐 JWT-BASED AUTH (REPLACED useAuth)
  const storedUser = JSON.parse(localStorage.getItem("studentUser"));
  const token = localStorage.getItem("studentToken");

  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
  });

  // 🔐 AUTH GUARD
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  // 🚪 LOGOUT (JWT)
  const logout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentUser");
    navigate("/login", { replace: true });
  };

  // Dynamic theme colors
  const theme = {
    bg: darkMode ? "#0D1117" : "#FFFFFF",
    cardBg: darkMode ? "#161B22" : "#F9FAFB",
    text: darkMode ? "#E4E6EB" : "#111827",
    secondary: darkMode ? "#8B949E" : "#6B7280",
    accent: darkMode ? "#FF5555" : "#DC2626",
    accentDark: darkMode ? "#EE4444" : "#991B1B",
    border: darkMode ? "#30363D" : "#E5E7EB",
    borderAccent: darkMode ? "#444444" : "#FECACA",
    highlight: darkMode ? "rgba(255, 85, 85, 0.1)" : "#FEE2E2",
    highlightBorder: darkMode ? "#FF5555" : "#FECACA"
  };

  // Icons (UNCHANGED)
  const UserIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const MailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  );

  const EditIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );

  const SaveIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  );

  const LogoutIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 💾 SAVE (LOCAL ONLY)
  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
    };

    localStorage.setItem("studentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
  };

  return (
    <>
      <style>{`
        .profile-container {
          min-height: 100vh;
          padding: 2rem;
          background: ${theme.bg};
          color: ${theme.text};
          transition: background-color 0.3s ease, color 0.3s ease;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .profile-header {
          margin-bottom: 2rem;
          animation: slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .profile-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          letter-spacing: -0.5px;
        }

        .profile-subtitle {
          font-size: 1rem;
          color: ${theme.secondary};
          font-weight: 400;
        }

        .title-accent {
          display: inline-block;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, ${theme.accent}, ${theme.accentDark});
          border-radius: 2px;
          margin-bottom: 1rem;
          animation: slideIn 0.6s ease-out;
        }

        @keyframes slideIn {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 60px;
            opacity: 1;
          }
        }

        .profile-card {
          background: ${theme.cardBg};
          border: 1px solid ${theme.border};
          border-radius: 0.75rem;
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.8s ease-out;
          max-width: 600px;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .profile-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, ${theme.accent}, ${theme.accentDark});
        }

        .profile-card:hover {
          box-shadow: 0 12px 24px ${darkMode ? "rgba(255, 85, 85, 0.2)" : "rgba(220, 38, 38, 0.15)"};
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: ${theme.text};
        }

        .card-title-icon {
          color: ${theme.accent};
          display: flex;
          align-items: center;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group:last-child {
          margin-bottom: 0;
        }

        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: ${theme.text};
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .info-display {
          background: ${theme.highlight};
          border: 1px solid ${theme.highlightBorder};
          border-radius: 0.65rem;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          color: ${theme.text};
          transition: all 0.3s ease;
        }

        .info-display:hover {
          border-color: ${theme.accent};
        }

        .info-icon {
          color: ${theme.accent};
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid ${theme.border};
          border-radius: 0.65rem;
          background: ${theme.bg};
          color: ${theme.text};
          font-size: 0.95rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: ${theme.accent};
          box-shadow: 0 0 0 3px ${darkMode ? "rgba(255, 85, 85, 0.15)" : "rgba(220, 38, 38, 0.1)"};
        }

        .btn-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.65rem;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          letter-spacing: 0.2px;
          flex: 1;
          min-width: 150px;
          justify-content: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentDark} 100%);
          color: white;
          box-shadow: 0 4px 12px ${darkMode ? "rgba(255, 85, 85, 0.3)" : "rgba(220, 38, 38, 0.3)"};
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px ${darkMode ? "rgba(255, 85, 85, 0.4)" : "rgba(220, 38, 38, 0.4)"};
        }

        .btn-primary:active {
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: ${theme.cardBg};
          color: ${theme.accent};
          border: 2px solid ${theme.accent};
        }

        .btn-secondary:hover {
          background: ${theme.highlight};
          transform: translateY(-3px);
          border-color: ${theme.accent};
        }

        .btn-danger {
          background: linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentDark} 100%);
          color: white;
          box-shadow: 0 4px 12px ${darkMode ? "rgba(255, 85, 85, 0.3)" : "rgba(220, 38, 38, 0.3)"};
          width: 100%;
        }

        .btn-danger:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px ${darkMode ? "rgba(255, 85, 85, 0.4)" : "rgba(220, 38, 38, 0.4)"};
        }

        @media (max-width: 750px) {
          .profile-container {
            padding: 1.5rem;
          }

          .profile-title {
            font-size: 1.8rem;
          }

          .profile-card {
            max-width: 100%;
          }

          .btn-group {
            flex-direction: column;
          }

          .btn {
            flex: 1;
            min-width: auto;
          }
        }
      `}</style>

      <div className="profile-container">
        <div className="profile-header">
          <div className="title-accent" />
          <h1 className="profile-title">Student Profile</h1>
          <p className="profile-subtitle">Manage your account information.</p>
        </div>

        <div className="profile-card">
          <div className="card-title">
            <UserIcon /> Account Information
          </div>

          {editMode ? (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className="form-input"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="btn-group">
                <button className="btn btn-primary" onClick={handleSave}>
                  <SaveIcon /> Save Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditMode(false);
                    setFormData({
                      name: user?.name || "",
                      email: user?.email || "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="info-display">
                  <UserIcon /> {user?.name || "Not Set"}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="info-display">
                  <MailIcon /> {user?.email || "Not Set"}
                </div>
              </div>

              <div className="btn-group">
                <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                  <EditIcon /> Edit Profile
                </button>
                <button className="btn btn-danger" onClick={logout}>
                  <LogoutIcon /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}