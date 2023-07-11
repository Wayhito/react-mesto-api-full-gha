import { Navigate } from "react-router-dom";

function ProtectedRoute({ LoggedIn, children }) {
  if (!LoggedIn) {
    return <Navigate to="/sign-in" />;
  }

  return children;
}

export default ProtectedRoute;