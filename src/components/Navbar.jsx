import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Navbar() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 🔐 JWT AUTH
  const user = JSON.parse(localStorage.getItem("studentUser"));

// 🔐 SAFETY GUARD
if (!user) {
  return null;
}


  const logout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentUser");
    navigate("/login", { replace: true });
  };

  const links = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Exams", path: "/exams" },
    { label: "Results", path: "/results" },
    { label: "Profile", path: "/profile" },
  ];

  // Color system that adapts to dark mode
  const colors = {
    redAccent: darkMode ? "#FF5555" : "#DC2626",
    redDark: darkMode ? "#EE4444" : "#991B1B",
    redLight: darkMode ? "#444444" : "#FECACA",
    borderColor: darkMode ? "#30363D" : "#FECACA",
    bg: darkMode ? "rgba(13, 17, 23, 0.95)" : "rgba(255, 255, 255, 0.95)",
    shadow: darkMode ? "rgba(255, 85, 85, 0.2)" : "rgba(220, 38, 38, 0.1)",
    textActive: darkMode ? "#FF5555" : "#DC2626",
    textInactive: darkMode ? "#8B949E" : "#6B7280",
    userInfo: darkMode ? "#C9D1D9" : "#374151",
    btnGradient: darkMode 
      ? "linear-gradient(135deg, #FF5555 0%, #EE4444 100%)"
      : "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
    shimmer: darkMode 
      ? "rgba(255, 255, 255, 0.3)" 
      : "rgba(255, 255, 255, 0.25)",
    iconColor: darkMode ? "#FF5555" : "#DC2626"
  };

  // Sun Icon
  const SunIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: colors.iconColor }}>
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );

  // Moon Icon
  const MoonIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: colors.iconColor }}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );

  const navStyles = {
    width: '100%',
    padding: '1rem 2.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.bg,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: `2px solid ${colors.borderColor}`,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    boxShadow: `0 2px 12px ${colors.shadow}`
  };

  const brandStyles = {
    fontSize: '1.4rem',
    fontWeight: '800',
    letterSpacing: '-0.3px',
    color: colors.redAccent,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    userSelect: 'none',
    position: 'relative'
  };

  const brandUnderline = {
    position: 'absolute',
    bottom: '-6px',
    left: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${colors.redAccent}, ${colors.redDark})`,
    width: 0,
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const navMenuStyles = {
    display: 'flex',
    gap: '0.25rem',
    fontSize: '0.95rem',
    fontWeight: '500',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const navLinkStyles = (isActive) => ({
    position: 'relative',
    cursor: 'pointer',
    padding: '0.75rem 1.25rem',
    color: isActive ? colors.textActive : colors.textInactive,
    textDecoration: 'none',
    transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'block',
    fontWeight: isActive ? '700' : '500'
  });

  const navLinkUnderline = (isActive) => ({
    position: 'absolute',
    bottom: '0',
    left: '50%',
    height: '2.5px',
    background: `linear-gradient(90deg, ${colors.redAccent}, ${colors.redDark})`,
    borderRadius: '1px',
    transform: 'translateX(-50%)',
    transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    width: isActive ? '70%' : '0%'
  });

  const rightSectionStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  };

  const userInfoStyles = {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: colors.userInfo,
    opacity: 0.85,
    transition: 'opacity 0.3s ease'
  };

  const themeToggleStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    background: darkMode ? "rgba(255, 85, 85, 0.1)" : "rgba(220, 38, 38, 0.08)",
    border: `1px solid ${colors.redLight}`,
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: '600',
    fontSize: '0.85rem',
    color: colors.redAccent,
    userSelect: 'none'
  };

  const logoutBtnStyles = {
    padding: '0.65rem 1.5rem',
    background: colors.btnGradient,
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.95rem',
    cursor: 'pointer',
    fontWeight: '700',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: `0 4px 12px rgba(${darkMode ? "255, 85, 85" : "220, 38, 38"}, 0.3)`,
    userSelect: 'none',
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '0.2px'
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-container {
          animation: slideDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .theme-toggle-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .theme-toggle-btn:hover {
          transform: translateY(-2px);
          background: ${darkMode ? "rgba(255, 85, 85, 0.15)" : "rgba(220, 38, 38, 0.12)"};
          box-shadow: 0 4px 12px ${darkMode ? "rgba(255, 85, 85, 0.2)" : "rgba(220, 38, 38, 0.15)"};
        }

        .theme-toggle-btn:active {
          transform: translateY(0);
        }

        .icon-rotate {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .theme-toggle-btn:hover .icon-rotate {
          transform: rotate(20deg);
        }

        .logout-btn:hover::after {
          animation: shimmer 0.6s ease-in-out;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .logout-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, ${colors.shimmer}, transparent);
          transition: left 0.5s;
        }

        @media (max-width: 750px) {
          .nav-menu { display: none !important; }
          .user-info { display: none !important; }
        }

        @media (max-width: 480px) {
          .brand { font-size: 1.2rem; }
          .logout { padding: 0.5rem 1rem; font-size: 0.85rem; }
          .theme-toggle { padding: 0.4rem 0.6rem; }
        }
      `}</style>

      <nav style={navStyles} className="nav-container">
        {/* Logo */}
        <span 
          style={brandStyles}
          onClick={() => navigate("/dashboard")}
          onMouseEnter={(e) => {
            const underline = e.currentTarget.querySelector('[data-underline]');
            if (underline) underline.style.width = '100%';
          }}
          onMouseLeave={(e) => {
            const underline = e.currentTarget.querySelector('[data-underline]');
            if (underline) underline.style.width = '0%';
          }}
        >
          Student Portal
          <div style={brandUnderline} data-underline />
        </span>

        {/* Navigation Links */}
        <div style={navMenuStyles} className="nav-menu">
          {links.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={navLinkStyles(pathname === item.path)}
              onMouseEnter={(e) => {
                const underline = e.currentTarget.querySelector('[data-nav-underline]');
                if (underline && pathname !== item.path) {
                  underline.style.width = '70%';
                }
              }}
              onMouseLeave={(e) => {
                const underline = e.currentTarget.querySelector('[data-nav-underline]');
                if (underline && pathname !== item.path) {
                  underline.style.width = '0%';
                }
              }}
            >
              {item.label}
              <div 
                style={navLinkUnderline(pathname === item.path)}
                data-nav-underline
              />
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div style={rightSectionStyles}>
          {/* Theme Toggle with Icons */}
          <div
            style={themeToggleStyles}
            className="theme-toggle-btn"
            onClick={() => {
              const toggle = document.querySelector('.theme-toggle-component');
              if (toggle) {
                toggle.querySelector('button')?.click();
              }
            }}
          >
            <div className="icon-rotate">
              {darkMode ? <MoonIcon /> : <SunIcon />}
            </div>
            <span>{darkMode ? "Dark" : "Light"}</span>
          </div>

          {/* Hidden ThemeToggle Component */}
          <div style={{ display: 'none' }} className="theme-toggle-component">
            <ThemeToggle />
          </div>

          <span style={userInfoStyles} className="user-info">
            {user?.name || "User"}
          </span>
          
          <button
            style={logoutBtnStyles}
            className="logout-btn logout"
            onClick={handleLogout}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 16px rgba(${darkMode ? "255, 85, 85" : "220, 38, 38"}, 0.4)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 12px rgba(${darkMode ? "255, 85, 85" : "220, 38, 38"}, 0.3)`;
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
