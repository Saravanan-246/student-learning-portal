import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("studentToken");

  // 🔐 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
