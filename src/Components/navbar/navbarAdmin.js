import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "./navbar.css";
function Navbarfunction() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }
 
  
 

 

  window.addEventListener("scroll", scrollHandler);
  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <h1 className="mb-0 ml-2">Vaxchain-Admin</h1>
        </Navbar.Brand>

       
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          
          
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
          <Nav.Item>
              <Nav.Link as={Link} to="/admin" onClick={() => updateExpanded(false)}>
              DASHBOARD
              </Nav.Link>
        </Nav.Item>
          <Nav.Item>
              <Nav.Link as={Link} to="/ManagerList" onClick={() => updateExpanded(false)}>
              MANAGER LIST
              </Nav.Link>
        </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navbarfunction;
