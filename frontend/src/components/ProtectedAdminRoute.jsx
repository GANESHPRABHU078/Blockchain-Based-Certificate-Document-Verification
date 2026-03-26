import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!["ADMIN", "INSTITUTION_ADMIN"].includes(user.role)) return <Navigate to="/" replace />;
  return children;
}
