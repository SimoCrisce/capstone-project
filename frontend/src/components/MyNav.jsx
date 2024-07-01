import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/actions";
import axios from "axios";
import Badge from "react-bootstrap/Badge";

const MyNav = function ({ handleShow, cart }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logout = () => {
    axios
      .post("/logout")
      .then(() => dispatch(logoutAction()))
      .then(() => navigate("/login"));
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-3 justify-content-evenly">
      <Container fluid>
        <Navbar.Brand href="#home">Criscenti</Navbar.Brand>
        <Nav>
          <Link className="text-decoration-none" to="/">
            <div className="nav-link">Home</div>
          </Link>
          <Link className="text-decoration-none" to="/products">
            <div className="nav-link">Prodotti</div>
          </Link>
          {/* <Link className="text-decoration-none" to="/cake">
            <div className="nav-link">Torta</div>
          </Link> */}
          <Link className="text-decoration-none position-relative">
            <div className="nav-link" onClick={handleShow}>
              Carrello
            </div>
            {cart.length !== 0 && (
              <Badge bg="danger" pill className="position-absolute top-0" style={{ right: "-10px" }}>
                {cart.reduce((acc, currentValue) => acc + parseFloat(currentValue.amount), 0)}
              </Badge>
            )}
          </Link>
          {user && (
            <Link className="text-decoration-none" to="/reservations">
              <div className="nav-link">Ordini</div>
            </Link>
          )}
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
