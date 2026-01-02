import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load saved session on refresh
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentUser") || "null");
    if (stored) setUser(stored);
  }, []);

  // Login
  const login = (data) => {
    setUser(data);
    localStorage.setItem("studentUser", JSON.stringify(data));
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("studentUser");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogged: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
