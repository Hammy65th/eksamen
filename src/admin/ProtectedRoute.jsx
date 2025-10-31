import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Tjekker om brugeren er logget ind via localStorage
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  // Viser siden hvis logget ind – ellers sendes brugeren til login
  return loggedIn ? children : <Navigate to="/login" />;
}
