import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

export default function SuspensionPage() {
  return (
    <Container
      fluid
      className="d-flex vh-100 justify-content-center align-items-center bg-dark text-white text-center"
    >
      <Row>
        <Col>
          <Alert
            variant="danger"
            className="fw-bold fs-4 animate__animated animate__flash animate__infinite"
          >
            Due to a technical issue with our newly built web portal,<br />
            we are unable to go live today.
            <br />
            <br />
            Therefore, the web portal launch event stands cancelled.
            <br />
            <br />
            However, all other scheduled programs will continue as planned.
            <br />
            <br />
            We warmly invite you to enjoy the showcase at{" "}
            <span className="text-success">Hotel Aroma, Chandigarh</span>.
            <br />
            <br />
            Sorry for the inconvenience.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}
