import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // ✅ Load user synchronously (IMPORTANT)
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // ✅ LOGIN
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data)); // FIRST
    setUser(data); // THEN state
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLogged: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
