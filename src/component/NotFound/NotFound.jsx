import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "80vh" }}
    >
      <h1 style={{ fontSize: "5rem", fontWeight: "bold", color: "#dc3545" }}>
        404
      </h1>
      <h2 className="mb-3">Oops! Page Not Found</h2>
      <p className="text-muted mb-4" style={{ maxWidth: "400px" }}>
        The page you’re looking for doesn’t exist or has been moved.  
        Please check the URL or go back to the homepage.
      </p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </div>
  );
}
