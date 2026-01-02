import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const storedUser = localStorage.getItem("studentUser");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
