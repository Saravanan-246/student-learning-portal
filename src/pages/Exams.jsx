import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Exams() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem("exams") || "[]");
      setExams(stored);
      setLoading(false);
    }, 500);
  }, []);

  const theme = {
    bg: darkMode ? "#0D1117" : "#F8FAFC",
    text: darkMode ? "#E5E7EB" : "#1F2937",
    card: darkMode ? "#161B22" : "#ffffff",
    border: darkMode ? "#30363D" : "#E2E8F0",
    accent: "#DC2626",
    glow: darkMode ? "rgba(220,38,38,0.25)" : "rgba(220,38,38,0.15)"
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
          transition: .3s;
        }

        .header-section {
          text-align: center;
          margin-bottom: 2.5rem;
          animation: fadeDown .6s forwards;
        }

        .title {
          font-size: 2.4rem;
          font-weight: 800;
          background: linear-gradient(135deg, ${theme.accent}, #991B1B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          opacity: .8;
          margin-top: 8px;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
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
          cursor: pointer;
          transition: .3s;
          animation: popIn .45s ease;
          box-shadow: 0px 6px 20px rgba(0,0,0,.05);
        }

        .exam-card:hover {
          transform: translateY(-5px);
          border-color: ${theme.accent};
          box-shadow: 0 12px 26px ${theme.glow};
        }

        @keyframes popIn {
          0% { opacity: 0; transform: scale(.95); }
          100% { opacity: 1; transform: scale(1); }
        }

        .exam-name {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .start-btn {
          background: ${theme.accent};
          color: white;
          padding: 12px 20px;
          border-radius: 10px;
          border: none;
          font-size: .95rem;
          cursor: pointer;
          transition: .25s;
        }

        .start-btn:hover {
          background: #b8232c;
          transform: scale(1.05);
        }

        .empty-state {
          margin-top: 5rem;
          text-align: center;
          opacity: .6;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 10px;
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
          <p className="subtitle">Choose an exam and begin your challenge.</p>
        </div>

        {loading ? (
          <div className="exam-list">
            {[1,2,3].map(i => <div key={i} className="skeleton"></div>)}
          </div>
        ) : exams.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🚫</div>
            <p>No exams available. Please check later.</p>
          </div>
        ) : (
          <div className="exam-list">
            {exams.map((exam, i) => (
              <div key={i} className="exam-card">
                <p className="exam-name">{exam.title}</p>
                <button 
                  className="start-btn"
                  onClick={() => navigate(`/exam/${exam.id}`)}
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
