import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/actions";
import axios from "axios";

const MyNav = function ({ handleShow }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.name);

  const logout = () => {
    axios
      .post("/logout")
      .then(() => dispatch(logoutAction()))
      .then(() => navigate("/login"));
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav>
          <Link className="text-decoration-none" to="/">
            <div className="nav-link">Home</div>
          </Link>
          <Link className="text-decoration-none" to="/products">
            <div className="nav-link">Prodotti</div>
          </Link>
          <Link className="text-decoration-none">
            <div className="nav-link" onClick={handleShow}>
              Carrello
            </div>
          </Link>
          {/* <Nav.Link href="#orders">Ordini</Nav.Link> */}
        </Nav>
        {user ? (
          <Nav>
            <div className="nav-link">Ciao, {user.name}!</div>
            <Link className="text-decoration-none">
              <div onClick={logout} className="nav-link">
                Logout
              </div>
            </Link>
          </Nav>
        ) : (
          <Nav>
            <Link to="/login" className="text-decoration-none">
              <div className="nav-link">Login</div>
            </Link>
            <Link to="/register" className="text-decoration-none">
              <div className="nav-link">Registrati</div>
            </Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default MyNav;
