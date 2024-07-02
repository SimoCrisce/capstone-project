import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginAction } from "../redux/actions";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const Login = function ({ unloggedMessage }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post("/login", form))
      .then(() => axios.get("/api/user"))
      .then((res) => dispatch(loginAction(res.data)));
  };

  return (
    <Container>
      <Row className="justify-content-center container-height">
        <Col xs={4} className="my-auto">
          <Form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Indirizzo email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={(e) =>
                  setForm((state) => ({
                    ...state,
                    email: e.target.value,
                  }))
                }
                value={form.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={(e) =>
                  setForm((state) => ({
                    ...state,
                    password: e.target.value,
                  }))
                }
                value={form.password}
              />
            </div>

            <Button variant="primary" type="submit" className="mb-2">
              Login
            </Button>

            <div>
              <span>Non hai un account?</span>
              <Link to="/register" className="text-decoration-none">
                <span className="ms-1">Registrati</span>
              </Link>
            </div>
            {unloggedMessage && <p className="text-danger fw-bold">FAI IL LOGIN PER POTER ORDINARE!</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
