import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const MyNav = function () {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="ms-auto">
          <Link className="text-decoration-none" to="/">
            <div className="nav-link">Home</div>
          </Link>
          <Link className="text-decoration-none" to="/products">
            <div className="nav-link">Prodotti</div>
          </Link>
          <Nav.Link href="#orders">Ordini</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNav;
