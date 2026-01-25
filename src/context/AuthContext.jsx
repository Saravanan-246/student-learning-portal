import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // ✅ RESTORE USER ON FIRST LOAD (SYNC)
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("studentUser");
    return stored ? JSON.parse(stored) : null;
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLogged: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
