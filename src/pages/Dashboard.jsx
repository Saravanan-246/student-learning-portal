import { useTheme } from "../context/ThemeContext.jsx";
import { useRef } from "react";

export default function Dashboard() {
  const { darkMode } = useTheme();

  // 🔐 JWT-BASED USER
  const user = JSON.parse(localStorage.getItem("studentUser"));

  // 🔐 SAFETY GUARD
  if (!user) {
    return null;
  }

  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const scrollToSection = (index) => {
    sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const theme = {
    bg: darkMode ? "#0D1117" : "#FFFFFF",
    cardBg: darkMode ? "#161B22" : "#F9FAFB",
    text: darkMode ? "#E4E6EB" : "#111827",
    secondary: darkMode ? "#8B949E" : "#6B7280",
    accent: "#DC2626",
    border: darkMode ? "#30363D" : "#E5E7EB",
    highlight: "#FEE2E2",
  };

  // Professional SVG Icons
  const DashboardIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  );

  const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  const TrendIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  );

  const UserIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const BookIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  );

  const ChartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="2" x2="12" y2="22"></line>
      <path d="M17 5H9.5a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5H17"></path>
      <path d="M7 12h10"></path>
    </svg>
  );

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .snap-container {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          background: ${theme.bg};
          color: ${theme.text};
        }

        .snap-section {
          height: 100vh;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          transition: all 0.4s ease;
        }

        .section-content {
          max-width: 700px;
          width: 100%;
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

        .accent-line {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #DC2626, #991B1B);
          border-radius: 2px;
          margin: 0 auto 1.5rem;
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

        .section-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          margin-bottom: 1rem;
          letter-spacing: -0.5px;
        }

        .section-desc {
          font-size: 1.05rem;
          color: ${theme.secondary};
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .card {
          background: ${theme.cardBg};
          border: 1px solid ${theme.border};
          border-radius: 0.75rem;
          padding: 1.75rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          text-align: left;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #DC2626, #991B1B);
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(220, 38, 38, 0.15);
        }

        .card-icon {
          width: 48px;
          height: 48px;
          background: ${theme.highlight};
          border-radius: 0.65rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: #DC2626;
          flex-shrink: 0;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: ${theme.text};
        }

        .card-text {
          font-size: 0.9rem;
          color: ${theme.secondary};
          line-height: 1.6;
        }

        .stat-box {
          background: ${theme.highlight};
          border: 1px solid #FECACA;
          border-radius: 0.75rem;
          padding: 2rem;
          margin: 1.5rem 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.2rem;
          font-weight: 800;
          color: #DC2626;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.85rem;
          color: ${theme.secondary};
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.75rem 1.75rem;
          border: none;
          border-radius: 0.65rem;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.2px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(220, 38, 38, 0.4);
        }

        .btn-secondary {
          background: ${theme.cardBg};
          color: #DC2626;
          border: 2px solid #DC2626;
        }

        .btn-secondary:hover {
          background: ${theme.highlight};
          transform: translateY(-3px);
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: ${theme.border};
          border-radius: 10px;
          margin: 0.75rem 0;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #DC2626, #991B1B);
          border-radius: 10px;
          animation: fillProgress 1.5s ease-out;
        }

        @keyframes fillProgress {
          from {
            width: 0%;
          }
          to {
            width: var(--width, 0%);
          }
        }

        .info-grid {
          text-align: left;
          background: ${theme.cardBg};
          border: 1px solid ${theme.border};
          border-radius: 0.75rem;
          padding: 1.75rem;
          margin: 1.5rem 0;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid ${theme.border};
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          font-weight: 600;
          color: ${theme.text};
        }

        .info-value {
          color: #DC2626;
          font-weight: 600;
        }

        @media (max-width: 750px) {
          .snap-section {
            padding: 1.5rem;
          }
          .section-title {
            font-size: 1.8rem;
          }
          .btn-group {
            flex-direction: column;
          }
          .btn {
            width: 100%;
            justify-content: center;
          }
          .card-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="snap-container">

        {/* SECTION 1 - Welcome */}
        <section ref={sectionRefs[0]} className="snap-section">
          <div className="section-content">
            <div className="accent-line" />
            <h1 className="section-title">Welcome, {user?.name || "Student"}</h1>
            <p className="section-desc">
              Your personalized learning dashboard. Track your progress, prepare for exams, and achieve your goals.
            </p>

            <div className="card-grid">
              <div className="card">
                <div className="card-icon"><DashboardIcon /></div>
                <div className="card-title">Dashboard Overview</div>
                <div className="card-text">Access all your exams, results, and performance metrics in one place.</div>
              </div>
              <div className="card">
                <div className="card-icon"><CheckIcon /></div>
                <div className="card-title">Track Progress</div>
                <div className="card-text">Monitor your learning progress with detailed analytics and insights.</div>
              </div>
            </div>

            <div className="btn-group">
              <button className="btn btn-primary" onClick={() => scrollToSection(1)}>
                <BookIcon />
                Explore Exams
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection(3)}>
                <UserIcon />
                Your Profile
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2 - Exams */}
        <section ref={sectionRefs[1]} className="snap-section">
          <div className="section-content">
            <div className="accent-line" />
            <h2 className="section-title">Exam Center</h2>
            <p className="section-desc">
              Stay organized with your scheduled assessments and prepare effectively.
            </p>

            <div className="card-grid">
              <div className="card">
                <div className="card-icon"><BookIcon /></div>
                <div className="card-title">Subject 1</div>
                <div className="card-text">No exam scheduled. Topics will be displayed once your teacher assigns them.</div>
              </div>
              <div className="card">
                <div className="card-icon"><BookIcon /></div>
                <div className="card-title">Subject 2</div>
                <div className="card-text">No exam scheduled. Topics will be displayed once your teacher assigns them.</div>
              </div>
              <div className="card">
                <div className="card-icon"><BookIcon /></div>
                <div className="card-title">Subject 3</div>
                <div className="card-text">No exam scheduled. Topics will be displayed once your teacher assigns them.</div>
              </div>
            </div>

            <div className="btn-group">
              <button className="btn btn-primary" onClick={() => scrollToSection(2)}>
                <TrendIcon />
                View Results
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection(0)}>
                Back Home
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3 - Results */}
        <section ref={sectionRefs[2]} className="snap-section">
          <div className="section-content">
            <div className="accent-line" />
            <h2 className="section-title">Performance Analytics</h2>
            <p className="section-desc">
              Track your academic performance and improvement over time.
            </p>

            <div className="stat-box">
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">Exams Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">—</div>
                <div className="stat-label">Average Score</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">0%</div>
                <div className="stat-label">Progress</div>
              </div>
            </div>

            <div style={{ textAlign: "left", marginTop: "2rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>Overall Progress</span>
                  <span style={{ color: "#DC2626", fontWeight: "700" }}>0%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{"--width": "0%"}} />
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>Learning Consistency</span>
                  <span style={{ color: "#DC2626", fontWeight: "700" }}>0%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{"--width": "0%"}} />
                </div>
              </div>
            </div>

            <div className="btn-group">
              <button className="btn btn-primary" onClick={() => scrollToSection(3)}>
                <UserIcon />
                Full Profile
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection(0)}>
                Home
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 4 - Profile */}
        <section ref={sectionRefs[3]} className="snap-section">
          <div className="section-content">
            <div className="accent-line" />
            <h2 className="section-title">Student Profile</h2>
            <p className="section-desc">
              Manage your account and view your learning profile information.
            </p>

            <div className="info-grid">
              <div className="info-row">
                <span className="info-label">Full Name</span>
                <span className="info-value">{user?.name || "Not Set"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email Address</span>
                <span className="info-value">{user?.email || "Not Set"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Account Status</span>
                <span className="info-value">Active</span>
              </div>
              <div className="info-row">
                <span className="info-label">Member Since</span>
                <span className="info-value">2025</span>
              </div>
            </div>

            <div className="card-grid" style={{ marginTop: "2rem" }}>
              <div className="card">
                <div className="card-icon"><CheckIcon /></div>
                <div className="card-title">Edit Profile</div>
                <div className="card-text">Update your personal information and preferences.</div>
              </div>
              <div className="card">
                <div className="card-icon"><TrendIcon /></div>
                <div className="card-title">View Settings</div>
                <div className="card-text">Manage notification and privacy settings.</div>
              </div>
            </div>

            <div className="btn-group">
              <button className="btn btn-secondary" onClick={() => scrollToSection(0)}>
                Back to Home
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection(1)}>
                View Exams
              </button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
