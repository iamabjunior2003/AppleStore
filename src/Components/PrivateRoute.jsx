import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const session = sessionStorage.getItem("appleSession");

    if (!session) {
      navigate("/login");
      return;
    }

    const data = JSON.parse(session);

    if (!data.status || new Date().getTime() > data.expiresAt) {
      sessionStorage.removeItem("appleSession");
      navigate("/login");
    }
  }, [navigate]);

  return children;
}
