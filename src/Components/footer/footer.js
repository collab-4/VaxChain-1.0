import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.css";
function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      {/* <hr style={{ color: "white" }}></hr> */}
      <Row>
        <Col md="12" className="footer-copywright">
          <h3>Copyright © {year} All Rights Reserved.</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
