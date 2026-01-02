import { useTheme } from "../context/ThemeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";

export default function Results() {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem("responses") || "[]")
        .filter((r) => r.student === user?.email);
      setResponses(stored);
      setLoading(false);
    }, 500);
  }, [user?.email]);

  const theme = {
    bg: darkMode ? "#0D1117" : "#FFFFFF",
    cardBg: darkMode ? "#161B22" : "#F9FAFB",
    text: darkMode ? "#E4E6EB" : "#111827",
    secondary: darkMode ? "#8B949E" : "#6B7280",
    accent: "#DC2626",
    border: darkMode ? "#30363D" : "#E5E7EB",
    highlight: "#FEE2E2"
  };

  // Professional SVG Icons
  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  const FileIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
      <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
  );

  const EmptyIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
      <polyline points="9 11 12 14 15 11"></polyline>
    </svg>
  );

  const calculateScore = (examId) => {
    const response = responses.find(r => r.examId === examId);
    if (!response || !response.answers) return 0;
    // Assuming each question has a correct answer
    return Math.floor(Math.random() * 100); // Placeholder calculation
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <>
      <style>{`
        .results-container {
          min-height: 100vh;
          padding: 2rem;
          background: ${theme.bg};
          color: ${theme.text};
          transition: background-color 0.3s ease, color 0.3s ease;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .results-header {
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

        .results-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          letter-spacing: -0.5px;
        }

        .results-subtitle {
          font-size: 1rem;
          color: ${theme.secondary};
          font-weight: 400;
        }

        .title-accent {
          display: inline-block;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #DC2626, #991B1B);
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
          max-width: 900px;
        }

        .stat-card {
          background: ${theme.cardBg};
          border: 1px solid ${theme.border};
          border-radius: 0.75rem;
          padding: 1.75rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #DC2626, #991B1B);
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(220, 38, 38, 0.15);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #DC2626;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: ${theme.secondary};
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 4rem;
          max-width: 500px;
          text-align: center;
          animation: fadeInUp 0.8s ease-out;
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

        .empty-icon {
          color: ${theme.secondary};
          margin-bottom: 1.5rem;
          opacity: 0.5;
        }

        .empty-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: ${theme.text};
        }

        .empty-text {
          font-size: 0.95rem;
          color: ${theme.secondary};
          line-height: 1.6;
        }

        .empty-card {
          background: ${theme.cardBg};
          border: 1px solid ${theme.border};
          border-radius: 0.75rem;
          padding: 2rem;
          margin-top: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .results-grid {
          display: grid;
          gap: 1.5rem;
          max-width: 900px;
        }

        .result-card {
          background: ${theme.cardBg};
          border: 1px solid ${theme.border};
          border-radius: 0.75rem;
          padding: 1.75rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation-fill-mode: both;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .result-card:nth-child(1) { animation-delay: 0.1s; }
        .result-card:nth-child(2) { animation-delay: 0.2s; }
        .result-card:nth-child(3) { animation-delay: 0.3s; }
        .result-card:nth-child(4) { animation-delay: 0.4s; }

        .result-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #DC2626, #991B1B);
        }

        .result-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(220, 38, 38, 0.15);
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .result-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: ${theme.text};
        }

        .result-score {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: ${theme.highlight};
          border: 1px solid #FECACA;
          padding: 0.5rem 1rem;
          border-radius: 0.65rem;
          font-weight: 700;
          color: #DC2626;
        }

        .result-meta {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid ${theme.border};
        }

        .result-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: ${theme.secondary};
        }

        .result-meta-icon {
          color: #DC2626;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(220, 38, 38, 0.05));
          border: 1px solid #FECACA;
          color: #DC2626;
          padding: 0.5rem 1rem;
          border-radius: 0.65rem;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .loading-skeleton {
          background: ${theme.cardBg};
          border: 1px solid ${theme.border};
          border-radius: 0.75rem;
          padding: 1.75rem;
          height: 120px;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @media (max-width: 750px) {
          .results-container {
            padding: 1.5rem;
          }

          .results-title {
            font-size: 1.8rem;
          }

          .result-header {
            flex-direction: column;
          }

          .result-score {
            width: 100%;
            justify-content: center;
          }

          .result-meta {
            flex-direction: column;
            gap: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="results-container">
        {/* Header */}
        <div className="results-header">
          <div className="title-accent" />
          <h1 className="results-title">Your Results</h1>
          <p className="results-subtitle">
            View your exam submissions and performance history.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <>
            <div className="stats-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="loading-skeleton" />
              ))}
            </div>
            <div className="results-grid">
              {[1, 2].map((i) => (
                <div key={i} className="loading-skeleton" style={{ height: "140px" }} />
              ))}
            </div>
          </>
        ) : responses.length === 0 ? (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">0</div>
                <div className="stat-label">Exams Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">—</div>
                <div className="stat-label">Average Score</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>

            {/* Empty State */}
            <div className="empty-state">
              <div className="empty-icon">
                <EmptyIcon />
              </div>
              <div className="empty-card">
                <h2 className="empty-title">No Results Yet</h2>
                <p className="empty-text">
                  Your exam results will appear here once you submit your first test. 
                  Complete an exam to see your performance analytics.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{responses.length}</div>
                <div className="stat-label">Exams Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {responses.length > 0 ? Math.round(responses.reduce((sum, r) => sum + (Math.random() * 100), 0) / responses.length) : 0}%
                </div>
                <div className="stat-label">Average Score</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Submission Rate</div>
              </div>
            </div>

            {/* Results List */}
            <div className="results-grid">
              {responses.map((result, idx) => (
                <div key={idx} className="result-card">
                  <div className="result-header">
                    <div>
                      <h2 className="result-title">Exam #{result.examId}</h2>
                    </div>
                    <div className="result-score">
                      <span>{calculateScore(result.examId)}</span>
                      <span style={{ fontSize: "0.9rem" }}>%</span>
                    </div>
                  </div>

                  <div className="result-meta">
                    <div className="result-meta-item">
                      <div className="result-meta-icon">
                        <CalendarIcon />
                      </div>
                      <span>{formatDate(result.submittedAt)}</span>
                    </div>
                    <div className="result-meta-item">
                      <div className="result-meta-icon">
                        <FileIcon />
                      </div>
                      <span>{result.answers?.length || 0} Questions Answered</span>
                    </div>
                  </div>

                  <div style={{ marginTop: "1rem" }}>
                    <div className="status-badge">
                      <CheckIcon />
                      <span>Submitted</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
