import { createContext, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // ✅ RESTORE USER ON FIRST LOAD (SAFE)
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("studentUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("studentUser");
      return null;
    }
  });

  // ✅ LOGIN
  const login = (userData) => {
    localStorage.setItem("studentUser", JSON.stringify(userData));
    setUser(userData);
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("studentUser");
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isLogged: Boolean(user),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
