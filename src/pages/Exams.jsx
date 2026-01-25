import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";

export default function Exams() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= LOAD EXAMS ================= */
  useEffect(() => {
    const token = localStorage.getItem("studentToken");

    // 🔐 GUARD: NOT LOGGED IN
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const loadExams = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await apiFetch("/exams");
        setExams(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load exams:", err);

        // 🔐 TOKEN INVALID / EXPIRED
        if (
          err.message?.toLowerCase().includes("unauthorized") ||
          err.message?.toLowerCase().includes("token")
        ) {
          localStorage.removeItem("studentToken");
          navigate("/login", { replace: true });
          return;
        }

        setError(err.message || "Failed to load exams");
        setExams([]);
      } finally {
        setLoading(false);
      }
    };

    loadExams();
  }, [navigate]);

  const theme = {
    bg: darkMode ? "#0D1117" : "#F8FAFC",
    text: darkMode ? "#E5E7EB" : "#1F2937",
    card: darkMode ? "#161B22" : "#ffffff",
    border: darkMode ? "#30363D" : "#E2E8F0",
    accent: "#DC2626",
    glow: darkMode
      ? "rgba(220,38,38,0.25)"
      : "rgba(220,38,38,0.15)",
  };

  return (
    <>
      <style>{`
        .page {
          min-height: 100vh;
          padding: 3rem 1.5rem;
          background: ${theme.bg};
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .header-section {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .title {
          font-size: 2.4rem;
          font-weight: 800;
          background: linear-gradient(135deg, ${theme.accent}, #991B1B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          margin-top: 8px;
          opacity: .85;
          color: ${theme.text};
        }

        .exam-list {
          width: 100%;
          max-width: 750px;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .exam-card {
          background: ${theme.card};
          padding: 22px;
          border-radius: 18px;
          border: 1px solid ${theme.border};
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: .3s;
        }

        .exam-card:hover {
          transform: translateY(-5px);
          border-color: ${theme.accent};
          box-shadow: 0 12px 26px ${theme.glow};
        }

        .exam-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: ${theme.text};
        }

        .start-btn {
          background: ${theme.accent};
          color: #fff;
          padding: 12px 20px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
        }

        .start-btn:hover {
          background: #b8232c;
        }

        .empty-state {
          margin-top: 5rem;
          text-align: center;
          opacity: .75;
          color: ${theme.text};
        }

        .error {
          color: #ef4444;
          margin-top: 2rem;
        }

        .skeleton {
          height: 80px;
          border-radius: 16px;
          background: ${darkMode ? "#1D222A" : "#E5E7EB"};
          animation: pulse 1.3s infinite;
        }

        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: .45; }
        }
      `}</style>

      <div className="page">
        <div className="header-section">
          <h1 className="title">📘 Exam Center</h1>
          <p className="subtitle">
            {loading
              ? "Loading exams..."
              : `${exams.length} exam${exams.length !== 1 ? "s" : ""} available`}
          </p>
        </div>

        {loading ? (
          <div className="exam-list">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" />
            ))}
          </div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : exams.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: "3rem" }}>🚫</div>
            <p>No exams available. Please check later.</p>
          </div>
        ) : (
          <div className="exam-list">
            {exams.map((exam) => (
              <div key={exam._id} className="exam-card">
                <p className="exam-name">{exam.title}</p>
                <button
                  className="start-btn"
                  onClick={() => navigate(`/exam/${exam._id}`)}
                >
                  Start →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
