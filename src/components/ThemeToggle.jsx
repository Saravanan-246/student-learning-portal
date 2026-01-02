import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  // Sun Icon
  const SunIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );

  return (
    <>
      <style>{`
        .theme-toggle-switch {
          position: relative;
          width: 56px;
          height: 28px;
          border-radius: 9999px;
          background: ${darkMode ? "#1F2937" : "#E5E7EB"};
          border: 2px solid ${darkMode ? "#DC2626" : "#FECACA"};
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          align-items: center;
          padding: 0 4px;
          box-shadow: ${darkMode 
            ? "0 2px 8px rgba(255, 85, 85, 0.15)" 
            : "0 2px 8px rgba(220, 38, 38, 0.1)"};
          outline: none;
        }

        .theme-toggle-switch:hover {
          transform: scale(1.05);
          box-shadow: ${darkMode 
            ? "0 4px 12px rgba(255, 85, 85, 0.25)" 
            : "0 4px 12px rgba(220, 38, 38, 0.2)"};
        }

        .theme-toggle-switch:active {
          transform: scale(0.98);
        }

        .toggle-slider {
          position: absolute;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          left: ${darkMode ? "28px" : "2px"};
          color: ${darkMode ? "#FF5555" : "#DC2626"};
        }

        .toggle-slider svg {
          transition: transform 0.4s ease;
        }

        .theme-toggle-switch:hover .toggle-slider svg {
          transform: rotate(20deg);
        }

        .icon-light {
          position: absolute;
          left: 6px;
          opacity: ${darkMode ? "0.3" : "1"};
          transition: opacity 0.3s ease;
          color: #DC2626;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-dark {
          position: absolute;
          right: 6px;
          opacity: ${darkMode ? "1" : "0.3"};
          transition: opacity 0.3s ease;
          color: #FF5555;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <button
        onClick={toggleTheme}
        className="theme-toggle-switch"
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <div className="icon-light">
          <SunIcon />
        </div>
        <div className="toggle-slider">
          {darkMode ? <MoonIcon /> : <SunIcon />}
        </div>
        <div className="icon-dark">
          <MoonIcon />
        </div>
      </button>
    </>
  );
}
