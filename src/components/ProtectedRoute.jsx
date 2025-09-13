import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const driverId = localStorage.getItem("driverId");

  if (!driverId) {
    return <Navigate to="/driver-login" replace />;
  }

  return children;
}
