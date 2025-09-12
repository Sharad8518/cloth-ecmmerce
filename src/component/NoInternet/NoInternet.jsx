import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function NoInternet() {
      const navigate = useNavigate();
 const handleRetry = () => {
    navigate("/"); // redirect to home
    window.location.reload(); // then reload
  };
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "80vh" }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#dc3545" }}>
        🚫 No Internet
      </h1>
      <p className="text-muted mb-4" style={{ maxWidth: "400px" }}>
        It looks like you’re offline. Please check your internet connection and
        try again.
      </p>
      <Button variant="primary" onClick={() =>handleRetry()}>
        Retry
      </Button>
    </div>
  );
}
