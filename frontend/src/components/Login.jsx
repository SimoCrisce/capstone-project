import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginAction } from "../redux/actions";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Login = function () {
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
    <Row className="justify-content-center">
      <Col xs={4}>
        <Form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
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

          <Button variant="primary" type="submit">
            Login
          </Button>

          <div>
            <span>Non hai un account?</span>
            <Link to="/register">
              <span>Registrati</span>
            </Link>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
